# Portfolio Backend - API Server

Robust Node.js & Express server powering the portfolio application.

## 🚀 Features

- **RESTful API**: Clean endpoints for managing all portfolio data.
- **Authentication**: Secure JWT-based auth with HTTP-only cookies.
- **Security Suite**:
  - `helmet` for security headers.
  - `express-rate-limit` to prevent brute force.
  - `express-mongo-sanitize` against NoSQL injection.
  - `hpp` to prevent HTTP parameter pollution.
- **File Management**: Integrated with Cloudinary for optimized image storage.
- **Email System**: Automated notifications via Nodemailer.

## 🛠️ Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB & Mongoose
- **Validation**: Zod & Express Validator
- **Security**: JWT, BcryptJS, Helmet

## 📂 Project Structure

- `src/controllers`: Request handlers and business logic.
- `src/models`: Mongoose schemas and data modeling.
- `src/routes`: API endpoint definitions.
- `src/middleware`: Auth, error handling, and security middlewares.
- `src/utils`: Helper functions (Email, Cloudinary, etc.).

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_HOST=your_smtp_host
EMAIL_PORT=your_smtp_port
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

## 📦 Scripts

- `npm start`: Run production server.
- `npm run server`: Run development server with Nodemon.
- `npm run dev`: Run both client and server concurrently.
