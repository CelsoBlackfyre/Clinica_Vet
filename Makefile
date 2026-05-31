# Clinica Vet - Development Makefile

.PHONY: help dev up up-d down logs logs-backend logs-db clean db-reset compose-check test-frontend typecheck build-frontend test-backend restart-backend

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Local development (without Docker)
dev: ## Start frontend + backend locally (requires MySQL running)
	@echo "Starting local development..."
	@echo "Make sure MySQL is running and server/.env is configured"
	@cd server && go run main.go & npm run dev

# Docker workflows
up: ## Start all services with Docker Compose
	docker compose up --build

up-d: ## Start all services in detached mode
	docker compose up -d --build

compose-check: ## Validate Docker Compose configuration
	docker compose config

down: ## Stop and remove all containers
	docker compose down

logs: ## Follow logs from all services
	docker compose logs -f

logs-backend: ## Follow backend logs only
	docker compose logs -f backend

logs-db: ## Follow database logs only
	docker compose logs -f db

test-frontend: ## Run frontend tests inside Docker
	docker compose run --rm frontend-test

typecheck: ## Run TypeScript typecheck inside Docker
	docker compose run --rm frontend-typecheck

build-frontend: ## Run frontend production build inside Docker
	docker compose run --rm frontend-build

test-backend: ## Run backend tests inside Docker
	docker compose run --rm backend-test

clean: ## Remove containers, volumes, and build artifacts
	docker compose down -v
	rm -rf server/tmp

db-reset: ## Reset the database (drops and recreates)
	@echo "This will destroy all data in the database!"
	@docker compose down
	@docker volume rm clinica_vet_mysql_data 2>/dev/null || true
	@docker compose up -d db
	@echo "Database volume removed. Run 'make up' to restart everything."

# Backend specific
backend-build: ## Build backend Docker image only
	docker compose build backend

# Frontend specific
frontend-build: ## Build frontend Docker image only
	docker compose build frontend

# Quick commands
restart-backend: ## Restart only the backend service
	docker compose restart backend
