FROM node:gallium-alpine

WORKDIR /personalweb-backend
COPY . .

RUN npm i
RUN npm run test

EXPOSE 3000
CMD ["npm", "run", "start"]