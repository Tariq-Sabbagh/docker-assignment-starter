FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/ && \
    npm install --fetch-timeout=300000 --fetch-retries=5

COPY app.js .
COPY message.txt .

EXPOSE 3000
CMD ["npm", "start"]
