import { Controller, Post, Get, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { WebhookService } from './webhook.service';


@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleWebhook(@Body() payload: any) {
    this.logger.log(`Received webhook: ${JSON.stringify(payload)}`);
    
    try {
      const result = await this.webhookService.processWebhook(payload);
      return result;
    } catch (error) {
      this.logger.error(`Error processing webhook: ${error.message}`);
      return  error
      // {
      //   success: false,
      //   message: 'Error processing webhook',
      //   error: error.message,
      //   timestamp: new Date().toISOString(),
      // };
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
  async handleChatWebhook(@Body() payload: any) {
    this.logger.log(`Received chat webhook: ${JSON.stringify(payload)}`);
    
    try {
      const result = await this.webhookService.processChatWebhook(payload);
      return result;
    } catch (error) {
      this.logger.error(`Error processing chat webhook: ${error.message}`);
      return error;
      // {
      //   success: false,
      //   message: 'Error processing chat webhook',
      //   error: error.message,
      //   timestamp: new Date().toISOString(),
      // };
    }
  }
} 