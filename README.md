Authentication & Authorization System

A full-stack authentication and authorization system built with Next.js, React, MongoDB, JWT, and bcryptjs. The project provides secure user authentication, email verification, protected routes, and password management.

🚀 Features
User registration
Secure password hashing using bcryptjs
Password strength validation
Minimum 8 characters
Uppercase letter
Lowercase letter
Number
Special character
User login and logout
JWT-based authentication
HTTP-only authentication cookies
Email verification using Nodemailer
Protected routes
User profile
Forgot password functionality
Password reset using time-limited tokens
Toast notifications for success and error messages
MongoDB database integration using Mongoose
Responsive user interface
🛠️ Tech Stack
Frontend
Next.js
React
Tailwind CSS
Axios
React Hot Toast
Backend
Next.js API Routes
Node.js
MongoDB
Mongoose
JWT
bcryptjs
Nodemailer
📁 Project Structure
src/
├── app/
│   ├── login/
│   ├── signup/
│   ├── profile/
│   ├── verifyemail/
│   └── api/
│       └── users/
│           ├── signup/
│           ├── login/
│           ├── logout/
│           ├── me/
│           ├── verifyemail/
│           └── ...
│
├── dbConfig/
│   └── dbConfig.ts
│
├── helpers/
│   └── mailer.ts
│
├── models/
│   └── usermodel.ts
│
└── middleware.ts
🔐 Authentication Flow
Signup
User enters username, email and password
                ↓
        Validate password
                ↓
        Check existing user
                ↓
       Hash password using bcrypt
                ↓
          Save user to MongoDB
                ↓
        Generate verification token
                ↓
          Send verification email
Login
User enters email and password
                ↓
       Find user in MongoDB
                ↓
       Compare password with bcrypt
                ↓
          Generate JWT token
                ↓
       Store token in HTTP-only cookie
                ↓
          Access protected pages
Email Verification
User clicks verification link
                ↓
       Verification token received
                ↓
       Check token and expiry
                ↓
        Mark user as verified
                ↓
       Remove verification token
🔑 Environment Variables

Create a .env.local file in the project root:

MONGO_URI=your_mongodb_connection_string

TOKEN_SECRET=your_jwt_secret

MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password

MAIL_FROM=your_email
DOMAIN=http://localhost:3000

Never commit .env.local or expose your database credentials, JWT secret, or SMTP credentials on GitHub.

⚙️ Installation

Clone the repository:

git clone <your-github-repository-url>

Navigate to the project:

cd authentication-authorization

Install dependencies:

npm install

Create .env.local and add the required environment variables.

Start the development server:

npm run dev

Open:

http://localhost:3000
📌 API Endpoints
Method	Endpoint	Purpose
POST	/api/users/signup	Register a new user
POST	/api/users/login	Login user
GET	/api/users/logout	Logout user
GET	/api/users/me	Get logged-in user
POST	/api/users/verifyemail	Verify email
POST	/api/users/forgotpassword	Request password reset
POST	/api/users/resetpassword	Reset password
🔒 Security

The project demonstrates several common authentication security practices:

Passwords are never stored as plain text.
Passwords are hashed using bcryptjs.
JWT authentication is used for maintaining sessions.
Authentication tokens are stored in HTTP-only cookies.
Verification and password-reset tokens have an expiry time.
Protected routes require authentication.
Password strength is validated before account creation.
🎯 Learning Objectives

This project was built to understand and implement:

Authentication vs Authorization
JWT authentication
Password hashing
Cookies and sessions
Protected routes
MongoDB and Mongoose
REST API development
Email verification
Password reset flows
Middleware-based route protection
Frontend and backend integration
📸 Screenshots

Add screenshots of the following pages here:

Signup
Login
Email Verification
Profile
Password Reset

🚧 Future Improvements
Role-based authorization for admin users
Refresh token mechanism
Rate limiting
Account lockout after repeated failed login attempts
OAuth authentication
Improved password strength indicator
Production email service
👨‍💻 Author

H. Ganapathi Kamath

Built as a full-stack authentication and authorization project to strengthen backend, security, and MERN/Next.js development skills.


For GitHub, I recommend **not adding the actual Mailtrap username/password or MongoDB credentials** to the README. Keep only the variable names and use `.env.local`.