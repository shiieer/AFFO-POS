# AFFO POS

Point-of-sale system for cafes and small restaurants. Includes a **FastAPI** backend and an **Expo (React Native)** staff app for managing menu, orders, tables, and sales reports.

## Project structure

```
pos_affo/
├── .gitignore
├── README.md
├── backend/
│   ├── app/                  # FastAPI application
│   ├── tests/                # Pytest suite (API + unit tests)
│   ├── requirements.txt      # Runtime Python dependencies
│   ├── requirements-test.txt # Test dependencies
│   ├── pytest.ini
│   └── .env.example          # Copy to .env (never commit .env)
└── app/                      # Expo mobile app (staff POS)
    ├── src/
    │   ├── features/         # Orders, menu, reports, new order, auth
    │   └── services/         # API client & token storage
    ├── package.json
    └── .env.example          # Copy to .env (optional)
```

## Features

### Backend
- JWT authentication (admin & staff roles)
- Menu CRUD with image upload (Supabase Storage)
- Order lifecycle (create → prepare → serve → pay)
- Table management with QR codes (Supabase Storage)
- Sales reports with date filters
- User management (admin only)
- Auto-generated API docs at `/docs`

### Mobile app
- Staff login with secure token storage
- New order flow with cart
- Order board with status filters
- Menu & reports screens
- Responsive layout (tablet-friendly navigation)

---

## Prerequisites

| Tool | Version |
|------|---------|
| Python | 3.11+ |
| Node.js | 18+ |
| npm | 9+ |
| Expo Go | Latest |
| Supabase account | For menu images & QR storage |

---

## Backend setup

### 1. Create virtual environment

```bash
cd backend
python -m venv venv
```

**Windows (PowerShell):**
```powershell
venv\Scripts\activate
```

**macOS / Linux:**
```bash
source venv/bin/activate
```

### 2. Install dependencies

Runtime only:

```bash
pip install -r requirements.txt
```

Development & tests (includes runtime deps):

```bash
pip install -r requirements-test.txt
```

### 3. Environment variables

Copy the example file and fill in your values.

**Windows:**
```powershell
copy .env.example .env
```

**macOS / Linux:**
```bash
cp .env.example .env
```

`backend/.env`:

```env
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///./data/pos.db
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-admin-password

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_MENU_BUCKET=menu_images
SUPABASE_QR_BUCKET=qr_codes
```

### 4. Supabase Storage

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create **public** buckets: `menu_images`, `qr_codes`
3. Copy **Project URL** and **service_role** key into `backend/.env`

### 5. Run the API

```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

| URL | Description |
|-----|-------------|
| http://localhost:8000 | API root |
| http://localhost:8000/docs | Swagger UI |

---

## Mobile app setup

### 1. Install dependencies

```bash
cd app
npm install
```

### 2. Environment (optional)

Copy and edit if you need a custom API URL:

```bash
copy .env.example .env   # Windows
cp .env.example .env     # macOS / Linux
```

```env
API_URL=http://localhost:8000
```

| Device | API URL |
|--------|---------|
| Android emulator | `http://10.0.2.2:8000` (default in code) |
| iOS simulator | `http://localhost:8000` |
| Physical device | `http://YOUR_PC_LAN_IP:8000` |

### 3. Start Expo

```bash
cd app
npm start
```

Press `a` for Android, `i` for iOS, or scan the QR code with Expo Go.

---

## Running tests

Tests live in `backend/tests/`

```bash
cd backend
pytest
```

Run by category:

```bash
pytest tests/api          # HTTP / endpoint tests
pytest tests/unit         # Service & helper unit tests
pytest tests/api/test_auth.py -v
```

With coverage:

```bash
pytest --cov=app --cov-report=term-missing
```

HTML coverage report: `backend/htmlcov/index.html` (ignored by git)

Tests mock Supabase — no real network calls during `pytest`.

---

## API overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/login` | Public | Login, returns JWT |
| GET | `/auth/me` | User | Current user profile |
| GET | `/menu` | Public | List menu items |
| POST | `/menu` | Admin | Create menu item |
| POST | `/menu/{id}/image` | Admin | Upload menu image |
| DELETE | `/menu/{id}/image` | Admin | Remove menu image |
| POST | `/order` | Public | Create order (customer) |
| GET | `/order` | Staff | List orders |
| PATCH | `/order/{id}/status` | Staff | Update order status |
| PATCH | `/order/{id}/payment` | Staff | Mark paid / payment method |
| GET | `/tables` | Admin | List tables |
| POST | `/tables` | Admin | Create table + QR |
| GET | `/tables/{id}/qr` | Admin | Redirect to QR image |
| GET | `/reports/sales` | Admin | Sales report |
| POST | `/users` | Admin | Create staff user |

Full interactive docs: http://localhost:8000/docs

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Backend | FastAPI, SQLAlchemy, SQLite |
| Auth | JWT (python-jose), bcrypt |
| Storage | Supabase Storage |
| Mobile | React Native, Expo, NativeWind |
| HTTP client | Axios |
| Tests | pytest, httpx, pytest-cov |

---

