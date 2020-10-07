import React from 'react';
import logo from '../assets/logo.svg';
import lock from "../assets/lock.svg";

export default function Nav() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <section id="profile">
        <p>My Profile</p>
        &nbsp;
        <img src={lock} alt="Lock"></img>
      </section>
    </header>
  )
}