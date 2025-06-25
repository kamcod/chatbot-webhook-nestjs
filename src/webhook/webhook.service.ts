import { Injectable, Logger } from '@nestjs/common';
import { WebhookDto } from './webhook.controller';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  // ✅ General webhook processor (non-Google Chat)
  async processWebhook(payload: WebhookDto) {
    this.logger.log('Processing general webhook...');

    const processedData = {
      receivedAt: new Date().toISOString(),
      message: payload.message || 'No message provided',
      userId: payload.userId || 'anonymous',
      sessionId: payload.sessionId || 'no-session',
      originalData: payload.data,
    };

    this.logger.log(`Processed general webhook for user: ${processedData.userId}`);
    return processedData;
  }

  // ✅ Google Chat webhook processor
  async processChatWebhook(payload: any) {
    this.logger.log('Processing chat webhook...');

    // ✅ Extract fields from Google Chat payload
    const messageText = payload.message?.text || payload.argumentText || 'No message';
    const userId = payload.user?.name || 'unknown-user';
    const displayName = payload.user?.displayName || 'Anonymous';
    const sessionId = payload.message?.thread?.name || payload.thread?.name || 'no-session';
    const spaceId = payload.space?.name || 'no-space';
    const messageType = payload.type || 'UNKNOWN';

    const chatData = {
      text: "Hi Thanks for contacting bro...",
      receivedAt: new Date().toISOString(),
      message: messageText,
      userId,
      userDisplayName: displayName,
      sessionId,
      spaceId,
      messageType,
      processedMessage: this.processChatMessage(messageText),
    };

    this.logger.log(`Processed chat webhook for user: ${displayName} (${userId})`);
    return chatData;
  }

  // ✅ Message processor (mock logic)
  private processChatMessage(message?: string): string {
    if (!message) return 'No message to process';
    return `Processed: ${message}`;
  }

  // ✅ Payload validation method (optional for middleware/guards)
  validateWebhookPayload(payload: any): boolean {
    return payload && typeof payload === 'object';
  }
}
