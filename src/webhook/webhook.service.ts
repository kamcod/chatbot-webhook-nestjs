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
    this.logger.log('Processing chat webhook... type:', payload.type);

    const userName = payload.user?.displayName || 'anonymous';
    const messageText = payload.message?.text || '';

    const threadName = payload.message?.thread?.name || payload.thread?.name;

    // const replyText = `👋 Hello ${userName}, you said: "${messageText}"`;
    const replyText = `👋 Hello ${userName} Bhai, I'm ready but not connected to any LLM"`;

    const reply = {
      text: replyText,
      thread: threadName ? { name: threadName } : undefined,
    };

    this.logger.log(`Replying with: ${replyText}`);

    // ✅ Google Chat requires this structure
    return reply;
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
