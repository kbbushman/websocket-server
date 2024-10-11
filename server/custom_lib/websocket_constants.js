module.exports = {
  PORT: 8080,

  // errors
  CUSTOM_ERRORS: [
    'uncaughtException',
    'unhandledRejection',
    'SIGINT', // triggered by Ctrl + C in the terminal,
  ],
};
