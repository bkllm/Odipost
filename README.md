# 📍 Odipost — Fleet & Logistics Dashboard

Odipost is a fleet and logistics management application composed of three main parts:

- 🧠 Backend (ASP.NET Core + EF Core + SQL Server)
- 🖥️ Frontend React (TypeScript)
- 🖥️ Frontend Vue (TypeScript)

---

🎓 This project was developed as part of my final year thesis at Odisee Hogeschool (Brussels),
for the academic year 2024–2025. 

👨‍💻 Author: Ayoub Bakalem  
🌐 Live demo: https://odipost.ayoubbakalem.be

---

## 📁 Project Structure

```
Odipost/
├── Backend/       # ASP.NET Core API
├── React/         # React Frontend
├── Vue/           # Vue Frontend
```

---

## 🚀 Local Development

### Backend

```bash
cd Backend
dotnet run
```

### React Frontend

```bash
cd React
npm install
npm run dev
```

### Vue Frontend

```bash
cd Vue
npm install
npm run dev
```

---

## 🔐 Production Deployment

The entire stack is deployed on a single VPS (Ubuntu 22.04) using:

- **ASP.NET Core backend** running via `systemd`
- **SQL Server Express** instance for data
- **React & Vue frontends** built and served statically via **NGINX**

---

## 📦 Tech Stack

- ASP.NET Core 8 + Entity Framework Core
- SQL Server 2022 Express
- React + Vite
- Vue 3 + Vite
- Nginx (reverse proxy + static)
- Systemd (Linux service manager)