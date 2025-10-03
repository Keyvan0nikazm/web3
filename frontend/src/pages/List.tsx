import { useContext } from 'react';
import { PageContext } from '../App';

const List = () => {
  const { setCurrentPage } = useContext(PageContext);
  
  return (
    <div className="list-page">
      <h1>Liste des Dépenses</h1>
      <p>Ici vous verrez la liste de toutes vos dépenses.</p>
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setCurrentPage('Welcome')}>Accueil</button>
        <button onClick={() => setCurrentPage('Add')}>Ajouter une dépense</button>
        <button onClick={() => setCurrentPage('Home')}>Page d'accueil</button>
      </div>
    </div>
  );
};

export default List;
