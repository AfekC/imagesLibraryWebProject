# Use an official Node.js image as the base image
FROM node:18-alpine

# Copy package.json and package-lock.json to the working directory
COPY package.json ./package.json
COPY tsconfig.json ./tsconfig.json
COPY .env ./.env
COPY babel.config.js ./babel.config.js
COPY src ./src
COPY images ./images
COPY certs ./certs

# Install dependencies
RUN npm install
# Build TypeScript code
RUN npm run build
# Command to run your application
CMD ["node", "dist/index.js"]
