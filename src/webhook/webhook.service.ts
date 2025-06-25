import { Injectable, Logger } from '@nestjs/common';
import { WebhookDto } from './webhook.controller';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  async processWebhook(payload: any) {
    this.logger.log('Processing general webhook...');
    
    // Add your webhook processing logic here
    // For example: save to database, trigger notifications, etc.
    
    const processedData = {
      receivedAt: new Date().toISOString(),
      message: payload.message || 'No message provided',
      userId: payload.userId || 'anonymous',
      sessionId: payload.sessionId || 'no-session',
      originalData: payload.data,
    };

    this.logger.log(`Payload: ${payload}`);
    this.logger.log(`Processed webhook for user: ${processedData.userId}`);

    return processedData;
  }

  async processChatWebhook(payload: any) {
    this.logger.log('Processing chat webhook...');
    
    // Add your chatbot-specific processing logic here
    // For example: analyze message, generate response, etc.
    
    const chatData = {
      receivedAt: new Date().toISOString(),
      message: payload.message || 'No message provided',
      userId: payload.userId || 'anonymous',
      sessionId: payload.sessionId || 'no-session',
      messageType: 'chat',
      // Add any chatbot-specific processing here
      processedMessage: this.processChatMessage(payload.message),
    };

    this.logger.log(`Processed chat webhook for user: ${chatData.userId}`);
    
    return chatData;
  }

  private processChatMessage(message?: string): string {
    if (!message) return 'No message to process';
    
    // Add your message processing logic here
    // For example: sentiment analysis, intent detection, etc.
    
    return `Processed: ${message}`;
  }

  // Method to validate webhook payload
  validateWebhookPayload(payload: any): boolean {
    // Add validation logic here
    // For example: check required fields, validate format, etc.
    return payload && typeof payload === 'object';
  }
} 