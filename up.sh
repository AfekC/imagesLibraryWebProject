#!/bin/bash

# Run the Docker container in detached mode and capture the container ID
CONTAINER_ID=$(docker run -d -p 3000:3000 sha256:4ae59c3b5d8573156d1d40ea3fdc8653c98751ad07ca67498ce6aaa2d407d551)

# Copy files from the container to the local machine
docker cp $CONTAINER_ID:/ C:/Users/user/OneDrive/Desktop/cofig

# Additional commands or cleanup if needed

# Display the container ID for reference
echo "Container ID: $CONTAINER_ID"