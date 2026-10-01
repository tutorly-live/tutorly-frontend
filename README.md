# tutorly-frontend

Official responsive web landing page and portal for **Tutorly** — matching guardians with verified tutors.

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Phosphor Icons (`@phosphor-icons/react`)
- **Server / Container**: Multi-stage Docker + Nginx Alpine

## 🚀 Getting Started

### Local Development
```bash
# Install dependencies
pnpm install # or npm install

# Start Vite dev server
pnpm dev # or npm run dev
```

### Production Build
```bash
pnpm build # or npm run build
```

## 🐳 Docker Deployment

Build and run using Docker:
```bash
docker build -t tutorly-frontend .
docker run -d -p 80:80 tutorly-frontend
```
