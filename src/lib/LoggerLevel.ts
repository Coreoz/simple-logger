export const LoggerLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LoggerLevel = typeof LoggerLevel[keyof typeof LoggerLevel];
