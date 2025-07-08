
import { useState, useEffect } from 'react';

interface ContentData {
  [key: string]: any;
}

export const useContent = (section: string) => {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`/src/data/content/${section}.json`);
        if (!response.ok) {
          // If file doesn't exist, return default disabled state
          setContent({ enabled: false });
          setLoading(false);
          return;
        }
        const data = await response.json();
        setContent(data);
      } catch (err) {
        console.log(`Content file for ${section} not found, section will be hidden`);
        setContent({ enabled: false });
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [section]);

  return { content, loading, error };
};
