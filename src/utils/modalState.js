import { useEffect } from 'react';

let activeModalCount = 0;

export const registerModalOpen = () => {
  activeModalCount += 1;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('app-modal-change', {
        detail: { count: activeModalCount, isOpen: activeModalCount > 0 },
      })
    );
  }
};

export const registerModalClose = () => {
  activeModalCount = Math.max(0, activeModalCount - 1);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('app-modal-change', {
        detail: { count: activeModalCount, isOpen: activeModalCount > 0 },
      })
    );
  }
};

export const useModalTracker = (isOpen = true) => {
  useEffect(() => {
    if (!isOpen) return;
    registerModalOpen();
    return () => {
      registerModalClose();
    };
  }, [isOpen]);
};
