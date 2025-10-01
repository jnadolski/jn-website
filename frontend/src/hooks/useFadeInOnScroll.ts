import { useRef, useEffect, useState } from 'react';

const useFadeInOnScroll = (options?: IntersectionObserverInit) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setIsVisible(true);
        setHasAnimated(true); // Ensure animation only plays once
      }
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      const currentElement = elementRef.current;
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [elementRef, options, hasAnimated]);

  return { elementRef, isVisible };
};

export default useFadeInOnScroll;
