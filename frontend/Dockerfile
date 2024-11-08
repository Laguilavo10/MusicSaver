# Use a lightweight base image
FROM node:18.19.1-alpine

# Set the working directory
WORKDIR /app

# Copy only the dependency files first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project files
COPY . .

# Expose port 4200
EXPOSE 4200

# Command to start the application
# CMD ["npm", "run", "start"]
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--disable-host-check", "--port", "4200"]