import { MutableRefObject, useEffect, useState } from 'react';

interface IntersectionObserverResult {
  entry: IntersectionObserverEntry | null;
}

const useIntersectionObserver = (
  targetRef: MutableRefObject<Element | null>
): IntersectionObserverResult => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const target = targetRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      setEntry(firstEntry);
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef]);

  return { entry };
};

export default useIntersectionObserver;
