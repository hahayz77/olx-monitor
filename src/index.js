const config = require("./config")
const cron = require("node-cron")
const { initializeCycleTLS } = require("./components/CycleTls")
const $logger = require("./components/Logger")
const { scraper } = require("./components/Scraper")
const { createTables } = require("./database/database.js")

const runScraper = async () => {

  for (let i = 0; i < config.urls.length; i++) {
    try {
      scraper(config.urls[i])
    } catch (error) {
      $logger.error(error)
    }
  }
}

const main = async () => {

  // await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));

  try {
    $logger.info("Program started")
    await createTables()
    await initializeCycleTLS()
    runScraper()
  } catch (error) {
    console.error("Main Error block!",error)
  }
}

main()

cron.schedule(config.interval, () => {
  runScraper()
})
