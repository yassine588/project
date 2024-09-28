import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Inscription.css';

const Inscription = () => {
  const [name, Setname] = useState("");
  const [Email, SetEmail] = useState("");
  const [post, Setpost] = useState("");
  const [Passe, SetPasse] = useState("");
  const nav = useNavigate();

  const AddEmployer = (e) => {
    e.preventDefault();
    const sendobj = { name, Email, post, Passe };
    axios.post("http://localhost:5000/Data", sendobj)
      .then((res) => {
        Setname("");
        SetEmail("");
        Setpost("");
        SetPasse("");
        nav("/");
      })
      .catch(err => { console.log("wait a minute") });
  }

  return (
    <div className="inscription-container">
      <form onSubmit={AddEmployer} className="inscription-form">
        <h1 className="inscription-header">Inscription</h1>
        <Link to='/' style={{color:'whitesmoke'}}>Accueil</Link> <br />
        <input 
          type="text" 
          placeholder='Nom' 
          value={name}
          onChange={(e) => { Setname(e.target.value) }} 
          className="inscription-input"
        /> 
        <br />
        <input 
          type="text" 
          placeholder='Email' 
          value={Email}
          onChange={(e) => { SetEmail(e.target.value) }} 
          className="inscription-input"
        />  
        <br />
        <input 
          type="text" 
          placeholder='Post' 
          value={post}
          onChange={(e) => { Setpost(e.target.value) }} 
          className="inscription-input"
        /> 
        <br />
        <input 
          type="password" 
          placeholder='Mot De Passe' 
          value={Passe}
          onChange={(e) => { SetPasse(e.target.value) }} 
          className="inscription-input"
        /> 
        <br />
        <button type="submit" className="inscription-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Inscription;