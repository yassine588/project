import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Validation.css';

const Validation = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [post, setPost] = useState('');
  const [errors, setErrors] = useState([]);
  const [demandes, setDemandes] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [demandeRes, dataRes] = await Promise.all([
          axios.get('http://localhost:5000/Demande'),
          axios.get('http://localhost:5000/Data')
        ]);

        const demandesData = demandeRes.data;
        const employeesData = dataRes.data;

        setDemandes(demandesData);

        const filteredEmployees = employeesData.filter(employee =>
          demandesData.some(demande => demande.ID === employee._id)
        );

        setData(filteredEmployees);

        const userRes = await axios.get(`http://localhost:5000/Data/${id}`);
        setPost(userRes.data.post);
      } catch (err) {
        setErrors([err.message || 'An error occurred']);
      }
    };
    fetchData();
  }, [id]);

  const handleButtonClick = async (index) => {
    if (post.toUpperCase() === "RH") {
      const currentEmployee = data[index];
      const currentDemande = demandes.find(demande => demande.ID === currentEmployee._id);

      if (!currentDemande) {
        setErrors(['Demande not found']);
        return;
      }

      const updatedSolde = currentDemande.solde - currentDemande.Numero;

      if (updatedSolde < 0) {
        setErrors(['Insufficient leave balance']);
        return;
      }

      try {
        const sendObj = {
          ...currentDemande,
          solde: updatedSolde,
        };
        const newEmployee = {
          ...currentEmployee,
          valid: true,
        };

        await axios.put(`http://localhost:5000/Demande/${currentDemande._id}`, sendObj);
        await axios.put(`http://localhost:5000/Data/${currentEmployee._id}`, newEmployee);

        setData(prevData => {
          const newData = [...prevData];
          newData[index] = { ...newData[index], valid: true };
          return newData;
        });
      } catch (err) {
        const errorResponse = err.response?.data?.errors || {};
        const errorArr = Object.values(errorResponse).map(e => e.message);
        setErrors(errorArr);
      }
    }
  };

  const handleDemandeClick = (index) => {
    if (post.toUpperCase() === "RH") {
      const employeeId = data[index]._id;
      nav(`/SeeDemande/${employeeId}`);
    }
  };

  return (
    <div className="validation-container">
      {errors.length > 0 && (
        errors.map((err, index) => <p key={index} className="error-message">{err}</p>)
      )}

      <Link to="/" className="validation-link">Accueil</Link>

      <table className="validation-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Post</th>
            <th>Solde de Congé</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.post}</td>
              <td>{demandes.find(demande => demande.ID === item._id)?.solde || 0}</td>
              <td>
                <button 
                  className="validation-button" 
                  onClick={() => handleButtonClick(index)}
                >
                  {(item.valid) ? 'Valide' : 'Invalide'} 
                </button>
                <button 
                  className="validation-button" 
                  onClick={() => handleDemandeClick(index)}
                >
                  Voir Demande
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Validation;