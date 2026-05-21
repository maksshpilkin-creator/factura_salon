FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build:css

FROM nginx:alpine AS runner
COPY --from=build /app/index.html /app/style.css /app/script.js /usr/share/nginx/html/
COPY --from=build /app/assets /usr/share/nginx/html/assets
COPY --from=build /app/dist /usr/share/nginx/html/dist
COPY --from=build /app/vendor /usr/share/nginx/html/vendor
COPY --from=build /app/photos_inside /usr/share/nginx/html/photos_inside
