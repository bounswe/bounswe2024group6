import { useEffect } from 'react';

export const usePageTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | BuLingo`;

    // Cleanup when component unmounts
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}; 