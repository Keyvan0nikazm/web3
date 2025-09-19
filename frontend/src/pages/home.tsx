import ExpenseItem from '../components/ExpensiveItem';
import type { Expense } from '../type'

const Home = () => {
  const expenses: Expense[] = [
    {
      id: '1',
      description: 'Courses alimentaires',
      amount: 85.50,
      date: '2025-09-18',
      pay: 'Carte bancaire'
    },
    {
      id: '2',
      description: 'Essence voiture',
      amount: 65.00,
      date: '2025-09-17',
      pay: 'Espèces'
    },
    {
      id: '3',
      description: 'Restaurant',
      amount: 42.75,
      date: '2025-09-16',
      pay: 'Carte bancaire'
    },
    {
      id: '4',
      description: 'Abonnement Netflix',
      amount: 15.99,
      date: '2025-09-15',
      pay: 'Prélèvement automatique'
    }
  ];

  return (
    <div className="home-page">
      <h1>Mes Dépenses</h1>
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