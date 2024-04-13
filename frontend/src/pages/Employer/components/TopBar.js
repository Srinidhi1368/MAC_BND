import React from 'react'
import layout from './RecruiterLayout.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faMicrophone } from "@fortawesome/free-solid-svg-icons";


export default function TopBar() {
  return (
    <div className={layout.__topbar}>
      <div className={layout.__searchbar}>
        <FontAwesomeIcon className={layout.__topbar_Icon} icon={faMagnifyingGlass} />
        <input className={layout.__input} type="text" placeholder='search by keyword......' />
        <FontAwesomeIcon className={layout.__topbar_Icon} icon={faMicrophone} />
      </div>
    </div>
  )
}
