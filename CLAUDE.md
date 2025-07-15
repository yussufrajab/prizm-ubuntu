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
- Development server available via `npm run genkit:dev`

## Module Review Summary (2025-07-13)

### Architecture Overview
- **Next.js 14** app router with TypeScript
- **PostgreSQL** database via Prisma ORM
- **Zustand** for state management with localStorage persistence
- **Google Genkit** for AI capabilities using Gemini 2.0 Flash model
- **Tailwind CSS** with Radix UI component library (shadcn/ui)

### Key Modules Reviewed

1. **Authentication System** (`src/store/auth-store.ts`)
   - Custom authentication using bcrypt for password hashing
   - Role-based access control with 9 distinct user roles
   - Persistent session storage via Zustand middleware
   - Login API endpoint at `/api/auth/login`

2. **Database Models** (`prisma/schema.prisma`)
   - **Core Models**: User, Employee, Institution
   - **Request Models**: 8 types including ConfirmationRequest, PromotionRequest, LwopRequest, CadreChangeRequest, RetirementRequest, ResignationRequest, ServiceExtensionRequest, SeparationRequest
   - **Support Models**: Complaint tracking, Notification system, EmployeeCertificate
   - All requests follow similar pattern with status, reviewStage, documents, and relationships

3. **Dashboard System** (`src/app/dashboard/page.tsx`)
   - Role-based dashboard views with real-time statistics
   - Displays pending requests across all categories
   - Recent activities tracking with status badges
   - Urgent actions module specifically for HRO/HRRP roles
   - Automatic redirection for EMPLOYEE/PO roles to profile page

4. **Navigation Structure** (`src/lib/navigation.ts`)
   - Comprehensive role-based navigation system
   - 15 main navigation items with role restrictions
   - Nested navigation for Admin Management
   - Icons from Lucide React library

5. **API Structure** (`src/app/api/`)
   - RESTful endpoints for all request types
   - Dashboard summary endpoint aggregates statistics
   - Employee search and urgent actions endpoints
   - Consistent error handling and response patterns

6. **AI Integration** (`src/ai/`)
   - **Complaint Rewriter** (`flows/complaint-rewriter.ts`): Standardizes employee complaints to meet civil service commission standards
   - Uses Google's Gemini 2.0 Flash model via Genkit
   - Server-side execution with 'use server' directive

7. **State Management & Hooks**
   - **Auth Store** (`src/store/auth-store.ts`): Zustand store with persist middleware
   - **useAuth Hook** (`src/hooks/use-auth.ts`): Provides loading state and hydration handling
   - Additional hooks for mobile detection and toast notifications

### User Roles & Permissions
- **HRO** (Human Resource Officer): Full access to HR processes
- **HHRMD** (Head of HR Management Department): Oversight and approval
- **HRMO** (Human Resource Management Officer): HR operations
- **DO** (Director Officer): Complaints and terminations
- **EMPLOYEE**: Limited access to profile and complaints
- **CSCS** (Civil Service Commission Secretary): Reports and audit trail
- **HRRP** (HR Representative): Urgent actions and tracking
- **PO** (Payroll Officer): Profile and reports access
- **Admin**: System administration, user and institution management

### Security Considerations
- Password hashing with bcryptjs
- Role-based access control at navigation and API levels
- Session persistence in localStorage (consider security implications)
- No exposed secrets in reviewed code

### Performance Optimizations
- Lazy loading with dynamic imports
- Skeleton loading states for better UX
- Parallel data fetching in dashboard
- Efficient database queries with Prisma

### Development Workflow
- TypeScript for type safety
- ESLint for code quality
- Prisma migrations for database versioning
- Separate development server for AI features
- Multiple seed scripts for different data scenarios