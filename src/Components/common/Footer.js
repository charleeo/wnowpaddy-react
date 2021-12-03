import React from  'react';

const Footer=()=>{
  return(
    <>
    <div className='foot'>
    <div className="footer">
      <div className="links">
        <h2>Quick Links</h2>
         <ul>
           <li>Home</li>
           <li>About</li>
         </ul>
      </div>
      <div className="address">
         <h2>Location</h2>
         <address>NO 15, Odumbela Street, Selehu,Igbogbo, Ikorodu, Lagos</address>
      </div>
    </div>
      <footer>&copy; {new Date().getFullYear()}</footer>
    </div>
    </>
  )
}

export default Footer