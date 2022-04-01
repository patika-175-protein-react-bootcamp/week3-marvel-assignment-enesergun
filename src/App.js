import {useState, useEffect} from 'react'

import './App.css';

import image1 from './assests/image1.png'
import image2 from './assests/image2.png'

import axios from 'axios'

function App() {

  const [list, setList] = useState([]);

  useEffect(() => {
    getData();
  }, [])
  



// request to marvel.api
  const getData = () => {
    axios.get('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=89c5bb6f000ff89c6b3bfd1804a55184&hash=d8e15a485cc807f99e27672c604d81c5')
    .then(function (response) {
      // handle success
      setList(response.data.data.results);
  })
    .catch(function (error) {
      // handle error
      console.log(error);
  })
    .then(function () {
    // always executed
  });
  }

  
console.log(list);


  return (
    <div className="main">
        <div className="header">
            <div className="header-background">
                <img className="header-background-img" src={image1} alt="" />                
            </div>
            <div className="header-logo">
                <img className="header-logo-img" src={image2} alt="" />
            </div>
        </div>
        <div className="container">
          {            
            list.length > 0 &&
            list?.map((item, index) => (
              
              <div key={index} className="character-rectangle">
                <div className="top-line"></div>
                <div className="character-image-wrap">
                  <img className='character-image' src={`${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}`} alt="" />
                </div>
                <div className="character-name">
                  <p>{item.name}</p>
              </div>
              </div>
            )) 
          }

        </div>
        <div className="pagination">
            <div className="previous-page">
                {"<"}
            </div>
            <div className="pages">
                <div className="first">1</div>
                <div className="points">...</div>
                <div className="previous-active">99</div>
                <div className="active-page">100</div>
                <div className="next-active">101</div>
                <div className="points">...</div>
                <div className="last">200</div>
            </div>
            <div className="next-page">
                {">"}
            </div>
        </div>
    </div>
  );
}

export default App;
