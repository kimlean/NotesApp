/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last time it was invoked.
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: number | undefined;
    
    return function(...args: Parameters<T>): void {
      const later = () => {
        timeout = undefined;
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
    };
  }