Simple logger
=============
This is a simple Javascript Logger written in Typescript.

By default, it outputs content to the console.
However, it can be easily customized to output somewhere else.

This project can be a base to build a more complex logger system like SLF4J/Logback in Java.

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
