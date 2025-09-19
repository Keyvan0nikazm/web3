import { useState } from 'react';
import ExpenseItem from '../components/ExpensiveItem';
import type { Expense } from '../type'

const Home = () => {
  const initialExpense: Expense[] = [
    {
      id: '1',
      description: 'Courses alimentaires',
      amount: 85.50,
      date: '2025-09-18',
      pay: 'Alice'
    },
    {
      id: '2',
      description: 'Essence voiture',
      amount: 65.00,
      date: '2025-09-17',
      pay: 'Bob'
    },
    {
      id: '3',
      description: 'Restaurant',
      amount: 42.75,
      date: '2025-09-16',
      pay: 'Dani'
    },
    {
      id: '4',
      description: 'Abonnement Netflix',
      amount: 15.99,
      date: '2025-09-15',
      pay: 'Ethan'
    }
  ];

  const [expenses] = useState<Expense[]>(initialExpense);

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