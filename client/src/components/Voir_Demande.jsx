import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import './Voir_Demande.css';

const Voir_Demande = () => {
  const { id } = useParams();
  const [myuser, setMyUser] = useState([]);
  const [userDemande, SetuserDemande] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [solde, setSolde] = useState(30);
  const [Motif, setMotif] = useState("");
  const [DateD, setDateD] = useState(new Date());
  const [DateFt, setDateFt] = useState(new Date());
  const [Numero, setNumero] = useState(0);
  const [newID, setnewID] = useState(id);
  const [typeDemande, setTypeDemande] = useState("conge");
  const [errors, setErrors] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/Data/${id}`)
      .then((res) => {
        setMyUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:5000/Demande`)
      .then((res) => {
        SetuserDemande(res.data);
        const filtered = res.data.filter((item) => item.ID === newID);
        if (filtered.length > 0) {
          setDateD(new Date(filtered[0].DateD));
          setDateFt(new Date(filtered[0].DateFt));
          setSolde(filtered[0].solde);
          setNumero(filtered[0].Numero);
          setMotif(filtered[0].Motif);
          setTypeDemande(filtered[0].typeDemande);
        }
      })
      .catch((err) => {
        const errorResponse = err.response.data.errors;
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
        const filtered = res.data.filter((item) => item.post.toUpperCase() ==="RH");
        if (filtered.length > 0) {
          const newID = filtered[0]._id;
          nav(`/validation/${newID}`);
        }
      });
  };

  return (
    <div className="demande-wrapper">
      {errors.map((err, index) => <p className="error-msg" key={index}>{err}</p>)}
      <div className="page-header">
        <p>Nom de salarié : {myuser.name}</p>
        <button onClick={Back} className="back-link">Revenir</button>
        <Link to="/" className="home-button">Accueil</Link>
      </div>
      
      <div className="details-box">
        <div className="input-group">
          <label>Post :</label>
          <p>{myuser.post}</p>
        </div>

        <div className="input-group">
          <label>Solde de congé :</label>
          <p>{solde}</p>
        </div>

        <div className="input-group">
          <label>Type :</label>
          <select 
            className="form-select" 
            id={id} 
            value={typeDemande} 
            onChange={(e) => setTypeDemande(e.target.value)} 
            disabled
          >
            <option value="conge">Congé</option>
            <option value="autorisation">Autorisation</option>
          </select>
        </div>

        {typeDemande !== "autorisation" ? (
          <>
            <div className="input-group">
              <label>De :</label>
              <DatePicker
                selected={DateD}
                className="form-datepicker"
                disabled
              />
            </div>

            <div className="input-group">
              <label>A :</label>
              <DatePicker
                selected={DateFt}
                className="form-datepicker"
                disabled
              />
            </div>
          </>
        ) : (
          <div className="input-group">
            <label>Numéro de Heure :</label>
            <div className="number-group">
              <button className="number-btn" disabled>-</button>
              <input type="text" className="form-input" value={Numero} disabled />
              <button className="number-btn" disabled>+</button>
            </div>
          </div>
        )}

        <div className="input-group">
          <label>Motif :</label>
          <textarea className="form-textarea" value={Motif} disabled />
        </div>
      </div>
    </div>
  );
}

export default Voir_Demande;