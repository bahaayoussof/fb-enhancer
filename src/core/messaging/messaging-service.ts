import { logger } from '@core/logger/logger';
import type { ExtensionMessage } from './types';

type MessageHandler = (
  message: ExtensionMessage,
  sender: chrome.runtime.MessageSender
) => void | Promise<unknown>;

class MessagingService {
  sendToBackground(message: ExtensionMessage): Promise<unknown> {
    return chrome.runtime.sendMessage(message);
  }

  sendToActiveTab(message: ExtensionMessage): Promise<unknown> {
    return chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab]) => {
      if (!tab?.id) return;
      return chrome.tabs.sendMessage(tab.id, message);
    });
  }

  onMessage(handler: MessageHandler): void {
    chrome.runtime.onMessage.addListener((raw, sender, sendResponse) => {
      const message = raw as ExtensionMessage;
      const result = handler(message, sender);

      if (result instanceof Promise) {
        result.then(sendResponse).catch((err) => logger.error('Messaging handler error', err));
        return true; // keep channel open for async sendResponse
      }
    });
  }
}

export const messagingService = new MessagingService();
