# Authentication System - For GDGC Recruitment 2025

This is an authentication system built for the **GDGC Recruitment Drive 2025, NIT Silchar**. It handles user registration, login, password reset, and authentication workflows efficiently, and can be integrated into larger projects with ease.

## By Mrinmoy Mazumdar (2415006)
---

## 🚀 **Features**

- User Registration
- User Login
- Password Reset via Email (Nodemailer) and gmail
- **Protect Middleware Function** to secure routes in larger projects
- Secure authentication routes

---

## 🛠️ **Tech Stack**

- **Frontend:** Html and TailwindCSS
- **Backend Framework:** Express.js
- **Database:** Neon PostgreSQL
- **ORM:** Prisma
- **Email Service:** Nodemailer
- **Client:** HTML files served statically from the `client` folder

---

## ⚙️ **Step-by-Step Installation**

### 1. **Clone the repository**

```bash
git clone https://github.com/username/repo.git
```

### 2. **Navigate to the project folder**

```bash
cd repo
```

### 3. **Install root dependencies**

```bash
npm install
```

### 4. **Navigate to the server folder**

```bash
cd server
```

### 5. ** Install server dependencies**

```bash
npm install
```

### 6. **Add a .env file here (in server folder) and add these**

```bash
GMAIL_PASS=<your 16 letter_app password of google>
MAIL_SECRET=yoursecret
EMAIL=<your GMAIL address>
SECRET=<your jwt secret>
POSTGRE_SQL=<your neon postgresql connection string>
Bring this connecting string by creating an account at the neon postgresql cloud service

NODE_ENV=Development
PORT=4000
```

### 6. **npx prisma db push**

```bash
npx prisma db push
```

### 7. **Run server in dev mode**

```bash
npm run dev
```