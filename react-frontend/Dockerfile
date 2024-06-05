# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the build files
RUN npm install -g serve

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Serve the build files
CMD ["serve", "-s", "build"]
