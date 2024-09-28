import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Inscription from './Inscription'
import './Accueil.css';
const Accueil = () => {
 const [Login,SetLogin]=useState("")
 const  [MotDePasse,SetMotDePass]=useState("")
  const [errors, setErrors] = useState([]);
  const navigate=useNavigate()
  const [users,Setusers]=useState([])
  const [filteredData, setFilteredData] = useState({})
  const conexion =()=>{
    axios.get(`http://localhost:5000/Data`)
    .then((res) => {
        Setusers(res.data);
        const filtered = users.filter((item) => {
            return ( (item.name===Login) && (item.Passe===MotDePasse) ) 
          });
          setFilteredData(filtered)
          if (filtered.length > 0) {
            console.log(filtered[0]._id)
            navigate(`/Demande/${filtered[0]._id}`);
          }
      })
      .catch(err=>{
        const errorResponse = err.response.data.errors; 
        console.log(errorResponse)
        const errorArr = []; 
        for (const key of Object.keys(errorResponse)) { 
            errorArr.push(errorResponse[key].message)
        }
        setErrors(errorArr);
    })
  }
  return (
    <div className='accueil-container'>
      <div className='acceuil'>
        <h2 className='accueil-header'></h2>
        {errors.map((err, index) => <p key={index} style={{ color: 'red' }}>{err}</p>)}
        <h2 style={{color:'whitesmoke'}}>Saisie votre login et mot de passe pour connecter</h2>
        <div className='accueil-form'>
          <h3 style={{color:'whitesmoke'}}>LOGIN</h3>
          <input type="text" onChange={(e) => SetLogin(e.target.value)} />
          <h3 style={{color:'whitesmoke'}}>MOT DE PASSE</h3>
          <input type="password" onChange={(e) => SetMotDePass(e.target.value)} /> <br />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button onClick={conexion} style={{ backgroundColor: 'red', color: 'white', margin: '30px' }}>connexion</button>
            <p style={{ color: 'white' }}>ou</p>
            <Link to='/Inscription'><button style={{ margin: '30px' }}>inscription</button></Link>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Accueil;