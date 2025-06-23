# Planet Holiday Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the `server/` directory with the following content:
   ```env
   MONGO_URI=mongodb://localhost:27017/planet_holiday
   JWT_SECRET=supersecretkey
   PORT=5000
   ```
3. Start MongoDB locally (or update `MONGO_URI` for your setup).
4. Start the server:
   ```bash
   node server.js
   ```

## Endpoints

- `POST /api/admin/login` — Admin login
- `GET/POST/PUT/DELETE /api/tours` — Manage tours
- `GET/POST/PUT/DELETE /api/blogs` — Manage blogs
- `GET/POST/PUT/DELETE /api/destinations` — Manage destinations

All POST/PUT/DELETE endpoints require a Bearer JWT token in the `Authorization` header.
