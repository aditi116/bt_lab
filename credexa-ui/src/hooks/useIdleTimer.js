import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes (configurable)
const EVENTS = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

export const useIdleTimer = () => {
  const { logout, isAuthenticated } = useAuth();
  const timeoutIdRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (!isAuthenticated) return;

    // Clear existing timer
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Set new timer
    timeoutIdRef.current = setTimeout(() => {
      console.log('User has been idle for too long. Logging out...');
      logout();
      window.location.href = '/login?reason=idle';
    }, IDLE_TIMEOUT);
  }, [logout, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      // Clear timer if user is not authenticated
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      return;
    }

    // Set up event listeners
    EVENTS.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Start timer
    resetTimer();

    // Cleanup
    return () => {
      EVENTS.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [resetTimer, isAuthenticated]);
};
