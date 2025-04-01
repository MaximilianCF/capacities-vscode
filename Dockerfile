FROM node:18

# Instala dependências globais
RUN npm install -g yo generator-code vsce@2.13.0 typescript

WORKDIR /workspace

# Copia só o package.json e lock (se houver) para instalação
COPY package*.json ./
RUN npm install

# Copia todo o restante (src, tsconfig, etc.)
COPY . .

CMD ["npm", "run", "watch"]
