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
      setEntry(entries[0]);
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef]);

  return { entry };
};

export default useIntersectionObserver;
