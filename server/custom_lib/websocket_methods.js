const crypto = require('crypto');
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

function createUpgradeHeadrs(clientKey) {
  // Generate the server accept key
  const serverKey = generateServerKey(clientKey);
  const headers = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${serverKey}`,
  ];
  const upgradeHeaders = headers.join('\r\n') + '\r\n\r\n';
  return upgradeHeaders;
}

function generateServerKey(clientKey) {
  // Join the client key with the GUID
  const data = clientKey + CONSTANTS.GUID;
  // Create a SHA1 hash
  const hash = crypto.createHash('sha1');
  hash.update(data);
  // Digest the hash to base64
  const serverKey = hash.digest('base64');
  return serverKey;
}

module.exports = {
  check,
  createUpgradeHeadrs,
  isOriginAllowed,
};
