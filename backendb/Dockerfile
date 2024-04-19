FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

EXPOSE 8787

CMD ["npm", "run", "dev"]

