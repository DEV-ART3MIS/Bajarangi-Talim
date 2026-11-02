# 🔥 Bajarangi Talim — Full-Stack Athletic Gym & Akhada Web Application

**Bajarangi Talim** is a modern, responsive full-stack web application designed for a premier fitness gym blending authentic Indian Akhada wrestling heritage with state-of-the-art sports science and strength training.

Built with **Node.js**, **Express.js**, **React (Vite)**, **Tailwind CSS**, and **MongoDB Atlas**.

---

## 🌟 Key Features

### 1. 🏛️ Modern Dark Theme & Athletic Aesthetic
- High-energy dark mode (`#0b0d12`) with glowing amber/orange accents (`#ff5722`, `#ff9800`) symbolizing discipline and raw strength.
- Responsive layout with desktop sticky navigation and mobile drawer menu.
- Dynamic visual feedback, cards, and micro-animations.

### 2. 🏋️ Extensive Exercise & Form Library
- Curated database of **17+ compound, isolation, and traditional movements**:
  - **Akhada Heritage**: *Bajarangi Gada (Mace) Swing, Surya Dand (Hindu Push-Up), Pehlwan Bethak (Hindu Squat), Samtola Clean & Press*.
  - **Modern Strength & Hypertrophy**: Flat Barbell Bench Press, Incline Dumbbell Press, Cable Flyes, Conventional Deadlift, Romanian Deadlift (RDL), Olympic Back Squat, Overhead Military Press, EZ-Bar Curls.
  - **Calisthenics & Bodyweight**: Tactical Pull-ups, Parallel Bar Dips, Hanging Leg Raises.
  - **Functional & Conditioning**: Battle Rope Slams.
- Real-time search by workout name, target muscle, or equipment.
- Filter chips by category (*Akhada Heritage*, *Strength & Hypertrophy*, *Calisthenics*, *Functional*), muscle groups, and difficulty level (*Beginner*, *Intermediate*, *Advanced*).
- **Movement Guide Modal**: Animated form visuals, step-by-step cues, target muscle anatomy, coaching tips, common mistakes, and video breakdown embed.

### 3. ⚖️ Interactive BMI & Metabolic Calculator Tool
- Unit toggle: **Metric** (cm / kg) and **Imperial** (ft/in / lbs).
- Interactive sliders and numeric inputs for height, weight, and age.
- Biological gender and training activity selector (Sedentary, Gym 3-4x/week, Pehlwan/Athlete).
- Instant calculations:
  - Exact BMI score with color-coded gauge bar and position marker (*Underweight*, *Normal*, *Overweight*, *Obese*).
  - Healthy target weight range for the user's height.
  - Estimated daily maintenance calories.
  - Target daily hydration (liters of water).
  - **Tailored Membership Plan Recommendation** with direct one-click enrollment.

### 4. 💳 Membership Plans & Pricing
- Annual vs. Monthly billing toggle with a **20% Annual Savings** badge.
- 3 Curated Tiers:
  - **Akhada Starter**: ₹1,499/mo (₹14,390/yr) — Open gym floor, Sunday Akhada pit, digital turnstile pass.
  - **Warrior Pro** *(Most Popular)*: ₹2,499/mo (₹23,990/yr) — Starter + Olympic platforms, Gada classes, Steam room, Biometrics.
  - **Bajarangi Elite**: ₹4,499/mo (₹42,990/yr) — Warrior Pro + Weekly 1-on-1 coaching, nutrition blueprint, ice plunge, guest passes, free gym kit.
- Direct enrollment & instant plan upgrade flow.

### 5. 👥 Trainers & Coaches Showcase
- Roster of 6 elite coaches (Head Pehlwan Vikram Shinde, Olympic Weightlifter Ananya Roy, Calisthenics Master Devraj Rathore, etc.).
- Specializations, accreditations, years of experience, and philosophy quotes.
- Interactive modal to schedule a **1-on-1 Consultation / Fitness Assessment**.

### 6. 📱 Member Portal & Admin Management Hub
- **Digital Member Turnstile Pass**: High-resolution digital badge with QR code, Member ID (`BT-TALIM-XXXXXX`), active tier status, validity dates, and print option.
- **Admin Management Console**:
  - Live business metrics (Total Members, Active Status, Inquiries, Database Connection).
  - Member Directory Table: Search, filter by status, and toggle member status between `Active`, `Pending`, and `Expired` with instant persistence.
  - Contact Inquiries Inbox: View messages submitted by visitors.

