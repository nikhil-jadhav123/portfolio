# 🚀 Deployment Guide - Nikhil's Premium Portfolio

## Quick Deploy Links
- **Frontend (Vercel):** [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/portfolio)
- **Backend (Railway):** [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

---

## Step 1: Setup GitHub Repository

### 1.1 Create GitHub Repository
```bash
# Go to GitHub.com and create a new repository named "portfolio"
# Make it public for free deployments
```

### 1.2 Upload Your Code
```bash
# In your project folder, run:
git init
git add .
git commit -m "Initial commit - Premium Portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

---

## Step 2: Setup MongoDB Atlas (Database)

### 2.1 Create Free Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for free account
3. Create a new project: "Portfolio"

### 2.2 Create Database Cluster
1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select region closest to you
4. Name cluster: "portfolio-cluster"

### 2.3 Setup Database User
1. Go to "Database Access"
2. Add new user:
   - Username: `portfolio_user`
   - Password: `generate strong password`
   - Role: `Read and write to any database`

### 2.4 Setup Network Access
1. Go to "Network Access"
2. Add IP Address: `0.0.0.0/0` (Allow from anywhere)

### 2.5 Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy connection string (looks like):
   ```
   mongodb+srv://portfolio_user:<password>@portfolio-cluster.xxxxx.mongodb.net/
   ```

---

## Step 3: Deploy Backend (Railway)

### 3.1 Deploy to Railway
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your portfolio repository
5. Choose "backend" folder as root

### 3.2 Add Environment Variables
In Railway dashboard, go to Variables and add:
```env
MONGO_URL=mongodb+srv://portfolio_user:yourpassword@portfolio-cluster.xxxxx.mongodb.net/portfolio
SENDINBLUE_API_KEY=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
ADMIN_EMAIL=jadhavnikhil088@gmail.com
JWT_SECRET=your-super-secure-jwt-secret-key-for-production
ADMIN_PASSWORD=your-secure-admin-password-123
DB_NAME=portfolio
```

### 3.3 Get Backend URL
- Railway will provide URL like: `https://your-backend-xxxxx.railway.app`
- Copy this URL for frontend setup

---

## Step 4: Deploy Frontend (Vercel)

### 4.1 Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework**: React
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 4.2 Add Environment Variables
In Vercel dashboard, go to Settings → Environment Variables:
```env
REACT_APP_BACKEND_URL=https://your-backend-xxxxx.railway.app
```

### 4.3 Deploy
- Click "Deploy"
- Vercel will give you URL like: `https://portfolio-xxxxx.vercel.app`

---

## Step 5: Test Your Live Website

### 5.1 Test Features
- ✅ Website loads correctly
- ✅ All sections display properly
- ✅ Contact form works
- ✅ Admin dashboard accessible at `/admin`
- ✅ Animations and effects work

### 5.2 Test Admin Dashboard
- Go to `https://your-site.vercel.app/admin`
- Login with your admin password
- Check contact messages and analytics

---

## Step 6: Custom Domain (Optional)

### 6.1 Buy Domain
- Go to [Namecheap](https://namecheap.com) or [GoDaddy](https://godaddy.com)
- Buy domain like: `nikhiljadhav.com` (~$10/year)

### 6.2 Connect to Vercel
1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Update DNS settings as instructed

---

## 🎉 Congratulations!

Your premium portfolio is now live at:
- **Main Site:** `https://your-site.vercel.app`
- **Admin Panel:** `https://your-site.vercel.app/admin`
- **API:** `https://your-backend.railway.app`

---

## 📞 Need Help?

If you encounter any issues:
1. Check the deployment logs in Vercel/Railway
2. Verify environment variables are set correctly
3. Ensure MongoDB connection string is correct
4. Contact me for support!

**Happy Deploying! 🚀**