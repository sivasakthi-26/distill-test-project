// Logo component
import React from 'react';
import LogoSvg from '../../images/logo.svg';

const LogoViewer = () => {
  return (
    <div className="app__logo">
      <img src={LogoSvg} alt="logo" className="app__logo-img" />
      <div className="app__logo-text">Distill</div>
    </div>
    
  )
}

export default LogoViewer;