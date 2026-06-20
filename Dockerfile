# Multi-arch compatible — builds for linux/amd64 and linux/arm64
# docker buildx build \
#   --platform linux/amd64,linux/arm64 \
#   -t lmwcode/ggservices-frontend:v1.0.0 \
#   --no-cache --push .

FROM nginx:1.27-alpine

# Remove the default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy site files into the nginx web root
COPY index.html   /usr/share/nginx/html/
COPY home.css     /usr/share/nginx/html/
COPY menu.js      /usr/share/nginx/html/
COPY fonts/       /usr/share/nginx/html/fonts/
COPY images/      /usr/share/nginx/html/images/

# Custom nginx config — gzip, caching headers and security headers
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost/ || exit 1
