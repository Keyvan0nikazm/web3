import { useContext } from 'react';
import { PageContext } from '../App';

const Add = () => {
  const { setCurrentPage } = useContext(PageContext);
  
  return (
    <div className="add-page">
      <h1>Ajouter une Dépense</h1>
      <p>Ici vous pourrez ajouter une nouvelle dépense.</p>
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setCurrentPage('Welcome')}>Accueil</button>
        <button onClick={() => setCurrentPage('List')}>Voir les dépenses</button>
        <button onClick={() => setCurrentPage('Home')}>Page d'accueil</button>
      </div>
    </div>
  );
};

export default Add;
