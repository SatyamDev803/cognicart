# CogniCart – AI-Powered E-commerce Analytics Platform

CogniCart is an AI-powered, full-stack e-commerce analytics platform that transforms raw sales data into actionable insights. Featuring a FastAPI backend and a Next.js frontend, CogniCart leverages AI for natural language data querying and semantic product search.

---

## 🚀 Features

### 1. Core Data Management
- **CRUD Operations:** Manage products and sales records.
- **Advanced Tables:** Interactive data tables with client-side sorting/filtering (TanStack Table).
- **Optimistic UI:** Instant updates without full-page reloads.

### 2. User & Access Control
- **Authentication:** Secure JWT-based user registration and login.
- **RBAC:** Role-based permissions for Admins and Viewers.

### 3. Analytics & Visualization
- **Dashboards:** Dynamic charts (Recharts/Chart.js) for KPIs like sales trends and top products.
- **Backend Aggregations:** FastAPI endpoints for real-time data calculations.

### 4. AI-Powered Tools
- **Sales Analyst Agent:** Ask natural language questions about your data (RAG pipeline).
- **Semantic Search:** Vector-embedding search for meaning-based queries.

---

## 🛠 Tech Stack

| Area         | Technologies                                                      |
|--------------|-------------------------------------------------------------------|
| **Backend**  | Python, FastAPI, SQLAlchemy, Pydantic, Alembic                    |
| **Database** | PostgreSQL                                                        |
| **Frontend** | Next.js, React, Tailwind CSS, shadcn/ui, TanStack Table, Sonner   |
| **DevOps**   | Docker, Docker Compose, Poetry, Conventional Commits, GitHub Actions |

---

## 🏁 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- Docker & Docker Compose
- Poetry

### Backend
1. `cd backend`
2. `cp .env.example .env` (edit with your DB URL)
3. `docker-compose up --build`
4. Visit `http://localhost:8000`

### Frontend
1. `cd frontend`
2. `cp .env.local.example .env.local`
3. `npm install`
4. `npm run dev`
5. Visit `http://localhost:3000`

---

## 📚 API & Database

- **Swagger:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

### Database Migrations
```bash
# In backend directory
alembic revision --autogenerate -m "Your migration message"
alembic upgrade head
```

---

## 🤝 Contributing

Contributions are welcome! Fork the repo, create a feature branch, and submit a pull request.

## 📄 License

MIT License. See the LICENSE file for details.