import { useContext } from 'react';
import { PageContext } from '../App';

const Welcome = () => {
  const { setCurrentPage } = useContext(PageContext);
  
  return (
    <div className="welcome-page">
      <h1>Bienvenue dans l'application de gestion des dépenses</h1>
      <p>Cette application vous permet de suivre et gérer vos dépenses personnelles.</p>
      <p>Utilisez la navigation pour accéder aux différentes fonctionnalités.</p>
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setCurrentPage("List")}>View Expense List</button>
        <button onClick={() => setCurrentPage("Add")}>Add New Expense</button>
        <button onClick={() => setCurrentPage('Home')}>Page d'accueil</button>
      </div>
    </div>
  );
};

export default Welcome;
