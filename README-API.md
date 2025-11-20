# API Server Setup

This project uses a Vite frontend with an Express API server for backend routes.

## Development

### Option 1: Run both servers (Recommended)
```bash
npm run dev:all
```
This runs both the API server (port 3001) and Vite dev server (port 5173) concurrently.

### Option 2: Run separately
Terminal 1 - API server:
```bash
npm run dev:api
```

Terminal 2 - Vite dev server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

For the API server (Node.js), you can also use:
```env
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## API Endpoints

### GET /api/indicators
Fetch indicator data from Supabase.

**Query Parameters:**
- `codes` (required): Comma-separated list of indicator codes (e.g., `SPX,BTC,ETH`)
- `start` (optional): Start date in YYYY-MM-DD format (defaults to 1 year ago)
- `end` (optional): End date in YYYY-MM-DD format (defaults to today)
- `freq` (optional): Frequency - currently ignored, returns daily data

**Example:**
```
GET /api/indicators?codes=SPX,BTC&start=2023-01-01&end=2024-01-01
```

**Response:**
```json
{
  "indicators": [
    {
      "code": "SPX",
      "name": "S&P 500",
      "values": [
        {
          "timestamp": "2023-01-01",
          "value": 3800,
          "indicatorId": "uuid-here"
        }
      ]
    }
  ]
}
```

## How It Works

1. Vite dev server runs on port 5173 (or configured port)
2. Express API server runs on port 3001
3. Vite proxy forwards `/api/*` requests to the Express server
4. Frontend can call `/api/indicators` and it will be proxied automatically

## Production

For production, you'll need to:
1. Build the Vite frontend: `npm run build`
2. Run the Express server separately or deploy it to a platform like Railway, Render, or Vercel
3. Configure your frontend to point to the production API URL

