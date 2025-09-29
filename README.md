# Travely NestJS API

A robust NestJS API with authentication, authorization, and user management features.

## 🚀 Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Authorization**: Role-based access control (RBAC) with guards
- **User Management**: Complete user CRUD operations
- **Role Management**: Flexible role system with TypeORM
- **Database**: PostgreSQL with TypeORM
- **Validation**: Built-in validation and error handling
- **Security**: Password hashing, JWT tokens, role guards

## 🛠️ Tech Stack

- **Framework**: NestJS 11
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT + Passport
- **Validation**: Class-validator
- **Language**: TypeScript

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run seed

# Start development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file with:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=travely_db
JWT_SECRET=your_jwt_secret
```

## 📚 API Endpoints

### Authentication
- `POST /auth/sign-up` - User registration
- `POST /auth/sign-in` - User login

### Users (Protected)
- `GET /users/me` - Get current user profile
- `GET /users/admin-only` - Admin only endpoint

## 🔐 Authentication Flow

1. **Sign Up**: User provides email, password, and other details
2. **Sign In**: User provides email and password
3. **JWT Token**: Server returns JWT token with user info
4. **Protected Routes**: Include `Authorization: Bearer <token>` header

## 👥 Roles

- `USER` - Basic user access
- `ADMIN` - Administrative access
- `SUPER_ADMIN` - Full system access
- `MODERATOR` - Content moderation
- `BUSINESS` - Business account

## 🏗️ Project Structure

```
src/
├── common/
│   ├── decorators/     # Custom decorators
│   ├── guards/         # Authentication guards
│   └── middleware/     # Custom middleware
├── database/
│   ├── seeds/          # Database seeds
│   └── *.ts           # Database configuration
├── modules/
│   ├── auth/          # Authentication module
│   ├── users/         # User management
│   └── roles/         # Role management
└── main.ts            # Application entry point
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run seed` - Seed database
- `npm run clear:db` - Clear database
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the UNLICENSED License.