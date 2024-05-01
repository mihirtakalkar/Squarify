// hooks/useGoogleMapsScript.js
import { useEffect, useState } from 'react';

const useGoogleMapsScript = (apiKey) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector(`script[src*="googleapis.com"]`);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        setIsLoaded(true);
      };

      return () => {
        document.head.removeChild(script);
      };
    } else {
      setIsLoaded(true);
    }
  }, [apiKey]);

  return isLoaded;
};

export default useGoogleMapsScript;
