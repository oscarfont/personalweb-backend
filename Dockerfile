FROM node:gallium-alpine

WORKDIR /personalweb-backend
COPY . .

RUN npm i

EXPOSE 3000
CMD ["npm", "run", "start"]