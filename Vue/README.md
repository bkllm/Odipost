
# Odipost – Frontend (Vue)

This folder contains the source code for the **Odipost** user interface, built with **Vue** and **TypeScript**.  
The dashboard allows you to visualize the vehicle fleet and drivers in real time.

---

## 🚀 Tech Stack

- **Vue** (Vite)
- **TypeScript**
- **Vuetify**
- **Chart js** (data visualization)
- **Vue Leaflet** (interactive map)
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
├── views/           → Main pages: Dashboard, Vehicles, Drivers
└── main.ts          → Entry point
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

| Package               | Purpose                            |
|-----------------------|------------------------------------|
| vue                   | Core UI framework                  |
| vue-router            | Client-side routing                |
| vuetify               | Design system & UI components      |
| chart.js              | Data visualizations                |
| leaflet               | Interactive maps                   |
| @vue-leaflet          | Leaflet integration with Vue       |
| axios                 | API request management             |


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