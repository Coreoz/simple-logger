import { LoggerLevel } from './LoggerLevel';

export interface LoggerFunction {
  (level: LoggerLevel, loggerName: string, message: string, ...args: any[]): void;
}

/**
 * Manage the logging appender current function for the application.
 */
export class ApplicationLogger {
  private static loggerFunction: LoggerFunction = ApplicationLogger.loggerConsole;

  /**
   * A logging appender that just log a message to the {@link console}
   */
  static loggerConsole(
    level: LoggerLevel, loggerName: string, message: string, ...args: any[]
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
    consoleFunction.call(console, fullMessage, ...args);
  }

  /**
   * Replace the current logging function.
   *
   * To just add a new logging appender, {@link addLoggerFunction} should be used.
   */
  static setLoggerFunction(loggerFunction: LoggerFunction) {
    ApplicationLogger.loggerFunction = loggerFunction;
  }

  /**
   * Add a new logging function to the existing logging system.
   *
   * By default, the only present loggerFunction is the {@link loggerConsole},
   * so if the function is called with a function that send a log to a server,
   * the futur logs will be:
   * - logged in the console
   * - sent to a server
   */
  static addLoggerFunction(loggerFunction: LoggerFunction) {
    const currentLoggerFunction = ApplicationLogger.loggerFunction;
    ApplicationLogger.loggerFunction = (
      level: LoggerLevel, loggerName: string, message: string, ...args: unknown[]
    ) => {
      currentLoggerFunction(level, loggerName, message, ...args);
      loggerFunction(level, loggerName, message, ...args);
    };
  }

  /**
   * The static method to add a log.
   *
   * For general use cases, logging should be done through a {@link Logger}.
   */
  static log(level: LoggerLevel, loggerName: string, message: string, ...args: any[]) {
    ApplicationLogger.loggerFunction(level, loggerName, message, ...args);
  }
}
