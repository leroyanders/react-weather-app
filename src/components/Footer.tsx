import React from 'react'
import Waves from './Waves';

function Footer() {
  return (
      <>
        <Waves/>
        <div className="creditionals">
            <div className="sm:container sm:mx-auto flex justify-between px-40">
            <span>
                Created by: <a href="https://github.com/leroywagner">Leroy Wagner</a>
            </span>
            <span>
                Data from: <a href="https://www.visualcrossing.com/weather-api">Visual Crossing Weather</a>
            </span>
            </div>
        </div>
      </>
  )
}

export default Footer;