import type { ILogger } from './types';

const PREFIX = '[FB Enhancer]';
const isDev = import.meta.env.DEV;

class Logger implements ILogger {
  info(message: string, ...args: unknown[]): void {
    console.info(PREFIX, message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(PREFIX, message, ...args);
  }

  error(message: string, error?: unknown): void {
    console.error(PREFIX, message, ...(error !== undefined ? [error] : []));
  }

  debug(message: string, ...args: unknown[]): void {
    if (isDev) {
      console.debug(PREFIX, message, ...args);
    }
  }
}

export const logger: ILogger = new Logger();
