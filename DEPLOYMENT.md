# Deploying Bible Chat to Vercel

This guide will walk you through deploying your Bible Chat application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Git repository with your code (already done!)
3. Firebase project configured
4. OpenAI API key
5. Bible API key (optional)

## Step-by-Step Deployment

### 1. Install Vercel CLI (Optional)

You can deploy via the Vercel dashboard or CLI. For CLI:

```bash
npm install -g vercel
```

### 2. Configure Environment Variables

Before deploying, you need to set up environment variables in Vercel.

**Required Environment Variables:**

#### For the API (Serverless Functions):
- `OPENAI_API_KEY` - Your OpenAI API key
- `BIBLE_API_KEY` - Your Bible API key (optional)

#### For the Frontend:
- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase Auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID

### 3. Deploy via Vercel Dashboard (Recommended for First Time)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"

2. **Import Your Repository**
   - Click "Import Git Repository"
   - Select your GitHub account and repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset:** Vite
   - **Root Directory:** Leave as `./` (root)
   - **Build Command:** `npm run vercel-build` (auto-detected)
   - **Output Directory:** `frontend/dist` (auto-detected)
   - **Install Command:** Leave default

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add all the variables listed above
   - Make sure to add them for Production, Preview, and Development environments

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)
   - You'll get a URL like `https://your-app.vercel.app`

### 4. Deploy via Vercel CLI

If you prefer using the command line:

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

During the first deployment, you'll be asked:

```
? Set up and deploy "~/zion_repo"? [Y/n] y
? Which scope do you want to deploy to? Your Name
? Link to existing project? [y/N] n
? What's your project's name? bible-chat
? In which directory is your code located? ./
```

Then add environment variables:

```bash
# Add API environment variables
vercel env add OPENAI_API_KEY
vercel env add BIBLE_API_KEY

# Add Firebase environment variables
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
```

After adding variables, redeploy:

```bash
vercel --prod
```

### 5. Configure Firebase for Production

Important: Add your Vercel deployment URL to Firebase authorized domains:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Click **Add domain**
5. Add your Vercel URL: `your-app.vercel.app`

### 6. Test Your Deployment

1. Visit your Vercel URL
2. Try signing up with a new account
3. Sign in and test the chat functionality
4. Ask a question and verify you get responses with Bible verses

## Project Structure for Vercel

```
zion_repo/
├── api/                    # Serverless functions
│   ├── chat.js            # Main chat endpoint
│   └── health.js          # Health check endpoint
├── frontend/              # React app
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── vercel.json           # Vercel configuration
├── package.json          # Root package.json for API dependencies
└── .vercelignore         # Files to ignore during deployment
```

## How It Works

### Serverless Functions
- All files in the `/api` directory become serverless API endpoints
- `/api/chat.js` → `https://your-app.vercel.app/api/chat`
- `/api/health.js` → `https://your-app.vercel.app/api/health`

### Frontend
- Built with Vite and served as static files
- Environment variables prefixed with `VITE_` are embedded at build time
- Routes to `/api/*` are handled by serverless functions
- All other routes serve the React app

## Continuous Deployment

Once set up, Vercel automatically:
- **Deploys on push to main branch** → Production
- **Deploys on pull requests** → Preview deployments
- **Provides unique URLs** for each preview deployment

## Monitoring and Logs

1. **View Logs:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on a deployment → View Function Logs
   - Or use CLI: `vercel logs`

2. **Check Build Status:**
   - Dashboard shows build status for each deployment
   - Email notifications for failed builds

## Troubleshooting

### Build Failures

**Error: Module not found**
```bash
# Make sure all dependencies are in package.json
cd frontend && npm install
cd .. && npm install
git add package.json frontend/package.json
git commit -m "Update dependencies"
git push
```

**Error: Environment variable not defined**
- Check that all environment variables are set in Vercel dashboard
- Redeploy after adding variables

### Runtime Errors

**Firebase Auth Error: Unauthorized domain**
- Add your Vercel URL to Firebase authorized domains (see step 5 above)

**OpenAI API Error**
- Verify your API key is correct in Vercel environment variables
- Check your OpenAI account has available credits
- View function logs in Vercel dashboard

**Bible API not working**
- The app will work without Bible API (uses sample verses)
- If you want Bible API, verify the key is set correctly

### Function Timeout

Vercel free tier has a 10-second timeout for serverless functions. If you experience timeouts:
- Reduce `max_tokens` in the OpenAI API call
- Consider upgrading Vercel plan for longer timeouts

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Add custom domain to Firebase authorized domains

## Cost Considerations

### Vercel
- **Hobby (Free):** 100GB bandwidth, 6000 build minutes/month
- **Pro ($20/month):** 1TB bandwidth, unlimited builds

### Firebase
- **Spark (Free):** 10K authentications/month
- **Blaze (Pay as you go):** $0.06 per verification

### OpenAI
- **GPT-3.5-turbo:** ~$0.002 per 1K tokens
- Estimate: ~$0.01-0.02 per conversation

### Bible API
- **Free tier:** 500 requests/day
- More than enough for most use cases

## Support

If you encounter issues:
1. Check Vercel function logs
2. Check browser console for frontend errors
3. Verify all environment variables are set
4. Test the `/api/health` endpoint

## Next Steps

- Set up custom domain
- Configure analytics
- Add monitoring with Vercel Analytics
- Set up error tracking (Sentry, etc.)
- Enable Vercel Speed Insights

---

**Deployment completed!** Your Bible Chat app is now live! 🎉
