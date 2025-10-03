const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function findMany() {
    const expense = await prisma.expense.findMany({
        orderBy: {
            date: 'desc'
        }
    })
    return expense;
    
};

async function create(newExpense){
    const expenses = await prisma.expense.create({
            data: {
                date: new Date(newExpense.date),
                description: newExpense.description,
                payer: newExpense.payer, // Note: ton schema utilise 'payer' mais ton frontend envoie 'pay'
                amount: parseFloat(newExpense.amount)
            }
        });
    return expenses;
}

async function resetExpenses(){
    await prisma.expense.deleteMany();
        
        // Recréer les expenses par défaut
        const defaultExpenses = await prisma.expense.createMany({
            data: [
                {
                    date: new Date('2024-01-15T10:00:00Z'),
                    description: 'Restaurant avec Alice',
                    payer: 'Alice',
                    amount: 45.50,
                },
                {
                    date: new Date('2024-01-16T14:30:00Z'),
                    description: 'Courses partagées',
                    payer: 'Bob',
                    amount: 23.75,
                }
            ]
        });
        
        // Retourner les nouvelles expenses
        return await getAllExpenses();
}

module.exports = {
    findMany,
    create,
    resetExpenses,
};