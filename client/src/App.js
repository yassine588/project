import './App.css';
import Accueil from './components/Accueil';
import {Routes,Route} from 'react-router-dom'
import Demande from './components/Demande';
import Validation from './components/Validation';
import Inscription from './components/Inscription';
import Voir_Demande from './components/Voir_Demande';
function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Accueil/>}/>
      <Route path='/Demande/:id'  element={<Demande />}/>
      <Route path='/Validation/:id' element={< Validation/>}/>
      <Route path='/Inscription' element={<Inscription/>}/>
      <Route path='/SeeDemande/:id' element={<Voir_Demande/>}/>
     </Routes>
    </div>
  );
}

export default App;
