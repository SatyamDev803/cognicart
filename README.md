# CogniCart AI Project

CogniCart is a modern e-commerce analytics platform built with FastAPI and Next.js, featuring AI-powered sales insights and real-time data visualization.

## 🚀 Features

- **Sales Analytics Dashboard**
  - Real-time sales tracking
  - Interactive data visualization
  - Performance metrics and KPIs

- **Modern UI/UX**
  - Responsive design
  - Dark/Light theme support
  - Shadcn UI components

- **Robust Backend**
  - FastAPI REST API
  - SQLAlchemy ORM
  - Alembic migrations
  - Docker containerization

## 🛠 Tech Stack

### Backend
- FastAPI (Python 3.12+)
- SQLAlchemy
- Alembic
- PostgreSQL
- Docker & Docker Compose
- Poetry for dependency management

### Frontend
- Next.js 14
- Shadcn UI
- Tailwind CSS
- React Query
- TypeScript

## 🏃‍♂️ Getting Started

### Prerequisites
- Python 3.12+
- Node.js 18+
- Docker & Docker Compose
- Poetry (Python package manager)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SatyamDev803/cognicart.git
   cd cognicart
   ```

2. **Environment Setup**
   ```bash
   cd backend
   cp .env.example .env  # Configure your environment variables
   ```

3. **Run with Docker**
   ```bash
   docker-compose up --build
   ```
   The backend will be available at `http://localhost:8000`
   API documentation (Swagger UI) at `http://localhost:8000/docs`

4. **Run Locally (Alternative)**
   ```bash
   cd backend
   poetry install
   poetry shell
   alembic upgrade head
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

## 📚 API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🗄 Database Migrations

```bash
cd backend
alembic revision --autogenerate -m "description"
alembic upgrade head
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Development Guidelines

1. **Code Style**
   - Backend: Follow PEP 8
   - Frontend: ESLint & Prettier configuration

2. **Git Workflow**
   - Create feature branches from `main`
   - Use conventional commits
   - Submit PRs for review

3. **Environment Variables**
   - Never commit `.env` files
   - Use `.env.example` as a template

## 🔒 Security

- All API endpoints are protected with proper authentication
- Environment variables are properly handled
- Input validation on both frontend and backend
- CORS configuration in place

## 📦 Deployment

### Production Build

1. **Backend**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm run build
   ```

## 📈 Monitoring

- Backend metrics available at `/metrics`
- Logging configured for production
- Error tracking integrated

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- [@SatyamDev803](https://github.com/SatyamDev803)