# Mohamed Rafat - Portfolio

This is the frontend of the Mohamed Rafat portfolio application, built with modern web technologies to provide a seamless, high-performance user experience.

## 🚀 Key Features

### 1. **Modern UI/UX Design**

- **Dark Mode Support**: Full dark mode support using Tailwind CSS, with theme persistence in `localStorage`.
- **Responsive Layout**: Completely mobile-friendly design using Tailwind's utility-first grid and flexbox systems.
- **Micro-interactions**: Smooth animations and transitions powered by **Framer Motion**, including:
  - Scroll-reveal animations for all sections.
  - Hover effects on project cards and skill categories.
  - Smooth parallax-like background grid in the Hero section.

### 2. **Navigation & Routing**

- **Single Page Experience**: Smooth internal navigation using anchor links (`#home`, `#about`, etc.) with smooth-scroll behavior.
- **React Router Integration**: Structured routing for standalone pages like Login, Signup, and individual project views.
- **Sticky Header**: Smart navigation bar that remains accessible while browsing.

### 3. **Core Sections**

- **Hero**: High-impact introduction with a dynamic availability badge and animated background.
- **About Me**: Professional biography with a custom-styled portrait and direct contact CTA.
- **Projects**: Showcase of technical work with categorized tech stacks, descriptive overviews, and links to case studies.
- **My Journey**: A combined timeline of professional experience and academic background (Electrical & Computer Engineering).
- **Technical Skills**: Categorized expertise (Frontend, Backend, Tools, etc.) with intuitive icons and hover states.
- **Contact**: Clean, accessible form and direct contact details (Email, Phone, Location).

### 4. **Admin Panel & State Management**

- **Dynamic Dashboard**: Full CRUD capabilities for projects, skills, and experience.
- **React Query**: Efficient data fetching, caching, and optimistic updates.
- **Pagination**: Integrated pagination for all lists (Emails, Projects, etc.).
- **Real-time Feedback**: Loading states and animated transitions for all actions.

### 5. **Technical Excellence**

- **Vite-powered**: Extremely fast development environment and optimized production builds.
- **React 19**: Utilizing the latest React features for performance and stability.
- **Tailwind CSS 4**: Cutting-edge styling with the latest Tailwind features.
- **Iconography**: Extensive use of `react-icons/hi2` for a consistent, modern look.

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: React Icons (Heroicons 2)
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios

## 📦 Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run Development Server**:

   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `src/components/home`: Main landing page sections (Hero, About, Projects, etc.)
- `src/ui`: Reusable UI components (Header, Footer, Logo, AppLayout)
- `src/pages`: Standalone page views
- `src/assets`: Static assets like images and logos
- `src/routing`: Router configuration
