# Builder stage
FROM node:20.18.1-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
RUN npx prisma generate
COPY . .
RUN npm run build

# Production stage
FROM node:20.18.1-alpine AS production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm pkg delete scripts.prepare
RUN npm ci --omit=dev
COPY prisma ./prisma/
RUN npx prisma generate
COPY --from=builder /app/dist ./dist
EXPOSE 9876
CMD ["node", "dist/src/server.js"]