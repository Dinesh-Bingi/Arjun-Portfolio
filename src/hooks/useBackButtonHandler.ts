import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to handle browser back button behavior.
 * On first back press, scrolls to top or closes modal.
 * After returning to home, subsequent back presses behave normally.
 */
export const useBackButtonHandler = () => {
  const hasAddedHistoryEntry = useRef(false);
  const scrollThreshold = 100; // Minimum scroll to trigger back button handling
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Track modal state via custom events
    const handleOpenProject = () => {
      setIsModalOpen(true);
      
      // Add history entry when modal opens (only if not already added)
      if (!hasAddedHistoryEntry.current) {
        hasAddedHistoryEntry.current = true;
        window.history.pushState({ fromPortfolio: true, type: 'modal' }, '', window.location.pathname);
      }
    };

    const handleCloseProject = () => {
      setIsModalOpen(false);
      // If we're at the top after closing modal, reset the flag
      if (window.scrollY <= scrollThreshold) {
        hasAddedHistoryEntry.current = false;
      }
    };

    // Listen to project modal events
    window.addEventListener('openProject', handleOpenProject as EventListener);
    
    // Listen for modal close
    window.addEventListener('closeProject', handleCloseProject);

    // Add history entry when user scrolls down
    const handleScroll = () => {
      if (!hasAddedHistoryEntry.current && window.scrollY > scrollThreshold && !isModalOpen) {
        hasAddedHistoryEntry.current = true;
        window.history.pushState({ fromPortfolio: true, type: 'scroll' }, '', window.location.pathname);
      }
    };

    // Handle popstate (back button)
    const handlePopState = (event: PopStateEvent) => {
      // Only handle if we previously added a history entry
      if (!hasAddedHistoryEntry.current) {
        return;
      }

      // Check if we're at the top and no modal is open
      const isAtTop = window.scrollY <= scrollThreshold;
      
      if (isAtTop && !isModalOpen) {
        // User is at top with no modal - let them navigate away
        hasAddedHistoryEntry.current = false;
        return;
      }

      // User is scrolled down or modal is open - scroll to top or close modal
      if (isModalOpen) {
        window.dispatchEvent(new CustomEvent('closeProject'));
      } else {
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Push state back to keep user on page
      window.history.pushState({ fromPortfolio: true, handled: true }, '', window.location.pathname);
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
