FROM node:20-alpine

RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY --chown=app:node package*.json .


CMD npm install & npm run dev -- --host