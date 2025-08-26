# RAN Mixology - Coffee & Bar Website

A modern, responsive website for RAN Mixology coffee and bar chain built with React and TypeScript.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```sh
# Clone the repository
git clone https://github.com/lyhoanghaiceobmcgroup/ranmixology.git

# Navigate to the project directory
cd ranmixology

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Development

The development server will start at `http://localhost:8080/`

### Building for Production

```sh
# Build the project
npm run build

# Preview the build
npm run preview
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## 🌐 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```sh
npm install -g vercel
```

2. Login to Vercel:
```sh
vercel login
```

3. Deploy:
```sh
vercel --prod
```

### Deploy to Netlify

1. Build the project:
```sh
npm run build
```

2. Deploy the `dist` folder to Netlify

## 🔧 Configuration

The project uses environment variables for configuration. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_TELEGRAM_BOT_TOKEN=your_telegram_bot_token
VITE_TELEGRAM_CHAT_ID=your_telegram_chat_id
```
