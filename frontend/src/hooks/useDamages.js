import { useState, useEffect } from 'react';

export function useDamages() {
  const [damages, setDamages] = useState([]);
  const [totalDamages, setTotalDamages] = useState(0);
  const [totalPendingDamages, setTotalPendingDamages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDamages() {
      try {
        const response = await fetch('/api/damages/');
        if (!response.ok) {
          throw new Error('Failed to fetch damages');
        }
        const data = await response.json();

        setDamages(data.damaged_items);
        setTotalDamages(data.total_damages);
        setTotalPendingDamages(data.total_pending_damages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDamages();
  }, []);

  return { damages, totalDamages, totalPendingDamages, setDamages, loading, error };
}
