
# Odipost – Frontend (React)

This folder contains the source code for the **Odipost** user interface, built with **React** and **TypeScript**.  
The dashboard allows you to visualize the vehicle fleet and drivers in real time.

---

## 🚀 Tech Stack

- **React** (Vite)
- **TypeScript**
- **MUI** (Material UI)
- **Recharts** (data visualization)
- **React Leaflet** (interactive map)
- **Axios** (HTTP requests)

---

## 📁 Folder Structure

```
src/
│
├── api/             → Centralized API management
├── assets/          → Icons, avatars, images
├── components/      → Reusable UI elements (modals, tables, charts...)
│   └── dashboard/   → KPI cards, Map, Alerts, Charts
│
├── models/          → Shared TypeScript types & interfaces
├── pages/           → Main pages: Dashboard, Vehicles, Drivers
├── utils/           → Utility functions
└── main.tsx         → Entry point
```

---

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start in development mode
npm run dev
```

> App available at [http://localhost:5173](http://localhost:5173)

---

## 🔗 Key Dependencies

| Package         | Purpose                      |
|----------------|-------------------------------|
| react           | Core UI framework             |
| @mui/material   | Design system & UI components |
| react-leaflet   | Interactive mapping           |
| recharts        | Data visualizations           |
| axios           | API request management        |

---

## 🌍 Environment Variables

Create a `.env` file at the root with the following variables:

```
VITE_MAPBOX_TOKEN=pk.your-mapbox-token
```

---

## 🧠 About

This dashboard was designed to provide a **clean**, **modern**, and **efficient** user experience for fleet management.  
It centralizes KPI tracking, vehicle and driver monitoring, live location mapping — all in a single, interactive interface.

---

> For backend setup or server logic, refer to the `../backend/` folder.