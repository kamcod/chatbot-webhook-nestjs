import { Controller, Post, Get, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { WebhookService } from './webhook.service';

// DTO for webhook payload
export class WebhookDto {
  message?: string;
  userId?: string;
  sessionId?: string;
  timestamp?: string;
  data?: any;
}

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleWebhook(@Body() payload: WebhookDto) {
    this.logger.log(`Received webhook: ${JSON.stringify(payload)}`);
    
    try {
      const result = await this.webhookService.processWebhook(payload);
      return {
        success: true,
        message: 'Webhook processed successfully',
        data: result,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(`Error processing webhook: ${error.message}`);
      return {
        success: false,
        message: 'Error processing webhook',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async healthCheck() {
    return {
      status: 'healthy',
      message: 'Webhook endpoint is ready',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('chat')
  @HttpCode(HttpStatus.OK)
  async handleChatWebhook(@Body() payload: WebhookDto) {
    this.logger.log(`Received chat webhook: ${JSON.stringify(payload)}`);
    
    try {
      const result = await this.webhookService.processChatWebhook(payload);
      return {
        success: true,
        message: 'Chat webhook processed successfully',
        data: result,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(`Error processing chat webhook: ${error.message}`);
      return {
        success: false,
        message: 'Error processing chat webhook',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
} 