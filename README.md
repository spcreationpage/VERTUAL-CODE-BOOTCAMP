# Virtual MERN Stack Coding Bootcamp (Frontend)

A Vite + React + TypeScript frontend for an interactive MERN bootcamp. Includes a module browser and a lightweight in-browser coding playground.

## Tech Stack
- Vite 5, React 18, TypeScript 5
- Tailwind CSS 3
- Icons: lucide-react

## Requirements
- Node.js 18+ and npm 9+

## Setup
1) Install dependencies
```bash
npm ci
```

2) Environment variables (optional)
```bash
PORT=8000
DATABASE_URL=mongodb://127.0.0.1:27017/boot
JWT_SECRET=secret
```
Note: If you previously used JSWT_SECRET, correct it to JWT_SECRET.

3) Start dev server
```bash
npm run dev
```
Open http://localhost:8000

4) Build & Preview
```bash
npm run build
npm run preview
```

## Scripts
- npm run dev — start Vite dev server (port 8000)
- npm run build — production build to dist/
- npm run preview — preview the production build
- npm run lint — run ESLint

## Structure
```
project/
  index.html
  vite.config.ts        # server.port = 8000
  src/
    main.tsx
    App.tsx             # UI + coding playground
    index.css
```

## Features
- Module list with progress
- Interactive area:
  - Start Coding: simple editor + output
  - View Examples: quick snippets you can load

## Troubleshooting
- Connection refused:
  - Run inside project dir: cd project && npm run dev
  - Try http://127.0.0.1:8000
  - Check firewall/proxy/VPN
- Port in use: change port in vite.config.ts
- Browserslist warning: run `npx update-browserslist-db@latest`

## Version Control
Already initialized and pushed. Typical flow:
```bash
git add .
git commit -m "chore: update"
git push
```

## License
MIT
