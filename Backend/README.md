# 🚚 Odipost Backend API

This is the core of the Odipost system: it manages drivers, vehicles, and GPS tracking.

---

## 🛠 Technologies

- ASP.NET Core 8
- Entity Framework Core
- SQL Server (Express)
- Swagger (for development only)

---

## 🔧 Configuration

Database settings are stored in:

```json
appsettings.Development.json
appsettings.Production.json
```

💡 In production, the API uses `appsettings.Production.json`

---

## 🧪 Run Locally

```bash
dotnet run
```

Accessible at: `http://localhost:5257` (or defined in `launchSettings.json`)

---

## 🌐 API Endpoints (Examples)

- `GET /api/vehicles`
- `GET /api/drivers`
- `GET /api/incidents`
- `GET /kpi/stats`

📚 Swagger UI available at `/swagger` (in dev or forced in prod)

---

## 🔁 Seeding (initial data)

The `DbSeeder` runs on startup inside `Program.cs`.  
It populates the database with:

- 3500 drivers
- 2000 vehicles
- 5000 incidents

---

## 🧱 EF Core Migrations

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

## 📂 Key Folders

- `Controllers/` — REST API endpoints
- `Models/` — EF Core entities
- `Data/` — DbContext + Seeder