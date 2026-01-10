# SPA Implementation Analysis - Solved Issues

## Overview

This portfolio has been successfully converted to a Single Page Application (SPA) with proper client-side routing using the History API. All major SPA-related issues have been resolved. Below is a detailed breakdown of what has been fixed.

---

## ✅ **ISSUE 1: Page Refresh / Ctrl+R Causes 404 Errors**

### Original Problem
When users refreshed the browser (Ctrl+R) or directly accessed routes like `/projects/project-slug`, the server returned a 404 NOT_FOUND error.

### Why It Happened
In a traditional SPA, all routing is handled client-side. When you navigate to `/projects/metro-descent`, the browser makes a request to the server for that path. However, the server doesn't have a physical file at that location - it only has `index.html`. Without proper configuration, the server doesn't know to serve `index.html` for these routes, causing 404 errors.

### How It Was Fixed

**Development Environment:**
- Vite dev server automatically handles SPA routing by serving `index.html` for all routes (configured in `vite.config.ts` with comments explaining this behavior).

**Production Environment:**
Three configuration files were created to support different hosting platforms:

1. **Netlify / Cloudflare Pages** (`public/_redirects`):
   ```
   /*    /index.html   200
   ```
   - Redirects all routes to `index.html` with HTTP 200 status code (prevents redirect loops)

2. **Vercel** (`vercel.json`):
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
   - Rewrites all incoming requests to serve `index.html`

3. **Apache** (`public/.htaccess`):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```
   - Uses Apache mod_rewrite to serve `index.html` for all non-file/non-directory routes

**Result:** All routes now correctly serve `index.html`, allowing React Router and custom History API navigation to handle routing client-side.

---

## ✅ **ISSUE 2: Browser Back/Forward Navigation Not Working**

### Original Problem
Pressing the browser back button changed the URL but didn't update the visible content. The page stayed on the project details view even though the URL indicated the landing page.

### Why It Happened
The application was using `window.history.pushState()` to update URLs when navigating, but wasn't listening to the `popstate` event that fires when users press back/forward. Without a `popstate` handler, the browser history stack worked, but the application state didn't synchronize with URL changes.

### How It Was Fixed

**1. Popstate Event Handling** (`src/components/ProjectsSection.tsx`, lines 183-186):
```typescript
const handlePopState = () => {
  syncModalWithUrl();
};

window.addEventListener('popstate', handlePopState);
```

**2. URL Synchronization Function** (`src/components/ProjectsSection.tsx`, lines 154-170):
```typescript
const syncModalWithUrl = () => {
  const pathname = window.location.pathname;
  if (pathname.startsWith('/projects/')) {
    const projectId = pathname.replace('/projects/', '');
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project); // Open project modal
    } else {
      // Invalid project ID - redirect to home
      window.history.replaceState(null, '', '/');
      setSelectedProject(null);
    }
  } else {
    // URL is not a project URL - close modal
    setSelectedProject(null);
  }
};
```

**3. History Entry Creation** (`src/hooks/useBackButtonHandler.ts`, lines 27-28):
```typescript
const projectUrl = `/projects/${event.detail.projectId}`;
window.history.pushState({ fromPortfolio: true, type: 'project', projectId: event.detail.projectId }, '', projectUrl);
```

**4. Enhanced Back Button Logic** (`src/hooks/useBackButtonHandler.ts`, lines 56-120):
- Handles popstate events with proper state checking
- Manages scroll position when returning to landing page
- Prevents infinite loops with state flags
- Works correctly with both project modal and scroll-based navigation

**Result:** Browser back/forward buttons now correctly update both URL and visible content, keeping them in perfect sync.

---

## ✅ **ISSUE 3: History API Usage (pushState, replaceState, popstate)**

### Original Problem
The History API was either not being used, or was being used incorrectly, causing navigation inconsistencies.

### How It Was Fixed

**PushState Usage** (`src/hooks/useBackButtonHandler.ts`):
- **Line 27**: Creates history entry when project opens: `window.history.pushState({...}, '', projectUrl)`
- **Line 52**: Creates history entry when user scrolls: `window.history.pushState({...}, '', pathname)`
- **Line 115**: Creates handled state entry: `window.history.pushState({ handled: true }, '', pathname)`

**ReplaceState Usage** (`src/components/ProjectsSection.tsx`, `ProjectModal.tsx`):
- **Line 163, 210**: Replaces URL when closing modal manually: `window.history.replaceState(null, '', '/')`
- Used when user closes modal manually (no new history entry needed)

**PopState Handling**:
- **ProjectsSection.tsx** (line 184): Handles URL-based navigation
- **HeroSection.tsx** (line 123): Handles video playback state
- **useBackButtonHandler.ts** (line 56): Handles complex back button logic

**Result:** History API is now used consistently and correctly throughout the application, ensuring proper browser history stack management.

---

## ✅ **ISSUE 4: Hero Video Playback During Navigation**

### Original Problem
The hero background video autoplayed correctly on first load, but after navigating to a project and returning home (via navigation or browser back), the video remained paused until a full page refresh.

### Why It Happened
In an SPA, when you navigate away from a route and return, the same component instance may persist, but its internal state (including video playback state) might not be properly restored. The video element was being paused when navigating away, but wasn't explicitly resumed when returning to the landing page.

### How It Was Fixed

**1. Route-Based Video Control** (`src/components/HeroSection.tsx`, lines 86-156):
```typescript
const updateVideoPlayback = () => {
  const pathname = window.location.pathname;
  const isLandingPage = pathname === '/';
  
  if (isLandingPage && !isLoading) {
    // Resume video when on landing page
    if (video.ended) {
      video.currentTime = 0; // Reset if ended
    }
    if (video.readyState >= 2) {
      video.play().catch(() => {}); // Resume playback
    }
  } else {
    video.pause(); // Pause when navigating away
  }
};
```

**2. PopState Handler for Video** (`src/components/HeroSection.tsx`, lines 122-126):
```typescript
const handlePopState = () => {
  setTimeout(updateVideoPlayback, 0); // Small delay to ensure URL updated
};
```

**3. Project Open/Close Events** (`src/components/HeroSection.tsx`, lines 128-141):
```typescript
const handleProjectOpen = () => {
  video.pause(); // Pause immediately when project opens
};

