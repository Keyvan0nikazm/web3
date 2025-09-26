const fs = require('fs');
const path = require('path');

const EXPENSES_FILE_PATH = path.join(__dirname, '../data/expenses.json');
const EXPENSES_INIT_FILE_PATH = path.join(__dirname, '../data/expenses.init.json');

function getAllExpenses() {
    const raw = fs.readFileSync(EXPENSES_FILE_PATH, 'utf8')
    return JSON.parse(raw)
};

function addExpenses(newExpense){
    const expenses = getAllExpenses();
    expenses.push(newExpense);

    const update = JSON.stringify(expenses, null, 2);
    fs.writeFileSync(EXPENSES_FILE_PATH, update);
    return newExpense;
}

function resetExpenses(){
    const initData = fs.readFileSync(EXPENSES_INIT_FILE_PATH, 'utf8');
    fs.writeFileSync(EXPENSES_FILE_PATH, initData);
    return JSON.parse(initData);
}

module.exports = {
    getAllExpenses,
    addExpenses,
    resetExpenses,
};