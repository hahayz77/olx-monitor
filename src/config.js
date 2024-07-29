require('dotenv').config()

let config = {}

config.urls = [
    process.env.URL1,
]

// this tool can help you create the interval string:
// https://tool.crontap.com/cronjob-debugger

config.interval = process.env.CRON_TIME
config.telegramChatID = process.env.TELEGRAM_CHAT_ID
config.telegramToken = process.env.TELEGRAM_TOKEN

config.logger={
    timestampFormat:'YYYY-MM-DD HH:mm:ss'
}

module.exports = config