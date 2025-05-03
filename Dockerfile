FROM node:20.12-alpine AS build
WORKDIR /build
COPY prisma/ ./prisma
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.12-alpine AS production
WORKDIR /app
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/package*.json ./
COPY --from=build /build/dist ./dist
COPY --from=build /build/tsconfig.json ./
COPY --from=build /build/prisma ./prisma
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && npm run start:dev"]