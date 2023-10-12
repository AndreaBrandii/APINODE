# Usa la imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios al directorio de trabajo
COPY package*.json ./
COPY server.js ./

# Instala las dependencias
RUN npm install

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
