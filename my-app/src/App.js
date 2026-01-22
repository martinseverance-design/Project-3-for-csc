import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.js';
function App(props) 
{

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
      <BrowserRouter>
        <Routes>
        <Route path = "/" element = {<HomePage/>} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
