import { Test, TestingModule } from '@nestjs/testing';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

describe('WebhookController', () => {
  let controller: WebhookController;
  let service: WebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [WebhookService],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
    service = module.get<WebhookService>(WebhookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('healthCheck', () => {
    it('should return health status', async () => {
      const result = await controller.healthCheck();
      expect(result.status).toBe('healthy');
      expect(result.message).toBe('Webhook endpoint is ready');
      expect(result.timestamp).toBeDefined();
    });
  });

  describe('handleWebhook', () => {
    it('should process webhook successfully', async () => {
      const mockPayload = {
        message: 'Test message',
        userId: 'test-user',
        sessionId: 'test-session',
      };

      const result = await controller.handleWebhook(mockPayload);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Webhook processed successfully');
      expect(result.data).toBeDefined();
    });
  });

  describe('handleChatWebhook', () => {
    it('should process chat webhook successfully', async () => {
      const mockPayload = {
        message: 'Chat message',
        userId: 'chat-user',
        sessionId: 'chat-session',
      };

      const result = await controller.handleChatWebhook(mockPayload);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Chat webhook processed successfully');
      expect(result.data).toBeDefined();
    });
  });
}); 