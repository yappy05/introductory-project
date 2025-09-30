FROM node:18-alpine

WORKDIR /app

# Копируем ВСЕ файлы проекта
COPY . .

# Устанавливаем зависимости включая devDependencies (нужны для билда)
RUN npm ci

# Устанавливаем NestJS CLI глобально ИЛИ используем npx
RUN npm install -g @nestjs/cli

# Собираем приложение
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]