import { expect } from 'chai';
import { ApplicationLogger, LoggerFunction, LoggerLevel, Logger } from '../src';

describe('Logger', () => {
  type LastLog = {
    level: LoggerLevel;
    loggerName: string;
    message: string;
    args: any[];
  };
  let lastLog: LastLog | undefined;
  const loggerFunctionTest: LoggerFunction = (level: LoggerLevel, loggerName: string, message: string, ...args: any[]) => {
    lastLog = {
      level,
      loggerName,
      message,
      args,
    };
    ApplicationLogger.loggerConsole(level, loggerName, message, ...args);
  };
  ApplicationLogger.setLoggerFunction(loggerFunctionTest);

  beforeEach(() => {
    lastLog = undefined;
  });

  describe('Logger level', () => {
    const testLogger = (loggerLevel: LoggerLevel) => {
      expect(lastLog).to.not.be.undefined;
      if(lastLog) {
        expect(lastLog.loggerName).to.equal('Test');
        expect(lastLog.level).to.equal(loggerLevel);
        expect(lastLog.message).to.equal('Message');
        expect(lastLog.args).to.eql([]);
      }
    };
    it('Logger info', () => {
      const logger = new Logger('Test');
      logger.info('Message');
      testLogger(LoggerLevel.INFO);
    });
    it('Logger debug', () => {
      const logger = new Logger('Test');
      logger.debug('Message');
      testLogger(LoggerLevel.DEBUG);
    });
    it('Logger warn', () => {
      const logger = new Logger('Test');
      logger.warn('Message');
      testLogger(LoggerLevel.WARN);
    });
    it('Logger error', () => {
      const logger = new Logger('Test');
      logger.error('Message');
      testLogger(LoggerLevel.ERROR);
    });
  });

  describe('Logger arguments', () => {
    it('1 argument', () => {
      const logger = new Logger('Test');
      logger.info('Message', '1st arg');
      expect(lastLog).to.not.be.undefined;
      if(lastLog) {
        expect(lastLog.message).to.equal('Message');
        expect(lastLog.args).to.eql(['1st arg']);
      }
    });
    it('2 arguments', () => {
      const logger = new Logger('Test');
      logger.info('Message', '1st arg', '2nd arg');
      expect(lastLog).to.not.be.undefined;
      if(lastLog) {
        expect(lastLog.message).to.equal('Message');
        expect(lastLog.args).to.eql(['1st arg', '2nd arg']);
      }
    });
    it('3 arguments', () => {
      const logger = new Logger('Test');
      logger.info('Message', '1st arg', '2nd arg', {a: '3'});
      expect(lastLog).to.not.be.undefined;
      if(lastLog) {
        expect(lastLog.message).to.equal('Message');
        expect(lastLog.args).to.eql(['1st arg', '2nd arg', {a: '3'}]);
      }
    });
  });

  describe('Logger generic log', () => {
    it('generic 3 arguments', () => {
      const logger = new Logger('Test');
      logger.log(LoggerLevel.DEBUG, 'Message', '1st arg', '2nd arg', {a: '3'});
      expect(lastLog).to.not.be.undefined;
      if(lastLog) {
        expect(lastLog.message).to.equal('Message');
        expect(lastLog.args).to.eql(['1st arg', '2nd arg', {a: '3'}]);
      }
    });
  });
});
