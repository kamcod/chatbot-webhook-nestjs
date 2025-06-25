import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  // ✅ General webhook processor (non-Google Chat)
  async processWebhook(payload: any) {
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

    const messageText = payload?.message?.text || 'No message';
    const sender = payload?.user?.displayName || 'User';

    // Simple echo logic
    const reply = `Hello ${sender}, you said: "${messageText}"`;

    this.logger.log(`Replying with: ${reply}`);

    // ✅ Google Chat requires this structure
    return {
      text: reply
    };
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
