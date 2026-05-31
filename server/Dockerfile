FROM golang:1.26-alpine

WORKDIR /app

ARG AIR_VERSION=latest

RUN apk add --no-cache git curl

RUN go install github.com/air-verse/air@${AIR_VERSION}

COPY go.mod go.sum ./
RUN go mod download

COPY . .

CMD ["go", "run", "main.go"]
