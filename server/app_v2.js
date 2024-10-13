const HTTP = require('http');

const CONSTANTS = require('./custom_lib/websocket_constants');
const FUNCTIONS = require('./custom_lib/websocket_methods');

// ================== HTTP SERVER ==================
const HTTP_SERVER = HTTP.createServer((req, res) => {
  // For a request to ws://, the following code will NOT be executed.
  // Instead, the request will be passed to the upgrade event listener.
  // If there is no 'upgrade' event listener, an error will be thrown.
  res.writeHead(200);
  res.end('WebSocket server is running...');
});

HTTP_SERVER.listen(CONSTANTS.PORT, () => {
  console.log(`HTTP server is listening on port ${CONSTANTS.PORT}`);
});

// Error handling
CONSTANTS.CUSTOM_ERRORS.forEach((errorEvent) => {
  process.on(errorEvent, (err) => {
    console.log(`Error event: ${errorEvent}. Here's the full object:`, err);
    process.exit(1);
  });
});

HTTP_SERVER.on('upgrade', (req, socket, head) => {
  // Get the required request headers
  const upgradeHeaderCheck =
    req.headers.upgrade.toLowerCase() === CONSTANTS.UPGRADE;
  const connectionHeaderCheck =
    req.headers.connection.toLowerCase() === CONSTANTS.CONNECTION;
  const methodCheck = req.method === CONSTANTS.METHOD;

  // Check the origin
  const origin = req.headers.origin;
  const originCheck = FUNCTIONS.isOriginAllowed(origin);

  // Verify all request headers then upgrade the request
  if (
    FUNCTIONS.check(
      upgradeHeaderCheck,
      connectionHeaderCheck,
      methodCheck,
      originCheck
    )
  ) {
    upgradeConnection(req, socket, head);
  }
});

function upgradeConnection(req, socket, head) {
  console.log('Upgrading the connection to a WebSocket connection...');
}
