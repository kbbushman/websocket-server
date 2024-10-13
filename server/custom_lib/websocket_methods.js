const CONSTANTS = require('./websocket_constants');

function isOriginAllowed(origin) {
  return CONSTANTS.ALLOWED_ORIGINS.includes(origin);
}

function check(
  socket,
  upgradeHeaderCheck,
  connectionHeaderCheck,
  methodCheck,
  originCheck
) {
  if (
    upgradeHeaderCheck &&
    connectionHeaderCheck &&
    methodCheck &&
    originCheck
  ) {
    return true;
  }
  const message =
    '400 bad request: the request headers do not comply with the RFC6455 spec';
  const messageLength = message.length;
  const response =
    `HTTP/1.1 400 Bad Request\r\n` +
    `Content-Types: text/plain\r\n` +
    `Content-Length: ${messageLength}\r\n` +
    `\r\n` +
    message;
  socket.write(response);
  socket.end(); // close the TCP connection and keep the server running
}

module.exports = {
  check,
  isOriginAllowed,
};
