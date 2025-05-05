# Notes App Frontend (Fetch API Version)

## Prerequisites
- Node.js 18+ and npm
- Vue 3 knowledge
- TypeScript basics

## Setup Instructions

1. Create a new Vue project:
```bash
npm create vue@latest notes-app-frontend
cd notes-app-frontend
```

2. Select the following options:
- TypeScript: Yes
- Vue Router: Yes
- Pinia: Yes
- Unit Testing: Optional
- ESLint: Yes

3. Install dependencies:
```bash
npm install
npm install @heroicons/vue
npm install js-cookie
npm install @types/js-cookie -D
```

4. Install and configure Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

5. Update environment variables:
Create `.env` file in the root:
```
VITE_API_URL=http://localhost:5000
```

6. Run the development server:
```bash
npm run dev
```

## Project Structure
- `components/` - Reusable Vue components
- `views/` - Page components
- `router/` - Vue Router configuration
- `store/` - Pinia state management
- `services/` - API service layer using Fetch API
- `types/` - TypeScript interfaces
- `utils/` - Utility functions

## Features
- User authentication (login/register)
- CRUD operations for notes
- Search and filter functionality
- Responsive design
- Type-safe with TypeScript

## API Integration
The app uses the native Fetch API for HTTP requests to the backend API. All API calls are handled through service classes in the `services/` directory.