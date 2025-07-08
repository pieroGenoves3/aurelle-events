
import { useState, useEffect } from 'react';

export const useContent = <T>(fileName: string): T | null => {
  const [content, setContent] = useState<T | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log(`Fetching content for: ${fileName}`);
        const response = await fetch(`/data/${fileName}.json`);
        console.log(`Response status for ${fileName}:`, response.status);
        if (response.ok) {
          const data = await response.json();
          console.log(`Content loaded for ${fileName}:`, data);
          setContent(data);
        } else {
          console.error(`Failed to fetch ${fileName}: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error loading ${fileName} content:`, error);
      }
    };

    fetchContent();
  }, [fileName]);

  return content;
};
