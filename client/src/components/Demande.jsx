import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Demande.css';

const Demande = () => {
  const { id } = useParams();
  const [newID, SetnewID] = useState();
  const [myuser, setMyUser] = useState({});
  const [userDemande, setUserDemande] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [solde, setSolde] = useState(30);
  const [motif, setMotif] = useState("");
  const [dateD, setDateD] = useState(new Date());
  const [dateFt, setDateFt] = useState(new Date());
  const [value, setValue] = useState(0);
  const [numero, setNumero] = useState(0);
  const [errors, setErrors] = useState([]);
  const [selectedOption, setSelectedOption] = useState("conge");
  const [successMessage, setSuccessMessage] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/Data/${id}`)
      .then((res) => {
        setMyUser(res.data);
        setName(res.data.name);
        setPost(res.data.post);
      })
      .catch((err) => {
        const errorResponse = err.response?.data?.errors || [];
        setErrors(Object.keys(errorResponse).map(key => errorResponse[key].message));
      });
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:5000/Demande`)
      .then((res) => {
        setUserDemande(res.data);
        const filtered = res.data.filter((item) => item.ID === id);
        setFilteredData(filtered);
        if (filtered.length > 0) {
          SetnewID(filtered[0]._id);
          setSolde(filtered[0].solde);
          console.log(solde);
        }
      })
      .catch((err) => {
        const errorResponse = err.response?.data?.errors || [];
        setErrors(Object.keys(errorResponse).map(key => errorResponse[key].message));
      });
  }, [id]);

  useEffect(() => {
    console.log("Updated newID:", newID);
  }, [newID]);

  const handleIncrement = () => {
    if (value < solde) {
      setValue(value + 1);
      setSolde(solde - 1);
      setNumero(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(value - 1);
      setSolde(solde + 1);
      setNumero(value - 1);
    }
  };

  const handleDateChange = (start, end) => {
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setNumero(diffDays);
    setValue(diffDays);
  };

  const add = () => {
    const sendObj = {
      solde,
      DateD: dateD,
      DateFt: dateFt,
      Numero: numero,
      Motif: motif,
      ID: id,
    };
    const newobj={
      ...myuser,
          valid:false,
    }

    axios.get(`http://localhost:5000/demande/${newID}`)
      .then((res) => {
        if (res.data) {
          axios.put(`http://localhost:5000/demande/${newID}`, sendObj)
            .then(() => {
              setSuccessMessage("Your Demande has been updated successfully!");
              setSolde(sendObj.solde);
              axios.put(`http://localhost:5000/Data/${id}`, newobj).then(()=>{
                console.log("valide return to false::");
              })
            })
            .catch((err) => {
              const errorResponse = err.response?.data?.errors || [];
              setErrors(Object.keys(errorResponse).map(key => errorResponse[key].message));
            });
        } else {
          axios.post("http://localhost:5000/demande", sendObj)
            .then(() => {
              setSuccessMessage("Your Demande has been added successfully!");
              setSolde(sendObj.solde);
            })
            .catch((err) => {
              const errorResponse = err.response?.data?.errors || [];
              setErrors(Object.keys(errorResponse).map(key => errorResponse[key].message));
            });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          axios.post("http://localhost:5000/demande", sendObj)
            .then(() => {
              setSuccessMessage("Your Demande has been added successfully!");
              setSolde(sendObj.solde);
            })
            .catch((err) => {
              const errorResponse = err.response?.data?.errors || [];
              setErrors(Object.keys(errorResponse).map(key => errorResponse[key].message));
            });
        } else {
          console.error(err);
        }
      });
  };

  const valide = () => {
    if (post.toUpperCase() === 'RH') {
      nav(`/validation/${myuser._id}`);
    }
  };

  return (
    <div className='demande-container'>
      {errors.map((err, index) => <p className='demande-errors' key={index}>{err}</p>)}
      <h2 className='demande-header' style={{ color: 'whitesmoke' }}>Demande de Congé </h2>
      <div className='demande-details'>
        <p>Nom de salarié : {myuser.name}</p>
        <Link to="/">Accueil</Link>
        <p>Post : {myuser.post}</p>
        <p>Solde de congé : {solde}</p>

        <select className='demande-select' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          <option value="conge">Congé</option>
          <option value="autorisation">Autorisation</option>
        </select>

        {selectedOption === "autorisation" ? (
          <>
            <p>Nombre d'Heure :</p>
            <button className='demande-button' onClick={handleDecrement}>-</button>
            <input className='demande-input' type="text" value={value} readOnly />
            <button className='demande-button' onClick={handleIncrement}>+</button>
          </>
        ) : (
          <>
            <div className="inputgroup">
              <p>De :</p>
              <DatePicker
                className='demande-date-picker'
                selected={dateD}
                onChange={(date) => {
                  setDateD(date);
                  handleDateChange(date, dateFt);
                }}
              />
              <p>A :</p>
              <DatePicker
                className='demande-date-picker'
                selected={dateFt}
                onChange={(date) => {
                  setDateFt(date);
                  handleDateChange(dateD, date);
                }}
              />
            </div>
          </>
        )}

        <p>Motif :</p>
        <textarea className='demande-textarea' onChange={(e) => setMotif(e.target.value)} cols="30" rows="5"></textarea>
        <button className='demande-button' onClick={add}>Ajouter</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {post.toUpperCase() === 'RH' && (
          <div onClick={valide} className="demande-floating-validation">✓</div>
        )}
      </div>
    </div>
  );
};

export default Demande;