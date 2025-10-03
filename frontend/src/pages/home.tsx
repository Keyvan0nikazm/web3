import { useEffect, useState, useRef, useContext } from 'react';
import { PageContext } from '../App';
import ExpenseItem from '../components/ExpensiveItem';
import type { Expense } from '../type'
import ExpenseAdd from '../components/ExpenseAdd';

const Home = () => {
  const { setCurrentPage } = useContext(PageContext);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [resetError, setResetError] = useState(false);
  const isMounted = useRef(true);

  // get host from env and ensure no trailing slash
  const host = import.meta.env.VITE_API_URL || 'http://unknown-api-url.com';

  const loadExpenses = async () => {
    try {
      const res = await fetch(`${host}/api/expenses`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Expense[] = await res.json();
      if (isMounted.current) setExpenses(data);
    } catch (err) {
      console.error('error loading expenses', err);
      // optionally clear or keep existing list; here we keep existing
    }
  };

  useEffect(() => {
    isMounted.current = true;
    loadExpenses();
    return () => { isMounted.current = false; };
  }, []);

  const handleReset = async () => {
    setResetLoading(true);
    setResetMessage(null);
    setResetError(false);
    try {
      const res = await fetch(`${host}/api/expenses/reset`, { method: 'POST' });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status} ${text}`);
      }
      setResetMessage('Données réinitialisées avec succès.');
      setResetError(false);
      await loadExpenses();
    } catch (err) {
      console.error('Reset failed', err);
      setResetMessage(`Échec de la réinitialisation: ${err instanceof Error ? err.message : String(err)}`);
      setResetError(true);
    } finally {
      if (isMounted.current) setResetLoading(false);
    }
  };

  const handleAdd = (newExpense: Expense) => {
    setExpenses(prev => [newExpense, ...prev]);
  }

  return (
    <div className="home-page">
      <h1>Mes Dépenses</h1>

      <div style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setCurrentPage('Welcome')}>Accueil</button>
        <button onClick={() => setCurrentPage('List')}>Liste</button>
        <button onClick={() => setCurrentPage('Add')}>Ajouter</button>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <ExpenseAdd handledAdd={handleAdd} />
        <button onClick={handleReset} disabled={resetLoading} aria-busy={resetLoading}>
          {resetLoading ? 'Réinitialisation...' : 'Reset Data'}
        </button>
        {resetMessage && (
          <div style={{ color: resetError ? 'crimson' : 'green' }}>
            {resetMessage}
          </div>
        )}
      </div>

      <div className="expenses-list">
        {expenses.map((expense) => (
          <ExpenseItem 
            key={expense.id} 
            expense={expense} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;