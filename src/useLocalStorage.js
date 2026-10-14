import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
      const [value, setValue] = useState(() => {
        try {
          const stored = localStorage.getItem("notes");
          return stored ? JSON.parse(stored) : [];
        } catch {
          return initialValue;
        }
      });
    
      useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(value));
      }, [key,value]);
      
      return [value, setValue];
    
}