import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
function App() {

const[siteArr, setSiteArr] = useState([])
  useEffect(() => 
  {
    async function fetchSite()
    {
      const url = '/BoyleSites.json'
      //console.log("hi")
      const response = await fetch(url);
      //console.log(response.ok)
      if (response.ok)
         {
            const result = await response.json();
            console.log(result)
            setSiteArr(result)
         }


    }
    fetchSite();
    },[]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
