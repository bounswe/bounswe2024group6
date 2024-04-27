# Using a specific node version for consistency
FROM node:16

# Create and set the working directory
WORKDIR /app

# First copy only the package.json and package-lock.json
COPY package*.json ./

# Install dependencies, ensuring all layers are rebuilt if package.json changes
RUN npm install

# Now copy the rest of the frontend code
COPY . .

# Expose the port that Vite uses
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "dev"]
