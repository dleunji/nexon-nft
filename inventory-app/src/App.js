import './App.css';
import { Route } from 'react-router-dom';
import ItemListPage from './pages/ItemListPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <Route component={ItemListPage} path={['/@:userAddress','/']} exact />
      <Route component={LoginPage} path='/login' exact/>
    </>
  );
};

export default App;
