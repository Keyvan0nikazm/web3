import type { Expense } from '../type';
import { useState } from 'react';

interface ExpenseItemAdd{
    handledAdd: (expense : Expense) => void;
}

const ExpenseAdd = ({handledAdd} : ExpenseItemAdd) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onAdd = async () => {
        setIsSubmitting(true);
        try {
            const pay: Expense["pay"] = Math.random() < 0.5 ? "Alice" : "Bob";
            const amount: number = parseFloat((Math.random() * 100).toFixed(2));
            const newExpense: Expense = {
                id: new Date().toISOString().split('T')[0],
                date: new Date().toISOString().split('T')[0],
                description: "voici la personne qui a payer : " + pay ,
                pay,
                amount,
            };

            const res = await fetch('http://localhost:3000/api/expenses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newExpense),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || `Request failed with status ${res.status}`);
            }

            // assume backend returns the created expense
            const created: Expense = await res.json();

            // refresh the list in the parent via handler
            handledAdd(created);
        } catch (err) {
            console.error('Failed to add expense', err);
            alert('Failed to add expense. See console for details.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return <button onClick={onAdd} disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add'}</button>
};

export default ExpenseAdd;