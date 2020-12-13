import { LoggerLevel } from './LoggerLevel';

export interface LoggerFunction {
  (level: LoggerLevel, loggerName: string, message: string, args: any[]): void;
}

function loggerConsole(
  level: LoggerLevel, loggerName: string, message: string, args: any[],
) {
  const fullMessage = `${loggerName}: ${message}`;
  let consoleFunction = console.error;
  if (level === LoggerLevel.DEBUG) {
    consoleFunction = console.debug;
  } else if (level === LoggerLevel.INFO) {
    consoleFunction = console.info;
  } else if (level === LoggerLevel.WARN) {
    consoleFunction = console.warn;
  }
  if (args.length === 0) {
    consoleFunction.call(console, fullMessage);
  } else {
    consoleFunction.call(console, fullMessage, args);
  }
}

export class ApplicationLogger {
  private static loggerFunction: LoggerFunction = loggerConsole;

  static setLoggerFunction(loggerFunction: LoggerFunction) {
    ApplicationLogger.loggerFunction = loggerFunction;
  }

  static log(level: LoggerLevel, loggerName: string, message: string, args: any[]) {
    ApplicationLogger.loggerFunction(level, loggerName, message, args);
  }
}
