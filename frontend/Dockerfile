# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Instala dependências primeiro (camada cacheável)
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

EXPOSE 5173

# Vite precisa de --host para aceitar conexões de fora do container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
