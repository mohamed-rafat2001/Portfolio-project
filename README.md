# Mohamed Rafat - Full Stack Portfolio

This is a comprehensive full-stack portfolio application designed to showcase professional experience, projects, and technical skills. It features a modern frontend and a robust backend with an integrated admin panel.

## 🌟 Project Overview

- **Live Frontend**: Responsive React-based landing page.
- **Admin Dashboard**: Secure management system for emails, projects, skills, and more.
- **Cloud Integration**: Image storage via Cloudinary and email notifications via Nodemailer.
- **Security**: JWT authentication, rate limiting, and security headers.

## 🏗️ Architecture

The project is divided into two main parts:
- **[Client](./client)**: React 19 frontend with Tailwind CSS 4 and Framer Motion.
- **[Server](./server)**: Node.js/Express backend with MongoDB/Mongoose.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Cloudinary Account (for image uploads)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Portfolio-project
   ```

2. **Setup Server**:
   ```bash
   cd server
   npm install
   # Create a .env file based on the environment variables needed
   npm run dev
   ```

3. **Setup Client**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion, React Query.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT.
- **Services**: Cloudinary (Storage), Nodemailer (Email).

---
Built with ❤️ by Mohamed Rafat.
