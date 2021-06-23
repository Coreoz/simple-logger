export const LoggerLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
} as const;
export type LoggerLevel = typeof LoggerLevel[keyof typeof LoggerLevel]
