-- Create Claim Batches Table
CREATE TABLE public.claim_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    month_year TEXT NOT NULL, -- e.g. "2026-02"
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create Claims Table
CREATE TABLE public.claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    batch_id UUID REFERENCES public.claim_batches(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected')),
    
    start_location TEXT NOT NULL,
    end_location TEXT NOT NULL,
    
    start_odometer_img_url TEXT,
    end_odometer_img_url TEXT,
    toll_receipt_img_url TEXT,
    
    calculated_distance_km NUMERIC NOT NULL,
    manual_distance_km NUMERIC,
    justification_notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE public.claim_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;

-- Policies for claim_batches
CREATE POLICY "Users can view their own batches"
    ON public.claim_batches FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own batches"
    ON public.claim_batches FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own batches"
    ON public.claim_batches FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

-- Policies for claims
CREATE POLICY "Users can view their own claims"
    ON public.claims FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own claims"
    ON public.claims FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own claims"
    ON public.claims FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own draft claims"
    ON public.claims FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id AND status = 'draft');

-- Setup Storage Buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('claim-receipts', 'claim-receipts', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Authenticated users can upload receipts"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'claim-receipts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view receipts"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'claim-receipts');
