
# Clinica Vet — Sistema de Gestão para Clínica Veterinária

> **Status**: Em processo de grande refatoração (Fase 1/5 em andamento).

Sistema completo para gerenciamento de clínica veterinária com frontend em React + TypeScript e backend em Go + Gin + GORM + MySQL.

## Tecnologias

**Frontend**
- Vite + React 18 + TypeScript
- Tailwind CSS + Material UI (em transição para shadcn/ui)
- React Router v6 (em migração a partir de wouter)
- Axios + Vitest + Testing Library

**Backend**
- Go 1.22 + Gin
- GORM + MySQL
- JWT (planejado para Fase 5)

## Como Rodar

### Opção Recomendada: Docker Compose (Fase 2)

Esta é agora a forma mais fácil e confiável de rodar o projeto completo.

```bash
# 1. Configure as variáveis de ambiente
cp .env.example .env
# (Opcional) Ajuste senhas e portas no .env

# 2. Suba tudo (MySQL + Backend + Frontend)
make up
# ou
docker compose up --build
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080
- **MySQL**: localhost:3306 (user: clinica / pass: clinica123 por padrão)

O backend usa hot reload via **Air** dentro do container.

Para parar:
```bash
make down
# ou
docker compose down
```

### Desenvolvimento Local (sem Docker)

#### Backend

```bash
cd server
cp .env.example .env     # edite com suas credenciais locais
go mod tidy
go run main.go
```

#### Frontend

```bash
npm install
npm run dev
```

> **Nota**: Você precisa ter MySQL rodando localmente e o banco `clinica_vet` criado.

### Banco de Dados

- O backend executa `AutoMigrate` automaticamente (tabelas são criadas/atualizadas na inicialização).
- Na Fase 5 migraremos para `golang-migrate` com versionamento real de schema.

## Fases de Melhoria em Andamento

Este projeto está passando por uma transformação completa em 5 fases:

1. **Stabilization** (atual) — Remoção de segredos, limpeza de dependências, unificação de tipos de ID
2. **Foundation** — Docker Compose, contratos de API consistentes, DX
3. **Completeness** — Tornar Pets, Vets e Consultas totalmente funcionais
4. **Quality** — Testes + CI/CD
5. **Production Hardening** — Auth JWT, migrações reais, logging, paginação

## Contribuindo

Veja o plano completo de melhorias em `.grok/sessions/.../plan.md` (ou pergunte ao mantenedor).

## Licença

MIT
