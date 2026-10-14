import { useState, useEffect } from "react";


export function useFetch({API_URL}) {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [reloadKey, setReloadKey] = useState(0);


    useEffect(() => {
        const controller = new AbortController();
    
        async function fetchUsers() {
          try {
            setLoading(true);
            setError(null);
    
            const res = await fetch(API_URL, {
              signal: controller.signal,
            });
    
            if (!res.ok) {
              throw new Error(`Request failed with status ${res.status}`);
            }
    
            const data = await res.json();
            setUsers(data);
          } catch (err) {
            if (err.name !== "AbortError") {
              setError(err.message);
            }
          } finally {
            if (!controller.signal.aborted) {
              setLoading(false);
            }
          }
        }
    
        fetchUsers();
    
        return () => controller.abort();
      }, [reloadKey, API_URL]);
    
      function refetch() {
        setReloadKey((prev) => prev + 1);
      }

    return { users, loading, error, refetch };
}