### 7. 📬 Contact & Trial Request Form
- Visitor inquiries stored in database via `/api/contact`.
- Complete gym details: Address in Pune, operating hours (Mon-Sat 5 AM - 12 PM & 4 PM - 10:30 PM, Sun 6 AM - 1 PM), phone numbers, and interactive location card.

---

## 🛠️ Architecture & Tech Stack

```
bajarangi-talim/
├── server/
│   ├── config/
│   │   └── db.js               # MongoDB Atlas connection with local fallback
│   ├── models/
│   │   ├── Member.js           # Mongoose Member Schema
│   │   └── Contact.js          # Mongoose Contact Schema
│   ├── controllers/
│   │   ├── authController.js   # JWT Auth (register, login, me)
│   │   ├── memberController.js # Member list, status, plan updates, stats
│   │   ├── contactController.js# Inquiries handling
│   │   └── exerciseController.js# Workout library and filter queries
│   ├── routes/                 # Express API Routes
│   ├── data/
│   │   └── exercisesData.js    # Curated exercises database
│   ├── middleware/
│   │   └── auth.js             # JWT bearer verification middleware
│   ├── utils/
│   │   └── store.js            # Unified data access (Atlas & In-Memory fallback)
│   └── server.js               # Main Express entry point & static file server
├── client/
│   ├── src/
│   │   ├── components/         # Navbar, Footer, BMICalculator, Modals
│   │   ├── pages/              # Home, About, Trainers, Pricing, Exercises, Contact, Dashboard
│   │   ├── context/            # AuthContext (React state & localStorage)
│   │   ├── services/           # Frontend API client
│   │   ├── index.css           # Tailwind CSS v4 & custom athletic dark styling
│   │   └── App.jsx             # Root layout & page switcher
│   ├── index.html
│   └── vite.config.js
├── .env.example
├── .env
├── package.json
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ installed on your system.

### 2. Configure MongoDB Atlas (Optional but Recommended)
Open the `.env` file in the project root and add your MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/bajarangi_talim?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=bajarangi_talim_super_secret_jwt_key_2026
```

> **Note:** If `MONGODB_URI` is left blank, the application automatically runs in **high-performance local persistent store mode** with pre-seeded demo accounts, allowing you to test all features instantly with zero database setup! Once you add your MongoDB Atlas URI, it automatically connects to Atlas.

### 3. Run the Full Application (Single Command)
From the project root:

```bash
# Start backend server (serves both API & built React frontend)
npm start
```
The application will be live at **http://localhost:5000**!

### 4. Running in Development Mode (Live Hot Reload)
To run frontend and backend simultaneously in development:

**Terminal 1 (Backend Server):**
```bash
npm run server
```

**Terminal 2 (React Vite Dev Server):**
```bash
npm run client
```
The Vite development server will open at **http://localhost:3000** with hot module replacement (HMR), automatically proxying `/api` requests to the Express server on port 5000.

---

## 🔑 Demo Accounts for Instant Testing

| Role | Email | Password | Preloaded Plan |
| :--- | :--- | :--- | :--- |
| **Head Coach / Admin** | `vikram@bajarangitalim.com` | `bajarangi123` | Bajarangi Elite (Full Admin Hub) |
| **Enrolled Member** | `aarav@example.com` | `bajarangi123` | Warrior Pro (Member Pass & Portal) |

*(You can also use the one-click **"Demo Member"** or **"Coach Admin"** buttons directly inside the Sign In modal!)*

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/health` | Service health & Atlas status | No |
| `POST` | `/api/auth/register` | Register new member with plan | No |
| `POST` | `/api/auth/login` | Authenticate member / admin | No |
| `GET` | `/api/auth/me` | Fetch logged-in user profile | Bearer Token |
| `GET` | `/api/members` | Get all members directory | No (Admin/Staff) |
| `PUT` | `/api/members/:id/status`| Update status (`Active`, `Pending`, `Expired`) | Yes |
| `PUT` | `/api/members/:id/plan` | Upgrade/switch membership plan | Yes |
| `GET` | `/api/members/stats` | Gym overview metrics | No |
| `GET` | `/api/exercises` | Exercise library (query, muscle, category, difficulty) | No |
| `GET` | `/api/exercises/:id` | Single exercise details & steps | No |
| `POST` | `/api/contact` | Submit inquiry / free trial request | No |
| `GET` | `/api/contact` | List all inquiries | Yes |

