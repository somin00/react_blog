import React from 'react';
import Header from '../../components/Header';


const Home = ({children}) => {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}

export default Home;