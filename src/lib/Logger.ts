import { ApplicationLogger } from './ApplicationLogger';
import { LoggerLevel } from './LoggerLevel';

// eslint-disable-next-line import/prefer-default-export
export class Logger {
  constructor(private readonly name: string) {
  }

  log(level: LoggerLevel, message: string, args: any[]) {
    ApplicationLogger.log(level, this.name, message, args);
  }

  error(message: string, ...args: any[]) {
    this.log(LoggerLevel.ERROR, message, args);
  }

  warn(message: string, ...args: any[]) {
    this.log(LoggerLevel.WARN, message, args);
  }

  info(message: string, ...args: any[]) {
    this.log(LoggerLevel.INFO, message, args);
  }

  debug(message: string, ...args: any[]) {
    this.log(LoggerLevel.DEBUG, message, args);
  }
}
