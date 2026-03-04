import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, agency_name } = await req.json()

    if (!email || !agency_name) {
      return new Response(JSON.stringify({ error: 'Missing email or agency name' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const brevoApiKey = Deno.env.get('BREVO_API_KEY')
    const telegramBotToken = Deno.env.get('TELEGRAM_BOT_TOKEN')
    const telegramChatId = Deno.env.get('TELEGRAM_CHAT_ID')

    if (!brevoApiKey || !telegramBotToken || !telegramChatId) {
      console.error("Missing environment variables!")
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 1. Send Brevo Auto-Email
    const senderEmail = Deno.env.get('SENDER_EMAIL') || "hello@claimflow.site"; // Fallback to a default if not set
    const brevoPayload = {
      sender: {
        name: "ClaimFlow Founder",
        email: senderEmail
      },
      to: [
        { email: email, name: agency_name }
      ],
      subject: "ClaimFlow Early Access",
      htmlContent: `
        <p>Hi ${agency_name},</p>
        <p>Thanks for your interest in ClaimFlow.</p>
        <p>I'm personally onboarding a small number of Malaysian travel agencies to ensure mileage claims are audit-ready and compliant with LHDN requirements.</p>
        <p>I'll contact you shortly to understand your workflow.</p>
        <p>Best regards,<br>Founder, ClaimFlow</p>
      `
    };

    const brevoReq = fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify(brevoPayload)
    });

    // 2. Send Telegram Notification
    const telegramText = `New ClaimFlow lead: ${agency_name} (${email})`;
    const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    const telegramReq = fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: telegramText
      })
    });

    // Wait for both to complete
    const [brevoRes, telegramRes] = await Promise.all([brevoReq, telegramReq]);

    if (!brevoRes.ok) {
      const errText = await brevoRes.text();
      console.error("Brevo Error:", errText);
      throw new Error(`Failed to send Brevo email: ${errText}`);
    }

    if (!telegramRes.ok) {
      const errText = await telegramRes.text();
      console.error("Telegram Error:", errText);
      throw new Error(`Failed to send Telegram message: ${errText}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Notifications sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error: any) {
    console.error("Function error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
