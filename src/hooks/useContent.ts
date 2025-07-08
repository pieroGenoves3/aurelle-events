
import { useState, useEffect } from 'react';

export const useContent = <T>(fileName: string): T | null => {
  const [content, setContent] = useState<T | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/src/data/content/${fileName}.json`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      } catch (error) {
        console.error(`Error loading ${fileName} content:`, error);
      }
    };

    fetchContent();
  }, [fileName]);

  return content;
};
