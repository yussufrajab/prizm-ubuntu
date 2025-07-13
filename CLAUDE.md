# CLAUDE.md - Project Overview

## Project Information
This is a Next.js application for HR management system built with TypeScript, Prisma, and Firebase/Genkit for AI capabilities.

## Tech Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL via Prisma ORM
- **Styling**: Tailwind CSS with custom UI components
- **Authentication**: Custom auth with bcrypt
- **AI Integration**: Google Genkit with Firebase
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation

## Project Structure
```
studio/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── api/               # API routes
│   │   └── dashboard/         # Dashboard pages
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   ├── icons/             # Icon components
│   │   ├── layout/            # Layout components
│   │   ├── shared/            # Shared components
│   │   └── ui/                # UI component library (shadcn/ui)
│   ├── ai/                    # AI/Genkit functionality
│   │   ├── flows/             # AI workflow definitions
│   │   └── genkit.ts          # Genkit configuration
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions and constants
│   └── store/                 # Zustand store definitions
├── prisma/                    # Database schema and migrations
└── docs/                      # Documentation
```

## Key Features
- Employee management system
- Multiple request types (confirmation, promotion, leave, resignation, etc.)
- Complaint handling system
- Role-based access control
- Institution/ministry management
- Notification system
- AI-powered request analysis and complaint rewriting

## Development Commands
```bash
# Development server (port 9002)
npm run dev

# AI development with Genkit
npm run genkit:dev
npm run genkit:watch

# Build for production
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint

# Database
npx prisma migrate dev
npx prisma generate
npx prisma db seed
```

## Environment Variables
The project requires a DATABASE_URL environment variable for PostgreSQL connection.

## API Structure
The API routes follow RESTful patterns:
- `/api/auth/*` - Authentication endpoints
- `/api/employees/*` - Employee management
- `/api/complaints/*` - Complaint handling
- `/api/[request-type]/*` - Various request types (promotion, resignation, etc.)
- `/api/dashboard/*` - Dashboard data endpoints

## Database Models
Main models include:
- User - System users with roles
- Employee - Employee records
- Institution - Government ministries/institutions
- Various request models (ConfirmationRequest, PromotionRequest, etc.)
- Complaint - Complaint tracking
- Notification - User notifications

## UI Components
The project uses a comprehensive UI component library based on Radix UI primitives with Tailwind CSS styling. Components are located in `src/components/ui/`.

## AI Integration
The project includes AI capabilities through Google Genkit:
- Complaint rewriting functionality
- Request analysis
- Development server available via `npm run genkit:dev`