const handleProjectClose = () => {
  const pathname = window.location.pathname;
  if (pathname === '/' && !isLoading) {
    setTimeout(() => {
      updateVideoPlayback(); // Resume when returning to landing
    }, 0);
  }
};
```

**Result:** Hero video now correctly pauses when navigating away and automatically resumes when returning to the landing page, without requiring a page refresh.

---

## ✅ **ISSUE 5: Project Overview Videos Freezing**

### Original Problem
When switching between different projects, some project overview videos would freeze or stop playing. The video `src` would change, but the playback state wasn't properly reset.

### Why It Happened
React components can persist across prop changes. When a project changed, the `VideoSection` component received a new `videoUrl`, but the video element's internal state (currentTime, playback state) wasn't reset. The browser tried to play a new video source on an element that was in an inconsistent state.

### How It Was Fixed

**1. Video Reset on Project Change** (`src/components/project-sections/VideoSection.tsx`, lines 16-40):
```typescript
useEffect(() => {
  const video = videoRef.current;
  
  // Reset state
  setIsVisible(false);
  setIsLoaded(false);

  if (video) {
    video.pause();      // Stop playback
    video.currentTime = 0; // Reset position
    video.load();       // Reload video source
    unregisterVideo(video); // Clean up video manager
  }
}, [section.videoUrl, projectId]); // Trigger when video URL OR project changes
```

**2. Component Remounting** (`src/components/ProjectModal.tsx`, line 126):
```typescript
<SectionRenderer 
  key={`${project.id}-${index}-${section.type}`} 
  section={section} 
  projectId={project.id} 
