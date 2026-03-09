# How to Run the Application

## For PowerShell Execution Policy Issues

If you encounter PowerShell execution policy errors when running `npm` commands, use one of these alternatives:

### Option 1: Use the batch file (Easiest)
```cmd
dev.bat
```

### Option 2: Use the npm:cmd script
```cmd
npm run dev:cmd
```

### Option 3: Run directly with node
```cmd
node node_modules/vite/bin/vite.js
```

### Option 4: Set ExecutionPolicy temporarily (if you need npm commands)
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm run dev
```

## Important Notes

1. **Supabase Configuration**: The app uses placeholder Supabase credentials in `.env`. To enable authentication features, update these values with your actual Supabase project credentials:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

2. **Port**: The app runs on port 8080 by default, or 8081 if 8080 is in use.

## Development

- Install dependencies: `npm install` (or `node node_modules/npm/bin/npm-cli.js install` if you have policy issues)
- Start dev server: Use one of the methods above
- Build for production: `npm run build` (or use node directly)
