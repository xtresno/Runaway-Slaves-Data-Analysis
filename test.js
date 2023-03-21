import fetch from 'node-fetch';

async function fetchData() {
    const url = 'https://digital.sfasu.edu/digital/api/collections/RSP/items/555/false';
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'If-None-Match': '"0a10701fb748b3d03ed199c5b4ae7748b--gzip"'
      }
    };
    
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchData();
