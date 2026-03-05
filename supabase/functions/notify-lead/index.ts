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
        <!DOCTYPE html>
        <html>
        <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #334155;
            line-height: 1.6;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .header {
            background-color: #2563eb;
            color: #ffffff;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.025em;
          }
          .content {
            padding: 40px 30px;
          }
          .content p {
            margin: 0 0 20px 0;
          }
          .footer {
            background-color: #f1f5f9;
            padding: 20px 30px;
            text-align: center;
            font-size: 14px;
            color: #64748b;
          }
          .highlight {
            background-color: #eff6ff;
            border-left: 4px solid #3b82f6;
            padding: 18px;
            margin: 25px 0;
            border-radius: 6px;
          }
        </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ClaimFlow Early Access</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${agency_name}</strong>,</p>
              <p>Thank you for expressing your interest in joining the ClaimFlow Pilot Program. We're thrilled to connect with you!</p>
              
              <div class="highlight">
                <p style="margin: 0; color: #1e40af;"><strong>What's Next?</strong><br><br>I am personally onboarding a very selective group of Malaysian travel agencies to ensure mileage claims are completely audit-ready and natively compliant with LHDN requirements.</p>
              </div>
              
              <p>We'll be reviewing your application and I will reach out to you shortly to schedule a brief introductory call. We'd love to learn more about your current workflow and discuss how ClaimFlow can seamlessly integrate into it.</p>
              
              <p>In the meantime, if you have any questions, feel free to reply directly to this email.</p>
              
              <p style="margin-top: 30px;">Best regards,<br><strong>Yusmarin Samsudin</strong><br>Founder, ClaimFlow</p>
            </div>
            <div class="footer">
              &copy; 2026 ClaimFlow Platform. All rights reserved.
            </div>
          </div>
        </body>
        </html>
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
