# 🚀 Vercel Deployment Checklist

## ✅ Pre-Deployment Checks

### 1. Build Configuration
- [x] **vercel.json exists** and is configured correctly (version 2 format)
  - Backend: `apps/backend/server.js` using `@vercel/node`
  - Frontend: `apps/frontend/package.json` using `@vercel/static-build`
  - Routes configured for `/api/*` → backend, everything else → frontend
- [ ] **Test build locally** - Run `npm run build --workspaces` from root
- [ ] **Verify backend dist** - Check that `apps/backend/dist` contains compiled files
- [ ] **Verify frontend dist** - Check that `apps/frontend/dist` contains built files

### 2. Vercel Project Settings
- [ ] **Node.js Version** - Set to `20.x` in Vercel dashboard (Settings → General → Node.js Version)
- [ ] **Root Directory** - Keep as `.` (root of monorepo)
- [ ] **Framework Preset** - Set to "Vite" (or "Other" if Vite not available)

### 3. Environment Variables
- [ ] **GEMINI_API_KEY** - Your Google Gemini API key (REQUIRED)
  - Set in Vercel Dashboard → Settings → Environment Variables
  - This is the ONLY environment variable needed
  - No frontend environment variables needed (uses relative paths)

### 4. Backend API (Vercel Serverless Functions)
- [x] **Backend configured** - `apps/backend/server.js` exists
- [x] **Dependencies installed** - `@vercel/node` and backend dependencies available
- [ ] **Environment Variable in Vercel**:
  - [ ] `GEMINI_API_KEY` - Your Google Gemini API key (REQUIRED)

### 5. Code Updates
- [x] **API endpoint configured** - Frontend uses relative path `/api/mental-health/analyze`
  - Works automatically on same Vercel domain
  - No environment variables needed for API URL

### 6. Testing Checklist
- [ ] **Local build works** - `npm run build --workspace=safehaven-frontend` succeeds
- [ ] **No TypeScript errors** - Run `npm run build` and check for errors
- [ ] **No linting errors** - Check ESLint output
- [ ] **Frontend preview works** - Test `npm run preview` in frontend directory
- [ ] **Backend API works** - Test backend endpoint with Postman/curl
- [ ] **CORS configured** - Backend allows requests from frontend domain

### 7. Git & Repository
- [ ] **All changes committed** - `git status` shows clean working tree
- [ ] **vercel.json committed** - File is in repository
- [ ] **No sensitive data** - Check `.gitignore` excludes `.env` files
- [ ] **Main branch updated** - Push to `main` branch (or your deployment branch)

### 8. Post-Deployment Verification
- [ ] **Build succeeds** - Check Vercel build logs for success
- [ ] **Site loads** - Visit your Vercel URL
- [ ] **Mental Health Test works** - Test the "Test Your Mental State" button
- [ ] **API calls succeed** - Check browser console for API errors
- [ ] **Fallback works** - If API fails, fallback message should appear
- [ ] **All pages load** - Test navigation to all routes
- [ ] **Mobile responsive** - Test on mobile device/browser

### 9. Monitoring & Debugging
- [ ] **Vercel logs accessible** - Know where to check build/runtime logs
- [ ] **Backend logs accessible** - Know where to check backend API logs
- [ ] **Error tracking** - Consider adding error tracking (Sentry, etc.)

## 🔧 Quick Fixes if Build Fails

### If build fails with "MODULE_NOT_FOUND":
1. Check `vercel.json` uses workspace command from root
2. Verify Node.js version is set to 20.x in Vercel
3. Check that `npm install` runs from root (installs all workspace deps)

### If API calls fail:
1. Verify `GEMINI_API_KEY` is set in Vercel environment variables
2. Check backend is building correctly (check Vercel logs)
3. Verify routes in `vercel.json` are correct
4. Test API endpoint directly: `https://your-domain.vercel.app/api/mental-health/analyze`

### If frontend loads but features don't work:
1. Check browser console for errors
2. Check network tab for failed API requests (should be `/api/mental-health/analyze`)
3. Verify backend serverless function is deployed (check Vercel functions tab)
4. Check that `GEMINI_API_KEY` is set correctly

## 📝 Notes

- **Backend & Frontend**: Both deployed on Vercel using version 2 builds configuration
- **Environment Variables**: Only `GEMINI_API_KEY` needed - set in Vercel dashboard
- **API URL**: Uses relative path `/api/mental-health/analyze` (same domain, no env var needed)
- **Local Development**: Backend runs on `http://localhost:3000`, frontend uses relative path which works in production

