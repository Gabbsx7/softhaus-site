FROM node:alpine

# Install serve
RUN npm install -g serve@14.2.1

# Copy files
COPY . /app
WORKDIR /app

# Remove any config files
RUN rm -f serve.json package*.json server.js

# Start serve with Railway-compatible configuration
CMD ["sh", "-c", "serve . -l tcp://0.0.0.0:${PORT:-3000}"]