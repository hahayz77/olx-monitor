const initCycleTLS = require("cycletls")

let cycleTLSInstance

async function initializeCycleTLS() {
  try {
    cycleTLSInstance = await initCycleTLS()
  } catch (error) {
    console.error("initializeCycleTLS Error!",error)
  }
}

async function exitCycleTLS() {
  cycleTLSInstance.exit()
}

function getCycleTLSInstance() {
  return cycleTLSInstance
}

module.exports = {
  initializeCycleTLS,
  getCycleTLSInstance,
  exitCycleTLS,
}
