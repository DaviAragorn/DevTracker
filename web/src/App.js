import React, {useState, useEffect } from 'react';
import api from './services/api'

import './global.css';
import './App.css';
import './main.css';

import DevForm from './components/DevForm'
import DevItem from './components/DevItem'

function App() {
  const [devs, setDevs] = useState([])

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs')

      setDevs(response.data)
    }

    loadDevs()
  })

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)

    if(response.data){
      setDevs([...devs, response.data])
    }
  }

  return (
    <div>
      <img src="https://github.com/Takimiro/DevTracker/blob/master/logoname.png?raw=true" id='logo' alt='DevTracker'></img>
      <div id="app">
        <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev}/>
        </aside>
        <main>
          <ul>
            {devs.map(dev => (
              <DevItem key={dev._id} dev={dev} />
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default App;