/>
```
- Including `project.id` in the key forces React to unmount and remount the component when the project changes
- This ensures all `useEffect` hooks are re-run, triggering video reset logic

**3. AnimatePresence Mode** (`src/components/ProjectModal.tsx`, line 50):
```typescript
<AnimatePresence mode="wait">
```
- `mode="wait"` ensures old content fully exits before new content enters, preventing state conflicts

**Result:** Project videos now properly reset and reload when switching between projects, preventing freezing and ensuring smooth playback.

---

## ✅ **ISSUE 6: Videos Pausing on Tab Switch/Visibility Change**

### Original Problem
When users switched to another browser tab, minimized the browser, or navigated away, videos would pause (expected browser behavior). However, when returning to the tab, videos remained paused instead of automatically resuming.

### Why It Happened
Browsers automatically pause media playback when a page becomes inactive (hidden) for performance reasons. However, they don't automatically resume when the page becomes visible again. This is a security/performance feature, but in an SPA context, we need to explicitly resume playback when the user returns.

### How It Was Fixed

**Page Visibility API Implementation** - Added to three video components:

**1. HeroSection** (`src/components/HeroSection.tsx`, lines 175-212):
```typescript
useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const handleVisibilityChange = () => {
    if (document.hidden) {
      // Tab hidden - ensure video is paused
      if (!video.paused) {
        video.pause();
      }
    } else {
      // Tab visible - resume if on landing page
      const pathname = window.location.pathname;
      const isLandingPage = pathname === '/';
      
      if (isLandingPage && !isLoading && video.paused && !video.ended) {
        // Only resume if video was paused (not ended)
        if (video.readyState >= 2) {
          video.play().catch(() => {}); // Ignore autoplay errors
        } else {
          // Wait for video to be ready
          const handleCanPlay = () => {
            video.play().catch(() => {});
            video.removeEventListener('canplay', handleCanPlay);
          };
          video.addEventListener('canplay', handleCanPlay);
        }
      }
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
}, [isLoading]);
```

**2. VideoSection** (`src/components/project-sections/VideoSection.tsx`, lines 97-131):
- Similar implementation, but checks `section.autoPlay !== false` and `isLoaded` before resuming
- Only resumes videos that should autoplay and are already loaded

**3. DevelopmentSection** (`src/components/project-sections/DevelopmentSection.tsx`, lines 79-113):
- Handles visibility changes for production/process videos in development sections
- Resumes videos that are configured to autoplay

**Key Implementation Details:**
- Uses `document.visibilitychange` event (Page Visibility API standard)
- Checks `document.hidden` to detect tab visibility state
- Only resumes videos that should be playing (respects `autoPlay` settings)
- Checks video state (`paused`, `ended`, `readyState`) before attempting to play
- Handles autoplay errors gracefully with `.catch()`
- Respects browser autoplay policies (videos are already `muted` and `playsInline`)

**Result:** Videos now automatically pause when the tab becomes inactive (expected) and automatically resume when the user returns to the tab, providing a seamless experience without manual interaction.

---

## 🔍 **Remaining SPA-Related Edge Cases & Risks**

While all major issues have been resolved, there are a few edge cases to be aware of:

### 1. **Invalid Project IDs in URL**
- **Status:** ✅ Handled
- **Implementation:** `ProjectsSection.syncModalWithUrl()` checks if project exists (line 159)
- **Behavior:** If invalid project ID in URL, redirects to home page using `replaceState`
- **Risk Level:** Low - already handled

### 2. **Multiple Popstate Listeners**
- **Status:** ⚠️ Minor Risk
- **Issue:** Both `ProjectsSection` and `useBackButtonHandler` listen to `popstate`
- **Impact:** Both handlers run, but they're designed to work together:
  - `ProjectsSection` handles URL-to-modal sync
  - `useBackButtonHandler` handles scroll position and history state
- **Risk Level:** Low - currently working correctly, but could cause issues if either handler is modified

### 3. **React Router + Custom History API**
- **Status:** ⚠️ Needs Monitoring
- **Issue:** App uses both React Router (`BrowserRouter`) and custom History API (`pushState`/`popstate`)
- **Current Setup:**
  - React Router handles base route (`/`) and catch-all (`*`)
  - Custom History API handles project routes (`/projects/*`)
- **Risk Level:** Medium - Could cause conflicts if React Router is used for more routes in the future
- **Recommendation:** Consider using React Router's `useNavigate()` for project navigation instead of raw History API

### 4. **Browser Autoplay Policies**
- **Status:** ✅ Handled
- **Implementation:** All videos are `muted` and `playsInline`, with `.catch()` on `play()` calls
- **Risk Level:** Low - already handles autoplay restrictions

### 5. **Direct Navigation from External Sites**
- **Status:** ✅ Handled
- **Implementation:** Server-side fallback routing serves `index.html` for all routes
- **Behavior:** Direct links to `/projects/project-id` work correctly
- **Risk Level:** Low - already handled

### 6. **Video Reset During Rapid Navigation**
- **Status:** ✅ Handled
- **Implementation:** `projectId` in component key forces remount on project change
- **Risk Level:** Low - AnimatePresence `mode="wait"` prevents rapid state changes

### 7. **History Stack Growth**
- **Status:** ⚠️ Minor Risk
- **Issue:** `useBackButtonHandler` creates history entries on scroll (line 52)
- **Impact:** Could create many history entries if user scrolls frequently
- **Risk Level:** Low - only creates one entry per session, uses flags to prevent duplicates
- **Recommendation:** Monitor history stack size if issues arise

### 8. **Mobile Browser Gesture Navigation**
- **Status:** ✅ Handled
- **Implementation:** `popstate` event fires on both desktop back button and mobile gesture back
- **Risk Level:** Low - already working correctly

### 9. **Browser Forward Button**
- **Status:** ✅ Handled
- **Implementation:** `popstate` fires for both back and forward navigation
- **Behavior:** `syncModalWithUrl()` reads current URL and updates UI accordingly
- **Risk Level:** Low - working correctly

---

## 📊 **Summary**

### ✅ Fully Resolved Issues:
1. Page refresh / Ctrl+R on deep routes
2. Browser back/forward navigation
3. History API implementation (pushState, replaceState, popstate)
4. Hero video playback during navigation
5. Project video freezing on switch
6. Video pausing/resuming on tab visibility changes

### ⚠️ Minor Considerations:
- Multiple popstate listeners (currently working, but monitor for conflicts)
- React Router + Custom History API hybrid approach (works, but consider consolidation)
- History stack growth on scroll (mitigated with flags)

### 🎯 Overall Status: **Production Ready**

The SPA implementation is robust, handles all major use cases, and follows best practices. The remaining edge cases are minor and have mitigations in place. The portfolio should work reliably across desktop and mobile browsers, with proper handling of direct links, refreshes, and browser navigation controls.
