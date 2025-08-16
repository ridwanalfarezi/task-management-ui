# Task Management UI

A modern, responsive task management application built with Next.js, TypeScript, and Tailwind CSS. This application provides a clean interface for managing tasks with full CRUD operations, filtering, and pagination.

## Features

- ✅ **Complete CRUD Operations**: Create, read, update, and delete tasks
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🔍 **Advanced Filtering**: Filter tasks by status (To Do, In Progress, Done)
- 📄 **Pagination**: Navigate through large lists of tasks efficiently
- 🎨 **Modern UI/UX**: Clean, intuitive interface with loading states and error handling
- ⚡ **Real-time Updates**: Automatic refresh and optimistic updates
- 🛡️ **TypeScript**: Full type safety throughout the application
- 🎯 **Accessibility**: ARIA-compliant components and keyboard navigation

## Tech Stack

- **Frontend Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form
- **API Client**: Axios
- **Icons**: Lucide React
- **Deployment**: Vercel (ready)

## Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- npm or yarn package manager
- The backend API running (see backend setup instructions below)

## Backend API Setup

This frontend application requires the Task Management API to be running. Follow these steps:

1. **Navigate to the backend directory**:

   ```bash
   cd ../test-corenglish
   ```

2. **Start the backend with Docker** (recommended):

   ```bash
   # Make sure Docker is running
   docker-compose up --build -d
   ```

   Or **start manually**:

   ```bash
   # Install dependencies
   npm install

   # Set up environment variables
   cp env.example .env

   # Run database migrations
   npm run migration:run

   # Start the development server
   npm run start:dev
   ```

3. **Verify the API is running**:
   - API should be available at: http://localhost:3000
   - Swagger documentation: http://localhost:3000/api

## Frontend Setup

1. **Clone and navigate to the project**:

   ```bash
   git clone <repository-url>
   cd my-task-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your backend API URL:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3001](http://localhost:3001) (or the port shown in your terminal)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting
- `npm run type-check` - Run TypeScript compiler for type checking

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main task list page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components
│   │   ├── button.tsx
│   │   ├── modal.tsx
│   │   ├── loading.tsx
│   │   ├── error-state.tsx
│   │   └── empty-state.tsx
│   └── tasks/            # Task-specific components
│       ├── task-card.tsx
│       ├── task-form.tsx
│       ├── task-filter.tsx
│       ├── task-status-badge.tsx
│       └── pagination.tsx
├── hooks/                # Custom React hooks
│   └── use-tasks.ts      # Task management hooks
├── lib/                  # Utility functions and API client
│   └── api.ts           # Axios API client
├── providers/           # React context providers
│   └── query-provider.tsx
└── types/              # TypeScript type definitions
    └── task.ts
```

## API Integration

The application integrates with the following backend endpoints:

- `GET /tasks` - Fetch tasks with pagination and filtering
- `GET /tasks/:id` - Fetch a specific task
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update an existing task
- `DELETE /tasks/:id` - Delete a task

## State Management

This application uses **TanStack Query** for server state management, providing:

- Automatic caching and background refetching
- Optimistic updates for better UX
- Error handling and retry logic
- Loading states management

## Deployment

### Vercel (Recommended)

1. **Build the application**:

   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:

   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Deploy
   vercel
   ```

3. **Set environment variables in Vercel**:
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add `NEXT_PUBLIC_API_URL` with your production API URL

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Next.js build output
- **AWS Amplify**: Connect your Git repository
- **Docker**: Use the included Dockerfile (if created)

## Environment Variables

| Variable              | Description          | Default                 |
| --------------------- | -------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3000` |

## Features Overview

### Task Management

- Create new tasks with title and optional description
- Edit existing tasks including status updates
- Delete tasks with confirmation dialog
- View tasks in a clean card-based layout

### Filtering & Search

- Filter tasks by status: To Do, In Progress, Done
- Clear filter to view all tasks
- Real-time filter updates

### Pagination

- Navigate through large task lists
- Configurable page size (default: 10 items)
- Smart pagination controls with ellipsis

### Responsive Design

- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interactions

### Error Handling

- Graceful error states with retry options
- Loading indicators for all async operations
- Form validation with clear error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please:

1. Check the troubleshooting section below
2. Review the backend API documentation
3. Open an issue in the repository

## Troubleshooting

### Common Issues

**Frontend won't start**:

- Ensure Node.js 18+ is installed
- Check if port 3001 is available
- Verify all dependencies are installed with `npm install`

**API connection errors**:

- Verify the backend API is running on the correct port
- Check the `NEXT_PUBLIC_API_URL` environment variable
- Ensure there are no CORS issues

**Build errors**:

- Run `npm run type-check` to identify TypeScript errors
- Check for missing dependencies
- Verify all imports are correct

**Tasks not loading**:

- Check browser network tab for API call errors
- Verify the backend database is properly set up
- Check backend logs for errors
