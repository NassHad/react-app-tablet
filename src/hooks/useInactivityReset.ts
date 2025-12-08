import { useEffect, useRef, useCallback, useState } from 'react';

interface UseInactivityResetOptions {
  /**
   * Time in milliseconds before triggering the reset
   * @default 120000 (2 minutes)
   */
  timeout?: number;
  /**
   * Time in milliseconds before showing the timer warning
   * @default 5000 (5 seconds)
   */
  showTimerAfter?: number;
  /**
   * Callback function to execute when inactivity timeout is reached
   */
  onInactivityTimeout: () => void;
  /**
   * Whether the inactivity timer is enabled
   * @default true
   */
  enabled?: boolean;
}

/**
 * Custom hook that triggers a callback after a specified period of user inactivity
 *
 * Tracks the following user activities:
 * - Mouse movements
 * - Mouse clicks
 * - Touch events
 * - Keyboard events
 *
 * @param options Configuration options for the inactivity reset
 */
export const useInactivityReset = ({
  timeout = 120000, // 2 minutes by default
  showTimerAfter = 5000, // Show timer after 5 seconds of inactivity
  onInactivityTimeout,
  enabled = true,
}: UseInactivityResetOptions) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(onInactivityTimeout);
  const lastActivityRef = useRef<number>(Date.now());

  const [remainingTime, setRemainingTime] = useState<number>(timeout);
  const [showTimer, setShowTimer] = useState<boolean>(false);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = onInactivityTimeout;
  }, [onInactivityTimeout]);

  // Function to clear the existing timeout and interval
  const clearInactivityTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Function to reset the inactivity timer
  const resetTimer = useCallback(() => {
    clearInactivityTimeout();
    lastActivityRef.current = Date.now();
    setRemainingTime(timeout);
    setShowTimer(false);

    if (enabled) {
      // Set timeout for inactivity reset
      timeoutRef.current = setTimeout(() => {
        console.log('⏰ Inactivity timeout reached - resetting application');
        callbackRef.current();
      }, timeout);

      // Set interval to update remaining time every second
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - lastActivityRef.current;
        const remaining = Math.max(0, timeout - elapsed);

        setRemainingTime(remaining);

        // Show timer after specified delay
        if (elapsed >= showTimerAfter) {
          setShowTimer(true);
        }

        // Stop interval when time runs out
        if (remaining <= 0 && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, 100); // Update every 100ms for smooth countdown
    }
  }, [clearInactivityTimeout, enabled, timeout, showTimerAfter]);

  useEffect(() => {
    if (!enabled) {
      clearInactivityTimeout();
      setShowTimer(false);
      return;
    }

    // List of events to track for user activity
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    // Set up the initial timer
    resetTimer();

    // Add event listeners to reset timer on user activity
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });

    // Cleanup function to remove event listeners and clear timeout
    return () => {
      clearInactivityTimeout();
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true);
      });
    };
  }, [resetTimer, clearInactivityTimeout, enabled]);

  return {
    resetTimer,
    remainingTime,
    showTimer
  };
};
