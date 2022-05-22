import React from 'react'
// import { CardList } from './components/CardList';
import { Battle } from './pages/Battle';
import './styles/App.css'
import './styles/Card.css'
import {BrowserRouter as Router} from 'react-router-dom';
import 'materialize-css'
import {Navbar} from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar/>
        <div className='App'>
          <Battle />
        </div>
    </Router>
    
  )
}

export default App;
