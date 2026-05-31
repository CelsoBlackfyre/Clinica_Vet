# Development Dockerfile for Go backend with Air hot reload
FROM golang:1.26-alpine

WORKDIR /app

ARG AIR_VERSION=latest

# Install required tools
RUN apk add --no-cache git curl

# Install Air for hot reload
RUN go install github.com/air-verse/air@${AIR_VERSION}

# Copy go mod files first (for caching)
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source (will be overridden by volume in docker-compose)
COPY . .

# Default command - will be overridden by docker-compose when using air
CMD ["go", "run", "main.go"]
