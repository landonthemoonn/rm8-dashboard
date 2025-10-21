# RM8 Dashboard

A modern, production-ready roommate dashboard application built with React, TypeScript, and Vite.

## Features

- 🤖 **AI Assistant**: Central AI assistant for managing household tasks
- 📊 **Dashboard**: Track chores, expenses, and schedules
- 🐕 **Dog Walking**: Manage pet care and walking schedules
- 📸 **Photo Gallery**: Share and view household photos
- 📅 **Shared Calendar**: Coordinate events and activities
- 💰 **Expense Tracking**: Monitor shared expenses
- 🎨 **Beautiful UI**: Glass-morphism design with animations

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible components
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## Deployment

### Vercel

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

### Netlify

\`\`\`bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
\`\`\`

Or simply connect your Git repository to Vercel or Netlify for automatic deployments.

## Environment Variables

Copy \`.env.example\` to \`.env.local\` and configure as needed:

\`\`\`env
VITE_ENABLE_AI_ASSISTANT=true
\`\`\`

## Project Structure

\`\`\`
src/
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── CentralAIAssistant.tsx
│   └── ...
├── lib/               # Utility functions
├── assets/            # Static assets
├── index.css          # Global styles
├── App.tsx            # Main app component
└── main.tsx           # Entry point
\`\`\`

## Production Features

✅ Error boundaries for graceful error handling
✅ TypeScript for type safety
✅ Optimized production builds
✅ Environment variable support
✅ Responsive design
✅ Accessibility-first components
✅ SEO-friendly
✅ Performance optimized

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first.
