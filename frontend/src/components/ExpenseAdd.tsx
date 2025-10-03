import type { Expense } from '../type';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ExpenseItemAdd {
    handledAdd: (expense: Expense) => void;
}

const ExpenseAdd = ({ handledAdd }: ExpenseItemAdd) => {
    // Déplacer useForm À L'INTÉRIEUR du composant
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            pay: 'Alice',
            date: new Date().toISOString().split('T')[0],
            description: '',
            amount: ''
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const host = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    // Utiliser la fonction handleSubmit de react-hook-form
    interface ExpenseFormData {
        pay: string;
        date: string;
        description: string;
        amount: string;
    }
    
    const onSubmit = async (data: ExpenseFormData) => {
        setIsSubmitting(true);
        
        try {
            const expense = {
                payer: data.pay,
                date: data.date,
                description: data.description,
                amount: parseFloat(data.amount)
            };

            const response = await fetch(`${host}/api/expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expense)
            });

            if (response.ok) {
                const createdExpense = await response.json();
                handledAdd(createdExpense);
                reset(); // Reset du formulaire avec react-hook-form
            } else {
                console.error('Failed to create expense', await response.text());
            }
        } catch (error) {
            console.error('Error creating expense:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>Add New Expense</h3>
            
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="pay" style={{ display: 'block', marginBottom: '5px' }}>Payer:</label>
                <select
                    {...register("pay", { required: "Payer is required" })}
                    style={{ width: '100%', padding: '5px' }}
                >
                    <option value="Alice">Alice</option>
                    <option value="Bob">Bob</option>
                </select>
                {errors.pay && <span style={{ color: 'red' }}>{errors.pay.message}</span>}
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="date" style={{ display: 'block', marginBottom: '5px' }}>Date:</label>
                <input
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    style={{ width: '100%', padding: '5px' }}
                />
                {errors.date && <span style={{ color: 'red' }}>{errors.date.message}</span>}
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
                <input
                    type="text"
                    {...register("description", { required: "Description is required" })}
                    placeholder="Enter expense description"
                    style={{ width: '100%', padding: '5px' }}
                />
                {errors.description && <span style={{ color: 'red' }}>{errors.description.message}</span>}
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="amount" style={{ display: 'block', marginBottom: '5px' }}>Amount:</label>
                <input
                    type="number"
                    {...register("amount", { 
                        required: "Amount is required",
                        min: { value: 0.01, message: "Amount must be greater than 0" }
                    })}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    style={{ width: '100%', padding: '5px' }}
                />
                {errors.amount && <span style={{ color: 'red' }}>{errors.amount.message}</span>}
            </div>

            <button 
                type="submit" 
                disabled={isSubmitting}
                style={{ 
                    padding: '10px 20px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '3px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
            >
                {isSubmitting ? 'Adding...' : 'Add Expense'}
            </button>
        </form>
    );
};

export default ExpenseAdd;