# 🚀 Vercel Deployment Checklist

## ✅ Pre-Deployment Checks

### 1. Build Configuration
- [x] **vercel.json exists** and is configured correctly (version 2 format)
  - Frontend: `apps/frontend/package.json` using `@vercel/static-build`
  - Routes configured for all requests → frontend
- [ ] **Test build locally** - Run `npm run build --workspace=safehaven-frontend` from root
- [ ] **Verify frontend dist** - Check that `apps/frontend/dist` contains built files

### 2. Vercel Project Settings
- [ ] **Node.js Version** - Set to `20.x` in Vercel dashboard (Settings → General → Node.js Version)
- [ ] **Root Directory** - Keep as `.` (root of monorepo)
- [ ] **Framework Preset** - Set to "Vite" (or "Other" if Vite not available)

### 3. Environment Variables
- [ ] **No environment variables needed!** 
  - The frontend works completely standalone
  - Questionnaires provide local analysis based on scores
  - No API keys or backend configuration required

### 4. Frontend Configuration
- [x] **Questionnaires configured** - All mental health assessments work locally
- [x] **Local analysis** - Results calculated based on score thresholds
- [x] **No backend required** - Everything runs in the browser

### 6. Testing Checklist
- [ ] **Local build works** - `npm run build --workspace=safehaven-frontend` succeeds
- [ ] **No TypeScript errors** - Run `npm run build` and check for errors
- [ ] **No linting errors** - Check ESLint output
- [ ] **Frontend preview works** - Test `npm run preview` in frontend directory
- [ ] **Questionnaires work** - Test all mental health assessments
- [ ] **Results display correctly** - Verify score analysis and messages appear

### 7. Git & Repository
- [ ] **All changes committed** - `git status` shows clean working tree
- [ ] **vercel.json committed** - File is in repository
- [ ] **No sensitive data** - Check `.gitignore` excludes `.env` files
- [ ] **Main branch updated** - Push to `main` branch (or your deployment branch)

### 8. Post-Deployment Verification
- [ ] **Build succeeds** - Check Vercel build logs for success
- [ ] **Site loads** - Visit your Vercel URL
- [ ] **Mental Health Test works** - Test the "Test Your Mental State" button
- [ ] **Questionnaires complete** - All assessments can be completed
- [ ] **Results display** - Score analysis and messages appear correctly
- [ ] **All pages load** - Test navigation to all routes
- [ ] **Mobile responsive** - Test on mobile device/browser

### 9. Monitoring & Debugging
- [ ] **Vercel logs accessible** - Know where to check build logs
- [ ] **Browser console** - Check for any client-side errors
- [ ] **Error tracking** - Consider adding error tracking (Sentry, etc.)

## 🔧 Quick Fixes if Build Fails

### If build fails with "MODULE_NOT_FOUND":
1. Check `vercel.json` uses workspace command from root
2. Verify Node.js version is set to 20.x in Vercel
3. Check that `npm install` runs from root (installs all workspace deps)

### If questionnaires don't work:
1. Check browser console for JavaScript errors
2. Verify all questions can be answered
3. Check that results display after completing a test
4. Ensure all assessment types work (PHQ-9, GAD-7, K10, DASS-21, WHO-5)

### If frontend loads but features don't work:
1. Check browser console for JavaScript errors
2. Verify React components are loading correctly
3. Check that all UI components render properly
4. Test the mental health questionnaire modal

## 📝 Notes

- **Frontend Only**: Simple static site deployment - no backend needed
- **Environment Variables**: None required - everything works client-side
- **Questionnaires**: All mental health assessments work with local score analysis
- **Results**: Based on clinical thresholds - provides appropriate guidance and support resources
- **Local Development**: Just run `npm run dev` from root to start frontend

