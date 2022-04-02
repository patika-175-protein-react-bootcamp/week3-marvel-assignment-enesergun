import {useState, useEffect} from 'react'

import './App.css';

import image1 from './assests/image1.png'
import image2 from './assests/image2.png'

import axios from 'axios'

// https://gateway.marvel.com/v1/public/characters?ts=1&apikey=89c5bb6f000ff89c6b3bfd1804a55184&hash=d8e15a485cc807f99e27672c604d81c5&limit=100&offset=0

function App() {

  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState()

  
  useEffect(() => {
    getData(currentPage);
  }, [currentPage])
  
const handlePrevButton = () => {
  if (offset >= 20){
    setOffset(offset - 20);
    setCurrentPage(currentPage - 1); 
    console.log("öncede");
  }
}

const handleNextButton = () => {
  setOffset(offset + 20);
  setCurrentPage(currentPage + 1);
  console.log("sonrada");
}

const handleChangePage = (page) => {
  setOffset((page - 1) * 20);
  setCurrentPage(page);
}


const getPaginationGroup = () => {
  let start = ((currentPage - 1) / 5) * 5;
  
  
  /* if (currentPage === 1) {
    return `${currentPage}`
  } */


  let arr = new Array(3).fill().map((_, index) => {
    if (start === 78) {
      return "" 
    } 
    return start + index + 1


  });

  console.log(arr);
  
  if (start >= 4 && start < 73) {
    console.log("sayfa", start, "-2", start - 2, "-1", start - 1);
    return [1, "...", start - 1, start, ...arr, "...", pageCount]
  } else if (start >= 73 && start <= 78) {
    console.log("sayfa", start);
    return [1, "...", pageCount- 5, pageCount- 4, pageCount-3, pageCount-2, pageCount-1, pageCount]
/*     return [1, "...", ...arr, "...", pageCount] */
  } else {
    console.log("sayfa", start);
    return [...arr, "...", pageCount]
  }
};


console.log(pageCount);

// request to marvel.api
  const getData = (currentPage) => {
    const characters = JSON.parse(localStorage.getItem(currentPage));

    if (characters) {
      setList(characters);
    } else {
      axios.get(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=89c5bb6f000ff89c6b3bfd1804a55184&hash=d8e15a485cc807f99e27672c604d81c5&offset=${offset}`)
    .then(function (response) {
      // handle success
      localStorage.setItem(currentPage, JSON.stringify(response.data.data.results));
      setList(response.data.data.results);
      setPageCount(response.data.data.total / 20);

  })
    .catch(function (error) {
      // handle error
      console.log(error);
  })
    .then(function () {
    // always executed
  });
  }
}


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
            <div onClick={handlePrevButton} className="previous-page">
                {"<"}
            </div>
            <div className="pages">
              {
              //onClick={(e) => handleChangePage(e.target.textContent) 
              }

              { 
                getPaginationGroup().map((page, index) => (
                  <div key={index} className="page-number">
                    <p onClick={(e) => handleChangePage(e.target.textContent)}>{page}</p>
                  </div>
                ))
                
              }
              
                {/* <div className="points">...</div> */}
                {/* <div className="last">200</div> */}
                
            </div>            
            <div onClick={handleNextButton} className="next-page">
                {">"}
            </div>
        </div>
    </div>
  );
}

export default App;
