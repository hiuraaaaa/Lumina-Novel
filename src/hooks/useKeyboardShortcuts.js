import { useEffect } from 'react';

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey || event.metaKey;
      const shift = event.shiftKey;
      const alt = event.altKey;

      // Don't trigger if user is typing in an input
      if (
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA' ||
        event.target.isContentEditable
      ) {
        return;
      }

      Object.entries(shortcuts).forEach(([shortcutKey, callback]) => {
        const parts = shortcutKey.toLowerCase().split('+');
        const requiredCtrl = parts.includes('ctrl');
        const requiredShift = parts.includes('shift');
        const requiredAlt = parts.includes('alt');
        const mainKey = parts[parts.length - 1];

        if (
          key === mainKey &&
          ctrl === requiredCtrl &&
          shift === requiredShift &&
          alt === requiredAlt
        ) {
          event.preventDefault();
          callback(event);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

