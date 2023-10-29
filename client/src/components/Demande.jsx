import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Demande = () => {
  const { id } = useParams();
  const [myuser, setMyUser] = useState([]);
  const [userDemande,SetuserDemande]=useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [valid, setValid] = useState(false);
  const [solde, setSolde] = useState(30);
  const [Motif, setMotif] = useState("");
  const [DateD, setDateD] = useState(new Date());
  const [DateFt, setDateFt] = useState(new Date());
  const [value, setValue] = useState(0);
  const [Numero, setNumero] = useState(0);
  const [newID, setnewID] = useState(id);
  const [errors, setErrors] = useState([])
  const nav = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:5000/Data/${id}`)
      .then((res) => {
        console.log(res.data);
        setMyUser(res.data);
        setName(res.data.name);
        setPost(res.data.post);
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
  }, [id]);

  useEffect(() => {
      axios.get(`http://localhost:5000/Demande`)
    .then((res) => {
      console.log(res.data)
        SetuserDemande(res.data);
        const filtered = res.data.filter((item) => {
            return (item.ID===newID) 
          });
          setFilteredData(filtered)
          if (filtered.length > 0) {
           
            setSolde(filtered[0].solde)
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
  }, [id]);

  const handleIncrement = () => {
    if (value < solde) {
      setValue(value + 1);
      setSolde(solde - 1);
      setNumero(value+1);
    }
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(value - 1);
      setSolde(solde + 1);
      setNumero(value-1);
    }
  };

  const add = () => {
    const sendObj = {
      solde,
      DateD,
      DateFt,
      Numero,
      Motif,
      ID:newID,
    };
    axios.post("http://localhost:5000/demande",sendObj)
      .then((res) => {
        console.log(res.data);
        console.log(valid);
        nav(`/validation/${myuser._id}`);
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
  };

  const valide = () => {
    if (post.toUpperCase() === 'RH') {
      nav(`/validation/${myuser._id}`);
    }
  };
  return (
    <div>
      {errors.map((err, index) => <p key={index}>{err}</p>)}
      <p>Nom de salarié : {myuser.name}</p>
      <Link to="/">Accueil</Link>
      <p>Post : {myuser.post}</p>
      <p>Solde de conge : {solde}</p>
      <select id={id}>
        <option value="conge">conge</option>
        <option value="autorisation">autorisation</option>
      </select>
      <p>De :</p>
      <DatePicker
        showIcon
        selected={DateD}
        onChange={(date) => setDateD(date)}
      />
      <p>A :</p>
      <DatePicker
        showIcon
        selected={DateFt}
        onChange={(date) => {
          setDateFt(date);
        }}
      />
      <br />
      <p>Numéro de Jour/Heure : </p>
      <button onClick={handleDecrement}>-</button>
      <input type="text" value={value} readOnly />
      <button onClick={handleIncrement}>+</button>
      <p>Motif :</p> <textarea name="" id="" cols="30" rows="10" onChange={(e) => { setMotif(e.target.value) }}></textarea>
      <button onClick={add}>Ajouter</button>
      <button onClick={valide}>Validation</button>
    </div>
  );
};
export default Demande;
