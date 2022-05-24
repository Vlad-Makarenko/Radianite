import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import {Navbar} from './components/Navbar'
import {useRoutes} from './routes'
import 'materialize-css'
import './styles/App.css'
import './styles/Card.css'

function App() {

  const isAuthenticated = true;
  const routes = useRoutes(isAuthenticated);

  // if(!ready){
  //   return <Loader />;
  // }

  return (
    <Router>
      {isAuthenticated && <Navbar/>}
        <div className='App'>
          {routes}
        </div>
    </Router>
    
  )
}

export default App;
