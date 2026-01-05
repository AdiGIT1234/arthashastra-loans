# Arthashastra – Smart Loan Comparison & Eligibility Platform

Arthashastra is a full-stack web application that helps users **compare loan options across multiple lenders** and **check loan eligibility** using transparent, rule-based financial logic.

The system focuses on **clarity, explainability, and correctness**, ensuring users understand *why* a particular loan is recommended and *whether* they are eligible.

---

## 🚀 Core Idea

Loan selection is often confusing due to:
- Varying interest rates across lenders
- Hidden or unclear processing fees
- Difficulty comparing EMI vs total repayment
- Lack of clarity around eligibility criteria

**Arthashastra addresses these problems by:**
1. Comparing the **same loan type across multiple banks**
2. Calculating EMI and total repayment cost on the backend
3. Ranking loan options by overall affordability
4. Estimating user eligibility using realistic financial rules

---

## ✨ Features

### 🔹 Loan Comparison
- Compare loans from multiple banks and finance companies
- Backend-driven EMI calculation
- Transparent breakdown for each lender:
  - Interest rate
  - Monthly EMI
  - Total interest payable
  - Processing fee
  - Total repayment cost
- Automatically highlights the most cost-effective option

---

### 🔹 Eligibility Check
- Rule-based loan eligibility estimation
- User inputs:
  - Monthly income
  - Existing EMIs
  - Age
  - Employment type
  - Loan amount
  - Loan tenure
- Outputs:
  - Eligible / Not eligible status
  - Estimated monthly EMI
  - EMI-to-income ratio (FOIR)
  - Maximum eligible loan amount
  - Clear reasons if the user is not eligible

---

## 🧠 Eligibility Logic

Eligibility is calculated using commonly accepted financial rules:

- **FOIR (Fixed Obligation to Income Ratio)** ≤ 40%
- **Age constraints**
  - Minimum age: 21
  - Maximum age at loan completion: 60
- **Loan amount constraint**
  - Maximum loan = 60 × monthly income
- **Employment type**
  - Salaried
  - Self-employed

These rules are deterministic and explainable, ensuring transparency in decision-making.

---

## 🏗️ System Architecture

Frontend (React + TypeScript)
|
| REST API
v
Backend (FastAPI)
|
| Business Logic
v
PostgreSQL (Loan Products)

yaml
Copy code

### Architecture Principles
- All financial calculations are handled on the **backend**
- Frontend acts purely as an API consumer
- Clear separation of concerns
- No business logic embedded in UI components

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide Icons

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL
- Pydantic

---

## 📂 Project Structure

arthashastra-loans/
│
├── backend/
│ ├── main.py
│ ├── database.py
│ ├── models.py
│ ├── services/
│ │ ├── emi.py
│ │ ├── comparison.py
│ │ └── eligibility.py
│
├── src/
│ ├── pages/
│ │ ├── Compare.tsx
│ │ └── Eligibility.tsx
│ ├── components/
│ └── hooks/
│
└── README.md

yaml
Copy code

---

## ⚙️ Setup Instructions

### Backend Setup

``bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
Backend runs at:

dts
Copy code
http://localhost:8000
API documentation:

bash
Copy code
http://localhost:8000/docs
Frontend Setup
bash
Copy code
npm install
npm run dev
Frontend runs at:

dts
Copy code
http://localhost:5173
🧪 API Endpoints
Compare Loans
routeros
Copy code
GET /compare?amount=500000&tenure=36
Check Eligibility
bash
Copy code
POST /eligibility
🎯 Design Highlights
Backend-first architecture

Deterministic, explainable financial logic

Strong typing between frontend and backend

Easily extensible to integrate real bank APIs in the future

👨‍💻 Author
Built to demonstrate:

Full-stack system design

Clean API architecture

Practical financial computations

User-centric problem solving
