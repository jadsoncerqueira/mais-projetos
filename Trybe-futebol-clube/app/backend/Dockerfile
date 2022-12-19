FROM node:16.14-alpine
WORKDIR /app-backend

COPY . .

EXPOSE 3001

RUN npm install

ENTRYPOINT [ "npm", "run"]

CMD ["start"]

# criar migrations e models


# Iniciando o projeto

#FROM node:16.14-alpine

#WORKDIR /app-backend

# trazer o package.json para instalação do app na nova imagem
#COPY package* ./

#EXPOSE 3001

# instalar as dependencias
#RUN npm install

# copiar todas as novas dependencias neste app
#COPY . .

#ENTRYPOINT ["npm", "run"]

#CMD [ "dev" ]