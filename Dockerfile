FROM node:18

WORKDIR /app

COPY setup.sh ./
RUN chmod +x ./setup.sh 
RUN ./setup.sh

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm", "run", "dev"]
