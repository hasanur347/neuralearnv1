# NeuraLearn - Personalized Learning Platform

An AI-powered personalized learning platform for CSE students built with Next.js 14, Prisma, PostgreSQL, and NextAuth.

## 🚀 Features

- **Role-Based Authentication**: Student, Instructor, and Admin roles with NextAuth
- **Adaptive Quizzes**: Take quizzes on various CSE topics with instant feedback
- **Weak Area Analysis**: AI-powered SLM (Statistical Learning Model) identifies weak areas
- **Smart Recommendations**: RAG-based personalized learning resource recommendations
- **Real-time Analytics**: Track progress with interactive Chart.js visualizations
- **Knowledge Base**: Comprehensive learning materials with RAG retrieval

## 📋 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Neon DB)
- **Authentication**: NextAuth with Credentials Provider
- **Charts**: Chart.js, React-Chartjs-2
- **AI/ML**: Custom SLM and RAG implementations

## 🔧 Prerequisites

- Node.js 18+ and npm
- Neon DB account (free tier available)
- Git

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd neuralearn
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Neon Database

1. Go to [Neon DB](https://neon.tech) and create a free account
2. Create a new project
3. Copy your connection string (it looks like: `postgresql://user:password@host/database?sslmode=require`)

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database - Replace with your Neon DB connection string
DATABASE_URL="postgresql://neondb_owner:your_password@your-host.neon.tech/neuralearn?sslmode=require"

# NextAuth - Generate a secure random string (min 32 characters)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secure-random-secret-min-32-characters-long"

# Optional: OpenAI API Key for advanced features
OPENAI_API_KEY=""
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 5. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database with demo data
npm run prisma:seed
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👥 Demo Accounts

After seeding, you can login with these accounts:

- **Admin**: admin@demo.com / password123
- **Instructor**: instructor@demo.com / password123
- **Student**: student@demo.com / password123

## 🌐 Deployment to Vercel

### Method 1: GitHub Integration (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [Vercel](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure environment variables in Vercel dashboard:
   - `DATABASE_URL`: Your Neon DB connection string
   - `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., https://your-app.vercel.app)
   - `NEXTAUTH_SECRET`: Your secure secret key

6. Click "Deploy"

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked

# For production deployment
vercel --prod
```

### Post-Deployment Steps

1. After deployment, run database migrations on production:
```bash
# Using Vercel CLI
vercel env pull .env.production
DATABASE_URL="your-production-db-url" npx prisma migrate deploy
DATABASE_URL="your-production-db-url" npx prisma db seed
```

2. Update `NEXTAUTH_URL` in Vercel environment variables to your production URL

## 📁 Project Structure

```
neuralearn/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   └── [...nextauth]/route.ts
│   │   ├── quiz/route.ts
│   │   ├── attempt/route.ts
│   │   └── recommendations/route.ts
│   ├── components/
│   │   ├── Chart.tsx
│   │   └── Navbar.tsx
│   ├── dashboard/page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── quiz/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── slm.ts
│   └── rag.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── middleware.ts
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🔒 Security Features

- Passwords hashed with bcrypt (10 rounds)
- JWT-based session management
- Role-based access control
- Protected API routes
- Secure middleware implementation

## 🎯 Key Features Explained

### 1. SLM (Statistical Learning Model)
Analyzes quiz performance to identify:
- Weak topic areas
- Performance trends (improving/declining/stable)
- Accuracy rates per topic
- Personalized improvement suggestions

### 2. RAG (Retrieval-Augmented Generation)
- Retrieves relevant learning materials from knowledge base
- Ranks resources by relevance to weak areas
- Generates personalized study plans
- Keyword-based content matching

### 3. Dashboard Analytics
- Real-time performance tracking
- Interactive charts (Doughnut, Line, Bar)
- Score trends over time
- Comprehensive statistics

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run prisma:migrate  # Run database migrations
npm run prisma:seed     # Seed database with demo data
```

## 🔄 Database Schema

### Main Models:
- **User**: Stores user accounts with roles
- **Quiz**: Contains quiz metadata
- **Question**: Individual quiz questions
- **QuizAttempt**: Records of completed quizzes
- **KnowledgeBase**: Learning materials for RAG

## 📊 API Routes

- `POST /api/auth/register` - User registration
- `POST /api/auth/signin` - User login (via NextAuth)
- `GET /api/quiz` - List all quizzes
- `POST /api/quiz` - Create quiz (Instructor/Admin)
- `GET /api/quiz?id={id}` - Get single quiz
- `POST /api/attempt` - Submit quiz attempt
- `GET /api/attempt` - Get user's attempts
- `GET /api/recommendations` - Get personalized recommendations
- `GET /api/recommendations?type=weak-areas` - Get weak area analysis
- `GET /api/recommendations?type=study-plan` - Get study plan

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🐛 Troubleshooting

### Database Connection Issues
- Verify your Neon DB connection string in `.env`
- Ensure `?sslmode=require` is appended to the connection string
- Check if your IP is whitelisted in Neon DB settings

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma client
npx prisma generate
```

### Authentication Issues
- Verify `NEXTAUTH_SECRET` is set and at least 32 characters
- Check `NEXTAUTH_URL` matches your deployment URL
- Clear browser cookies and try again

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check existing documentation
- Review Prisma and Next.js official docs

## 🎓 Learning Resources

Built-in knowledge base covers:
- Data Structures (Arrays, Linked Lists, Stacks, Queues)
- Algorithms (Searching, Sorting, Complexity Analysis)
- Advanced topics with difficulty levels

---

**Built with ❤️ for CSE Students**
