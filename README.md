#  FinanceFlow - Personal Finance Tracker

**FinanceFlow** is a modern, full-stack **Personal Finance Management Web Application** built to help users track income, expenses, and budgets efficiently.  
Developed using **React, Tailwind CSS, Firebase, Express.js, and MongoDB**, it provides real-time tracking, secure authentication, and a clean UI for an enhanced user experience.

---
## 🔗 Live Links

🌐 **Client:** [FinanceFlow Client Site](https://financeflow-client-site.vercel.app/)  
⚙️ **Server:** [FinanceFlow Server Site](https://financeflow-tau-eight.vercel.app/)

---

## 🔗 GitHub Links

🌐 **Client Code :** [FinanceFlow Client Site](https://github.com/amdadislam01/financeflow-client-site)  
⚙️ **Server Code :** [FinanceFlow Server Site](https://github.com/amdadislam01/financeflow-server-site)


---
## 🧠 Overview

FinanceFlow allows users to:
- Manage their income and expenses
- Visualize financial data through interactive charts
- Maintain monthly budgeting insights
- Switch between dark and light themes
- Access their data securely via Firebase authentication

---

##    Tech Stack

### 🖥️ Frontend

| Technology | Version | Description |
|-------------|----------|-------------|
| React | ^19.1.1 | Component-based frontend library |
| React DOM | ^19.1.1 | Enables rendering React components to the DOM |
| React Router | ^7.9.5 | Client-side routing for React apps |
| Tailwind CSS | ^4.1.16 | Utility-first CSS framework for styling |
| @tailwindcss/vite | ^4.1.16 | Tailwind CSS plugin for Vite integration |
| Axios | ^1.13.2 | HTTP client for making API requests |
| Firebase | ^12.5.0 | Authentication, hosting, and backend services |
| Chart.js | ^4.5.1 | JavaScript charting library for data visualization |
| React Chart.js 2 | ^5.3.1 | React wrapper for Chart.js |
| React Toastify | ^11.0.5 | Toast notification library for React |
| SweetAlert2 | ^11.26.3 | Elegant and customizable alert popups |
| SweetAlert2 React Content | ^5.1.0 | React integration for SweetAlert2 |
| React Icons | ^5.5.0 | Icon library for React UI components |

### ⚙️ Backend

| Technology | Version | Description |
|-------------|----------|-------------|
| Express | ^5.1.0 | Node.js web framework |
| MongoDB | ^6.20.0 | NoSQL database |
| Firebase Admin | ^13.6.0 | Firebase server SDK |
| CORS | ^2.8.5 | Enable cross-origin requests |
| Dotenv | ^17.2.3 | Manage environment variables |

---

## ⚙️ Features

✅ User Authentication (Firebase)  
✅ Add / Edit / Delete Transactions  
✅ Income & Expense Tracking  
✅ Interactive Charts (Pie & Bar)  
✅ Dark / Light Theme Toggle  
✅ Monthly Budget Overview  
✅ Responsive UI with TailwindCSS  
✅ Secure API with Firebase Token Verification  

---

## 📁 Folder Structure

```
financeflow-client-site/
│
├── src/
│   ├── components/       # Reusable React Components
│   ├── pages/            # All Route Pages (Dashboard, Reports, etc.)
│   ├── context/          # Auth & Theme Contexts
│   ├── assets/           # Images, icons, etc.
│   ├── App.jsx
│   └── main.jsx
│
└── server/
    ├── index.js          # Express Server Entry
    ├── routes/           # API Routes
    ├── config/           # DB & Firebase Config
    └── .env.example
```


---

## 🧩 Installation & Setup

### 🖥️ Frontend Setup
```bash
# Clone the repo
git clone https://github.com/amdadislam01/financeflow-client-site.git

# Go to client folder
cd financeflow-client-site

# Install dependencies
npm install

# Run development server
npm run dev
```

### ⚙️ Backend Setup
```bash
# Go to backend folder
cd financeflow-server

# Install dependencies
npm install

# Create a .env file and add:
PORT=5000
MONGO_URI=your_mongo_connection_string
FIREBASE_TYPE=...
# (Firebase Admin SDK credentials here)

# Run the backend
npm run start
```

---

##  Firebase Setup (Admin SDK)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project → Add Web App
3. Get config and paste it into your `.env`
4. Create a **serviceAccountKey.json** from Firebase Admin SDK
5. Add it inside your server folder or in `.env` as a JSON string
---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/addtransaction` | Fetch all user transactions |
| POST | `/addtransaction` | Add a new transaction |
| PATCH | `/addtransaction/:id` | Update an existing transaction |
| DELETE | `/addtransaction/:id` | Delete a transaction |
| GET | `/user/:id` | Get user details |

---

## 🌙 Theme Support

FinanceFlow supports **Dark and Light themes** with one-click toggle, powered by React Context and Tailwind CSS.

---

## 📧 Contact

**👤 Author:** [MD. Amdad Islam](https://github.com/amdadislam01)  
📍 Dhaka, Bangladesh  
📩 Email: amdad20063@gmail.com  
🌐 Portfolio: [portfolio](https://amdadislam.netlify.app/)

