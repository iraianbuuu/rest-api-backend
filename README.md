# Ziraa 🚀

A robust Ticket Support System REST API crafted using Node.js and TypeScript, designed to adhere to industry standards for scalability, security, and maintainability.

## ✨ Features

- 🔐 JWT-based Authentication
- 👥 Role-based Access Control
- 🗄️ PostgreSQL Database with Prisma ORM
- 📝 Request Validation with Zod
- 📊 Structured Logging with Winston
- 🐳 Docker Support
- 🔍 ESLint & Prettier Configuration
- 🧪 TypeScript Support

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
npx prisma migrate dev

# Start development server
npm run dev
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
# Get User
GET /api/v1/users/:id
Authorization: Bearer <token>

# Update User
PUT /api/v1/users/:id
Authorization: Bearer <token>

# Delete User
DELETE /api/v1/users/:id
Authorization: Bearer <token>

# Get all Users
GET /api/v1/users/:id
Authorization: Bearer <token>
Role : ADMIN (All) , TECH_LEAD (Project)
```

### Tickets

```http
# Create Ticket
POST /api/v1/tickets
Authorization : Bearer <token>

# Get Ticket
GET /api/v1/tickets/:id
Authorization: Bearer <token>

# Get all Tickets
GET /api/v1/tickets/:id
Authorization: Bearer <token>
Role : ADMIN (All) , TECH_LEAD (Project)
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
```

### Project Structure

```
📦 ziraa
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
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 .prettierrc
├── 📄 docker-compose.yaml
├── 📄 eslint.config.mjs
├── 📄 openapi.json
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README.md
└── 📄 tsconfig.json
```

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
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## 📞 Support

For support, email [iraianbu011@gmail.com](mailto:your-email@example.com) or open an issue in the repository.

---

Made with ❤️ by [Iraianbu](https://github.com/iraianbuuu)
