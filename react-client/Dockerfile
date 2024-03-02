FROM nginx:alpine
RUN rm -f /etc/nginx/conf.d/default.conf
COPY ../server/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
