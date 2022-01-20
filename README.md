Simple logging system
=====================
This is a simple JavaScript logging system written in TypeScript.

By default, it outputs content to the console.
However, it can be easily customized to output somewhere else.

This project can be a base to build a more complex logging system like SLF4J/Logback in Java.

Installation
------------
Using NPM:
```
npm install simple-logging-system
```

Using NPM:
```
yarn add simple-logging-system
```

Usage
-----
```typescript
const logger = new Logger('MyComponent');
logger.info('Hello world');
```

It supports multiple arguments:
```typescript
const logger = new Logger('MyComponent');
try {
  throw new Error('Oops');
} catch (e) {
  logger.error('An error ocurred!', e);
}
```

It's easy to change logger appenders:
```typescript
ApplicationLogger.setLoggerFunction((level: LoggerLevel, loggerName: string, message: string, ...args: any[]) => {
  // log messages to console
  ApplicationLogger.loggerConsole(level, loggerName, message, ...args);
  // also log messages to Datadog
  this.logToDatadog(level, loggerName, message, ...args);
});
```

Or logger appenders can just be added to the existing ones:
```typescript
// also log messages to Datadog (and messages are still log to the console, by default)
ApplicationLogger.addLoggerFunction(this.logToDatadog);
```

So it's possible to:
- Check for logs in unit tests easily
- Send logs to servers on production

Release process
---------------
1. run `npm login`
2. run `npm run release` <= yarn **must not** be used
