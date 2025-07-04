# NestJS Webhook Server

A NestJS application that listens for webhooks from your chatbot. This server provides endpoints to receive and process webhook data.

## Features

- 🚀 **Webhook Endpoints**: Multiple endpoints for different types of webhook data
- 🔒 **CORS Enabled**: Ready for cross-origin requests
- 📝 **Logging**: Comprehensive logging for debugging
- 🏥 **Health Check**: Endpoint to verify server status
- 🎯 **TypeScript**: Full TypeScript support with type safety

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

### 3. Test the Endpoints

#### Health Check
```bash
curl http://localhost:3000/webhook
```

#### General Webhook
```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello from chatbot!",
    "userId": "user123",
    "sessionId": "session456",
    "data": {"key": "value"}
  }'
```

#### Chat Webhook
```bash
curl -X POST http://localhost:3000/webhook/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "User message here",
    "userId": "user123",
    "sessionId": "session456"
  }'
```

## Available Endpoints

### `GET /webhook`
Health check endpoint to verify the server is running.

**Response:**
```json
{
  "status": "healthy",
  "message": "Webhook endpoint is ready",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### `POST /webhook`
General webhook endpoint for any type of webhook data.

**Request Body:**
```json
{
  "message": "Optional message",
  "userId": "Optional user ID",
  "sessionId": "Optional session ID",
  "timestamp": "Optional timestamp",
  "data": "Any additional data"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Webhook processed successfully",
  "data": {
    "receivedAt": "2024-01-01T12:00:00.000Z",
    "message": "Hello from chatbot!",
    "userId": "user123",
    "sessionId": "session456",
    "originalData": {"key": "value"}
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### `POST /webhook/chat`
Specialized endpoint for chatbot messages.

**Request Body:**
```json
{
  "message": "User message",
  "userId": "user123",
  "sessionId": "session456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Chat webhook processed successfully",
  "data": {
    "receivedAt": "2024-01-01T12:00:00.000Z",
    "message": "User message",
    "userId": "user123",
    "sessionId": "session456",
    "messageType": "chat",
    "processedMessage": "Processed: User message"
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Configuration

### Environment Variables

- `PORT`: Server port (default: 3000)

### CORS Configuration

The server is configured to accept requests from any origin. You can modify the CORS settings in `src/main.ts`:

```typescript
app.enableCors({
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

## Customization

### Adding New Webhook Types

1. Add a new method in `WebhookService`
2. Create a new endpoint in `WebhookController`
3. Implement your business logic

### Message Processing

Modify the `processChatMessage` method in `WebhookService` to add your custom message processing logic:

```typescript
private processChatMessage(message?: string): string {
  if (!message) return 'No message to process';
  
  // Add your custom logic here
  // - Sentiment analysis
  // - Intent detection
  // - Message classification
  // - etc.
  
  return `Processed: ${message}`;
}
```

## Production Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start:prod
```

### Docker (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in `src/main.ts` or set the `PORT` environment variable
2. **CORS errors**: Verify the CORS configuration in `src/main.ts`
3. **TypeScript errors**: Run `npm install` to ensure all dependencies are installed

### Logs

The application uses NestJS logging. Check the console output for detailed logs about webhook processing.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT #   c h a t b o t - w e b h o o k - n e s t j s  
 