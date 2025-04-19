const kleur = require('kleur');

const logMethods = {
  log: {
    fn: 'log',
    colorFn: kleur.black,
  },
  error: {
    fn: 'error',
    colorFn: kleur.red,
  },
  warn: {
    fn: 'warn',
    colorFn: kleur.yellow,
  },
  info: {
    fn: 'info',
    colorFn: kleur.blue,
  },
  debug: {
    fn: 'debug',
    colorFn: kleur.gray,
  },
};

const logLevels = Object.keys(logMethods);

class Logger {
  constructor(options) {
    this.options = options;

    // default log level is "error" and higher
    this.options.logLevel = this.options.logLevel || 'error';
  }

  log(level = 'log', message = '', payload = '') {
    const logMethod = logMethods[level]?.fn || 'log';
    const logLevelIndex = logLevels.indexOf(logMethod.toLowerCase());

    if (logLevelIndex > logLevels.indexOf(this.options.logLevel.toLowerCase())) {
      return;
    }

    if (!message) {
      console.warn('No message provided for logging.');
      return;
    }

    const colorFn = logMethods[logMethod].colorFn;
    const _message = `[${logMethod}] ${message}`;

    if (payload) {
      return console[logMethod](colorFn(_message), payload); // eslint-disable-line no-console
    }

    return console[logMethod](colorFn(_message)); // eslint-disable-line no-console
  }
}

module.exports = Logger;
