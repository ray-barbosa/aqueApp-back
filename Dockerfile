# build do Typescript

FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# execução do projeto já compilado
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/build ./build
COPY .env .env

CMD ["node", "build/index.js"]