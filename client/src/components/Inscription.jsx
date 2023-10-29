import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Inscription = () => {
  const [name,Setname]=useState("")
  const [Email,SetEmail]=useState("")
  const [post,Setpost]=useState("")
  const [Passe,SetPasse]=useState("")
  const nav = useNavigate()
  const AddEmployer=(e)=>{
   e.preventDefault()
   const sendobj={
    name,
    Email,
    post,
    Passe
   }
   axios.post("http://localhost:5000/Data",sendobj)
   .then((res)=>{
    Setname("")
    SetEmail("")
    Setpost("")
    SetPasse("")
    nav("/")
   })
   .catch(err=>{console.log("wait a minute")})
  }
  return (
    <form onSubmit={AddEmployer}>
        <h1>Inscription</h1>
        <Link to='/'>Accueil</Link> <br />
        <input type="text" placeholder='Nom' onChange={(e)=>{Setname(e.target.value)}}/> <br />
        <input type="text" placeholder='Email' onChange={(e)=>{SetEmail(e.target.value)}}/>  <br />
        <input type="text" placeholder='Post' onChange={(e)=>{Setpost(e.target.value)}}/> <br />
        <input type="text" placeholder='Mot De passe' onChange={(e)=>{SetPasse(e.target.value)}}/> <br />
        <button style={{color:'white',backgroundColor:'blue',padding:'6px',margin:'8px',width:'130px'}}>Submit</button>
    </form>
  )
}

export default Inscription