const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function main() {
  // Créer plusieurs expenses
  const expenses = await prisma.expense.createMany({
    data: [
      {
        date: new Date('2024-01-15T10:00:00Z'), // ← Format DateTime
        description: 'Restaurant avec Alice',
        payer: 'Alice',
        amount: 45.50,
      },
      {
        date: new Date('2024-01-16T14:30:00Z'), // ← Format DateTime
        description: 'Courses partagées',
        payer: 'Bob',
        amount: 23.75,
      },
      {
        date: new Date('2024-01-17T08:15:00Z'), // ← Format DateTime
        description: 'Café du matin',
        payer: 'Alice',
        amount: 8.30,
      }
    ],
  });

  console.log('✅ Expenses créées:', expenses.count);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  });