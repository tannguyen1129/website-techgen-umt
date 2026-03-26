# 1. Install dependencies only when needed
FROM node:20-alpine AS deps
# Cần libc6-compat cho một số thư viện native
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# 2. Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# --- [QUAN TRỌNG] THÊM ĐOẠN NÀY ĐỂ NHẬN BIẾN LÚC BUILD ---
# Khai báo biến ARG (nhận từ docker-compose build --build-arg)
ARG NEXT_PUBLIC_API_URL
# Gán giá trị ARG vào biến môi trường ENV để quá trình build Next.js đọc được
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# ---------------------------------------------------------

# Build Next.js (Lúc này code sẽ được đóng gói với giá trị NEXT_PUBLIC_API_URL)
RUN npm run build

# 3. Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Set permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone build output
# (Yêu cầu file next.config.js phải có output: 'standalone')
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]