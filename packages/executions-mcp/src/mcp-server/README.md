# Bitcode MCP Server - Production Ready

The **Bitcode MCP Server** is a production-grade Model Context Protocol implementation that exposes Bitcode's sophisticated engineering intelligence platform through standardized interfaces.

## 🚀 Features

### Core Capabilities
- **Extensive Tool Set** across multiple categories (Pipeline, Analysis, Intelligence, Orchestration, etc.)
- **Real-time Pipeline Streaming** via WebSocket and Server-Sent Events
- **Local Repository Support** for working with code on your machine
- **Enterprise Authentication** with API keys and session management
- **Production Monitoring** with alerts, health checks, and metrics

### Production Hardening
- **Graceful Shutdown** with request draining and state persistence
- **Circuit Breakers** for external service failures
- **Rate Limiting** with configurable limits per user/organization
- **Resource Management** with memory limits and execution timeouts
- **Error Recovery** with exponential backoff and retry strategies
- **Health Monitoring** with comprehensive health checks

## 📦 Installation

```bash
# Install dependencies
npm install

# Build the server
npm run build

# Run tests
npm test
```

## 🔧 Configuration

### Environment Variables
```bash
NODE_ENV=production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
SERVER_ID=mcp-server-1
LOG_LEVEL=info
```

### Production Configuration
Create `config/production.json` with your production settings. See `config/production.json` for the full schema.

## 🚀 Deployment

### Docker
```bash
# Build image
docker build -t engi/mcp-server -f deployment/docker/Dockerfile .

# Run container
docker run -d \
  -p 3000:3000 \
  -p 8080:8080 \
  -e NODE_ENV=production \
  -e SUPABASE_URL=$SUPABASE_URL \
  -e SUPABASE_SERVICE_KEY=$SUPABASE_SERVICE_KEY \
  engi/mcp-server
```

### Kubernetes
```bash
# Create namespace
kubectl create namespace engi

# Create secrets
kubectl create secret generic engi-secrets \
  --from-literal=supabase-url=$SUPABASE_URL \
  --from-literal=supabase-service-key=$SUPABASE_SERVICE_KEY \
  -n engi

# Deploy
kubectl apply -f deployment/kubernetes/deployment.yaml
```

## 🔒 Authentication

### API Key Authentication
```bash
# Create API key in Supabase
INSERT INTO api_keys (user_id, name, permissions)
VALUES ('user-id', 'MCP Access', '{"tools": ["create", "read"], "pipelines": ["execute"]}');

# Use with MCP
export MCP_API_KEY=your-api-key
```

### Session Authentication
Use existing Supabase session tokens from authenticated users.

## 📊 Monitoring

### Health Checks
- **Health Endpoint**: `GET /health`
- **Readiness Endpoint**: `GET /ready`
- **Metrics Endpoint**: `GET /metrics` (Prometheus format)

### Production Alerts
The server monitors and alerts on:
- High error rates (>5%)
- Circuit breaker activations
- Memory usage (>80%)
- Response times (>5s)
- Authentication failures
- Pipeline failures

## 🛠️ Local Development

### Setup for Claude Code
1. Create `.claude/mcp_server_config.json`:
```json
{
  "mcpServers": {
    "engi": {
      "command": "node",
      "args": ["/path/to/engi/packages/mcp-server/dist/index.js"],
      "env": {
        "NODE_ENV": "development",
        "SUPABASE_URL": "your-url",
        "SUPABASE_SERVICE_KEY": "your-key"
      }
    }
  }
}
```

2. Restart Claude Code to load the MCP server

### Working with Local Repositories
```typescript
// Use the local provider
const result = await mcp.executeTool('analyze-repository', {
  repository: {
    name: 'my-project',
    path: '/Users/me/projects/my-project',
    provider: 'local'
  }
});
```

## 📈 Performance

### Resource Limits
- Max memory: 2GB (configurable)
- Max execution time: 60s per request
- Max concurrent requests: 100 per user
- Max payload size: 50MB

### Optimizations
- LRU cache for auth contexts (10k entries, 5min TTL)
- Connection pooling for database queries
- Streaming responses for large datasets
- Worker coordination for pipeline execution

## 🔍 Troubleshooting

### Common Issues

1. **Authentication Failures**
   - Check API key permissions
   - Verify Supabase connection
   - Check rate limits

2. **Pipeline Execution Issues**
   - Verify `run_jobs` table exists
   - Check worker processes
   - Monitor pipeline queue

3. **Memory Issues**
   - Adjust `MAX_MEMORY_MB` environment variable
   - Check for memory leaks in monitoring
   - Enable heap snapshots if needed

### Debug Mode
```bash
LOG_LEVEL=debug NODE_ENV=development npm start
```

## 🧪 Testing

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# Load tests
npm run test:load
```

## 📚 API Documentation

### Tool Categories
1. **Pipeline Tools** - Execute the Deliverable SDIVS pipeline
2. **Analysis Tools** - Code analysis and insights
3. **Intelligence Tools** - AI-powered features
4. **Orchestration Tools** - Workflow management
5. **Enterprise Tools** - Team and credit management
6. **LSP Tools** - Language server features
7. **Observability Tools** - Monitoring and tracing
8. **Jira Tools** - Project management integration
9. **Monitoring Tools** - Performance tracking

### Resource Types
- Pipeline execution results
- Organization analytics
- Agent capabilities
- System metrics

### Prompt Templates
- Workflow generation
- Code analysis
- Development patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

© 2025 Bitcode. All rights reserved.
