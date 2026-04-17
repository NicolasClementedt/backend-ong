# backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Instala dependências primeiro (camada cacheável)
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

EXPOSE 3000

# O comando real é definido no docker-compose (para incluir migrate + start:dev)
CMD ["npm", "run", "start:dev"]
