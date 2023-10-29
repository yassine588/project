import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
const Voir_Demande = () => {
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
      .catch((err) => {
        console.log(err);
      })
  }, [id]);
  useEffect(() => {
    axios.get(`http://localhost:5000/Demande`)
      .then((res) => {
        SetuserDemande(res.data);
        const filtered = res.data.filter((item) => {
          return item.ID === newID;
        });
        console.log(filtered);
        setFilteredData(filtered);
        if (filtered.length > 0) {
          setDateD(new Date(filtered[0].DateD));
          setDateFt(new Date(filtered[0].DateFt));
          setSolde(filtered[0].solde);
          setNumero(filtered[0].Numero);
          setMotif(filtered[0].Motif);
        }
      })
      .catch(err => {
        const errorResponse = err.response.data.errors;
        console.log(errorResponse);
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message);
        }
        setErrors(errorArr);
      });
  }, [id]);
  const Back = () => {
    axios.get(`http://localhost:5000/Data`)
      .then((res) => {
        console.log(res.data)
        const filtered = res.data.filter((item) => {
          return item.post.toUpperCase() === 'RH'
        });
        console.log(filtered)
        if (filtered.length > 0) {
            console.log(filtered[0]._id)
          const newID= filtered[0]._id
          console.log(newID)
          nav(`/validation/${newID}`);
        }
  })}
  return (
    <div>
     {errors.map((err, index) => <p key={index}>{err}</p>)}
      <p>Nom de salarié : {myuser.name}</p>
      <button onClick={Back} style={{background: 'none',border: 'none',marginRight:'40px'}}><Link>Revenir</Link></button>
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
      />
      <p>A :</p>
      <DatePicker
        showIcon
        selected={DateFt}
      />
      <br />
      <p>Numéro de Jour/Heure : </p>
      <button >-</button>
      <input type="text" value={Numero} readOnly />
      <button >+</button>
      <p>Motif :</p> <textarea name="" id="" cols="30" rows="10" value={Motif}></textarea>
    </div>
  );
}
export default Voir_Demande