const CONSTANTS = require('./websocket_constants');

function isOriginAllowed(origin) {
  return CONSTANTS.ALLOWED_ORIGINS.includes(origin);
}

function check(
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
  throw new Error(
    'Unable to connect. The HTTP headers are not in accordance with the RFC 6455 spec.'
  );
}

module.exports = {
  check,
  isOriginAllowed,
};
