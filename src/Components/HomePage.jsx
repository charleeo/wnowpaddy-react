import React from 'react';
// import { Link } from 'react-router-dom';
import useDocumentTitle from '../CustomHooks/useDocumentTitle';
import undraw1 from '../assets/background_images/undraw1.png'
import undraw2 from '../assets/background_images/undraw2.png'
import undraw3 from '../assets/background_images/undraw3.png'
const  HomePage=()=>{
  useDocumentTitle('Your Snow Paddy: Home page')
  
  return ( 
    <>
    <main>    
        <section className="hero-header">
            <div className="home-page-text">
                <h1>
                snow paddy
                </h1>
                <p className='main-text'>
                you don't have to weather the stormy and the snowing business weather all alone. count on us to weather it for you
                </p>
            </div>
        </section>
    </main>
   
    <section className="main-card-section">
      <div className="row justify-content-center">
        <div className="col col-sm-6 p-4">
          <p>
            All what you will need to overcome challenging situations are provided for you on gold plater
          </p>

        </div>
      </div>
      <div className="card-section"> 
        <div className="card-1">
            <img src={undraw1} alt="card 1"/>
        </div>
        <div className="card-1">
            <img src={undraw2} alt="card 1"/>
        </div>

        <div className="card-1">
            <img src={undraw3} alt="card 1"/>
        </div>
      </div>
    </section>
  </>
  )
}
export default HomePage;