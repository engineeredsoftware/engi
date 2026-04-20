FROM node:24-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4318
ENV HOST=0.0.0.0

COPY package.json ./
COPY server.js ./
COPY src ./src
COPY public ./public
COPY test ./test
COPY HOST_CAPABILITIES.md ./HOST_CAPABILITIES.md
COPY HOST_CAPABILITIES.json ./HOST_CAPABILITIES.json
COPY README.md ./README.md

EXPOSE 4318

CMD ["npm", "start"]
