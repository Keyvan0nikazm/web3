import type { Expense } from '../type';

interface ExpenseItemProps {
  expense: Expense;
}

const ExpenseItem = ({ expense } : ExpenseItemProps) => {
  return (
    <div className="expense-item">
      <div className="expense-date">
        <span>{expense.date}</span>
      </div>
      <div className="expense-details">
        <h3>{expense.description}</h3>
        <div className="expense-pay">{expense.pay}</div>
        <div className="expense-amount">${expense.amount.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ExpenseItem;