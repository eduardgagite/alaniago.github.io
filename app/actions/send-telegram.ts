"use server"

export async function sendTelegramMessage(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string

    // Validate required fields
    if (!name || !email || !message) {
      return {
        success: false,
        error: "Пожалуйста, заполните все обязательные поля",
      }
    }

    // Get environment variables (server-side only)
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID

    if (!telegramBotToken || !telegramChatId) {
      console.error("Telegram bot credentials not configured")
      return {
        success: false,
        error: "Сервис временно недоступен. Попробуйте связаться с нами напрямую.",
      }
    }

    // Format message for Telegram
    const telegramMessage = `
🔔 *Новая заявка с сайта Alania GO*

👤 *Имя:* ${name}
📧 *Email:* ${email}
📱 *Телефон:* ${phone || "Не указан"}

💬 *Сообщение:*
${message}

⏰ *Время:* ${new Date().toLocaleString("ru-RU")}
    `.trim()

    // Send to Telegram bot
    const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    })

    const responseData = await response.json()

    if (!response.ok || !responseData.ok) {
      console.error("Telegram API error:", responseData)
      return {
        success: false,
        error: "Ошибка отправки сообщения. Попробуйте еще раз или свяжитесь с нами напрямую.",
      }
    }

    return {
      success: true,
      message: "Спасибо за сообщение! Мы получили вашу заявку и свяжемся с вами в ближайшее время.",
    }
  } catch (error) {
    console.error("Error sending telegram message:", error)
    return {
      success: false,
      error: "Произошла ошибка при отправке сообщения. Попробуйте еще раз или свяжитесь с нами напрямую.",
    }
  }
}
