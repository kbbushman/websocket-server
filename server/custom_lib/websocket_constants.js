module.exports = {
  PORT: 8080,

  // errors
  CUSTOM_ERRORS: [
    'uncaughtException',
    'unhandledRejection',
    'SIGINT', // triggered by Ctrl + C in the terminal,
  ],

  // upgrade checks
  METHOD: 'GET',
  VERSION: 13,
  CONNECTION: 'upgrade',
  UPGRADE: 'websocket',
  ALLOWED_ORIGINS: [
    'http://localhost:52330',
    'http://127.0.0.1:52330',
    'null', // this is for the file protocol
  ],
};
