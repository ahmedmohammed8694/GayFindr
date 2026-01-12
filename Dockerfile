# Multi-stage build for NestJS backend
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY turbo.json ./

FROM base AS deps
RUN npm ci --only=production

FROM base AS build
COPY . .
RUN npm ci --legacy-peer-deps
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/apps/backend/dist ./dist
COPY --from=build /app/apps/backend/package.json ./
COPY --from=build /app/apps/backend/prisma ./prisma

EXPOSE 3000
CMD ["node", "dist/main"]