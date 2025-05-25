# Ziraa 🚀

A robust Ticket Support System REST API crafted using Node.js and TypeScript, designed to adhere to industry standards for scalability, security, and maintainability.

## ✨ Features

- 🔐 JWT-based Authentication (Access and Refresh Tokens)
- 👥 Role-based Access Control
- 🗄️ PostgreSQL Database with Prisma ORM
- 📝 Request Validation with Zod
- 📊 Structured Logging with Winston
- 📈 Monitoring with Prometheus, Grafana, and Loki
- 🐳 Docker Support
- 🔍 ESLint & Prettier Configuration
- 🧪 TypeScript Support
- 🔄 Redis Integration for Caching

## 📋 Prerequisites

- Node.js >= 18
- PostgreSQL >= 14
- Docker (optional)

## 🚀 Quick Start
```
# Clone the repository
git clone https://github.com/iraianbuuu/ziraa.git
cd ziraa

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Using Docker or manually set up PostgreSQL
npm run docker:up

# Run database migrations
npm run prisma:migrate

# Start development server
npm run dev
```

## 🐳 Seperate Docker Container

```
# Build the image
docker build -t ziraa:v1 .

# Run the application
docker run -d -p 9876:9876 --net ziraa-container_ziraa-network --env-file .env.docker --name ziraa-backend-server ziraa:v1
```

## 📚 API Documentation

### Authentication

```http
# Register User
POST /api/v1/auth/register

# Login
POST /api/v1/auth/login
```

### Users

```http
# Get User by ID
GET /api/v1/users/:id
Authorization: Bearer <token>

# Update User
PUT /api/v1/users/:id
Authorization: Bearer <token>

# Delete User
DELETE /api/v1/users/:id
Authorization: Bearer <token>

# Get all Users (Admin/Tech Lead only)
GET /api/v1/users
Authorization: Bearer <token>
Role: ADMIN (All), TECH_LEAD (Project)
Query Parameters:
  - page: integer (optional) - Page number for pagination
  - limit: integer (optional) - Number of users per page
  - name: string (optional) - Filter users by name
  - role: string (optional) - Filter users by role
  - sort: string (optional) - Sort users by name or project
```

### Tickets

```http
# Create Ticket
POST /api/v1/tickets
Authorization: Bearer <token>

# Get Ticket by ID
GET /api/v1/tickets/:id
Authorization: Bearer <token>

# Get all Tickets (Admin/Tech Lead only)
GET /api/v1/tickets
Authorization: Bearer <token>
Role: ADMIN (All), TECH_LEAD (Project)
Query Parameters:
  - page: integer (optional) - Page number for pagination
  - perPage: integer (optional) - Number of tickets per page
  - status: string (optional) - Filter tickets by status
  - priority: string (optional) - Filter tickets by priority
  - project: string (optional) - Filter tickets by project
  - sort: string (optional) - Sort tickets by project (project:asc, project:desc)

# Update Ticket
PUT /api/v1/tickets/:id
Authorization: Bearer <token>

# Update Ticket Status
PATCH /api/v1/tickets/:id/status
Authorization: Bearer <token>
Note: Status transitions follow specific workflow rules

# Delete Ticket
DELETE /api/v1/tickets/:id
Authorization: Bearer <token>
```

### Comments

```http
# Add Comment to Ticket
POST /api/v1/tickets/:id/comments
Authorization: Bearer <token>

# Get All Comments for a Ticket
GET /api/v1/tickets/:id/comments
Authorization: Bearer <token>
Query Parameters:
  - page: integer (optional) - Page number for pagination
  - perPage: integer (optional) - Number of comments per page

# Delete Comment
DELETE /api/v1/tickets/:id/comments/:commentId
Authorization: Bearer <token>
```

### Metrics and Documentation

```http
# Application metrics endpoint (Prometheus)
GET /api/v1/metrics

# API Documentation (Swagger)
GET /api/v1/api-docs
```

### 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run format      # Run Prettier

# Database
npm run prisma:migrate # Run database migrations

# Docker
npm run docker:up   # Start Docker containers
npm run docker:down # Stop Docker containers
```

### Project Structure

```
📦 ziraa
├── 📂 grafana
│   ├── 📄 log.dashboard.json / Loki logs
│   └── 📄 monitoring.dashboard.json / Application monitoring
├── 📂 src
│   ├── 📂 config/ Configuration files
│   ├── 📂 exceptions/ Custom exceptions
│   ├── 📂 middleware / Express middleware
│   ├── 📂 modules / Feature Modules
│   ├── 📂 utils / Utility functions
│   ├── 📄 app.ts / Express app
│   └── 📄 server.ts / Server entry point
├── 📂 prisma
│   └── 📄 schema.prisma / Database schema
├── 📄 .env
├── 📄 .dockerignore
├── 📄 .env.docker
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 .prettierrc
├── 📄 docker-compose.yaml
├── 📄 Dockerfile
├── 📄 eslint.config.mjs
├── 📄 openapi.json
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 prometheus.yml
├── 📄 README.md
└── 📄 tsconfig.json
```

## 🛠️ Monitoring Stack

The application includes a comprehensive monitoring stack:

- **Prometheus:** Collects and stores metrics from the application
- **Grafana:** Visualizes metrics with customizable dashboards
- **Loki:** Log aggregation system integrated with Grafana

Access the monitoring tools after starting the Docker containers:
- Grafana: http://localhost:3000 (admin/password)
- Prometheus: http://localhost:9090

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks


## 🙏 Acknowledgments

- [Express](https://expressjs.com/) - Web framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Winston](https://github.com/winstonjs/winston) - Logging
- [Zod](https://github.com/colinhacks/zod) - Schema validation
- [Morgan](https://github.com/expressjs/morgan) - HTTP Logging
- [Prometheus](https://prometheus.io/) - Metrics collection and alerting
- [Grafana](https://grafana.com/) - Metrics visualization
- [Loki](https://grafana.com/oss/loki/) - Log aggregation
- [Redis](https://redis.io/) - In-memory data store
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## 📞 Support

For support, email [iraianbu011@gmail.com](mailto:your-email@example.com) or open an issue in the repository.

---

Made with ❤️ by [Iraianbu](https://github.com/iraianbuuu)
