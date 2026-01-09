import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to handle browser back button behavior.
 * When a project is opened, creates a history entry.
 * On first back press from project view, closes modal and returns to landing page.
 * On second back press, allows normal navigation away.
 */
export const useBackButtonHandler = () => {
  const hasHistoryEntry = useRef(false);
  const hasHandledBack = useRef(false);
  const scrollThreshold = 100; // Minimum scroll to trigger back button handling
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Track modal state via custom events
    const handleOpenProject = () => {
      setIsModalOpen(true);
      
      // ALWAYS create a history entry when project opens
      // This ensures back button from project view returns to landing page
      // Always pushState (don't replace) to create a proper history stack
      hasHistoryEntry.current = true;
      hasHandledBack.current = false;
      window.history.pushState({ fromPortfolio: true, type: 'project' }, '', window.location.pathname);
    };

    const handleCloseProject = () => {
      setIsModalOpen(false);
      // Don't reset history flags here - they'll be reset when back navigation is handled
      // This allows proper back button behavior even if modal is closed manually
    };

    // Listen to project modal events
    window.addEventListener('openProject', handleOpenProject as EventListener);
    
    // Listen for modal close
    window.addEventListener('closeProject', handleCloseProject);

    // Add history entry when user scrolls down (only if no project is open)
    const handleScroll = () => {
      if (!hasHistoryEntry.current && window.scrollY > scrollThreshold && !isModalOpen) {
        hasHistoryEntry.current = true;
        hasHandledBack.current = false;
        window.history.pushState({ fromPortfolio: true, type: 'scroll' }, '', window.location.pathname);
      }
    };

    // Handle popstate (back button)
    const handlePopState = (event: PopStateEvent) => {
      // Check the state we're navigating to
      const state = event.state as { fromPortfolio?: boolean; handled?: boolean; type?: string } | null;
      
      // If this is our "handled" state (pushed back after first back press), ignore it
      if (state?.handled) {
        return;
      }

      // Check if this is a portfolio state (project or scroll)
      const isPortfolioState = state?.fromPortfolio === true;
      const stateType = state?.type;
      
      // If not a portfolio state and we have no history entry, let browser navigate away
      if (!isPortfolioState && !hasHistoryEntry.current) {
        return;
      }

      // Check if we're at the top
      const isAtTop = window.scrollY <= scrollThreshold;

      // Priority: Handle project modal back navigation
      // If modal is open, we're navigating back from project view
      if (isModalOpen && hasHistoryEntry.current) {
        // First back press from project: close modal, scroll to top, return to landing
        if (!hasHandledBack.current) {
          hasHandledBack.current = true;
          window.dispatchEvent(new CustomEvent('closeProject'));
          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
          // Push state back to keep user on page
          window.history.pushState({ fromPortfolio: true, handled: true }, '', window.location.pathname);
          return;
        }
      }

      // Handle scroll-based back navigation (when no modal is open and not a project state)
      if (!isModalOpen && (stateType === 'scroll' || (isPortfolioState && stateType !== 'project'))) {
        // If at top, let them navigate away
        if (isAtTop) {
          hasHistoryEntry.current = false;
          hasHandledBack.current = false;
          return; // Let browser navigate away naturally
        }

        // If scrolled down, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Push state back to keep user on page
        window.history.pushState({ fromPortfolio: true, handled: true }, '', window.location.pathname);
        hasHistoryEntry.current = false;
        hasHandledBack.current = false;
        return;
      }
    };

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Listen to popstate (back button)
    window.addEventListener('popstate', handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener('openProject', handleOpenProject as EventListener);
      window.removeEventListener('closeProject', handleCloseProject);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isModalOpen]);
};
