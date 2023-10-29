import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Validation = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [post, setPost] = useState('');
  const [filteredDataID, setFilteredDataID] = useState("");
  const [errors, setErrors] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/Data`).then((res) => {
      setData(res.data);
    }).catch((err) => {
      console.log(err);
    });

    axios.get(`http://localhost:5000/Data/${id}`).then((res) => {
      setPost(res.data.post);
    }).catch((err) => {
      console.log(err);
    });
  }, [id]);

  const handleButtonClick = (index) => {
    if (post.toUpperCase() === 'RH') {
      const newData = [...data];
      newData[index].valid = !newData[index].valid;
      setData(newData);

      const sendObj = {
        name: newData[index].name,
        Email: newData[index].Email,
        post: newData[index].post,
        Passe: newData[index].Passe,
        valid: newData[index].valid,
      };

      axios.put(`http://localhost:5000/Data/${newData[index]._id}`, sendObj)
        .then(() => {
          console.log(data);
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
  };

  const Demande = (index) => {
    axios.get('http://localhost:5000/demande')
      .then((res) => {
        console.log(res.data)
        if (post.toUpperCase() === 'RH'){
        const filtered = res.data.filter((item) => {
          return item.ID === data[index]._id
        });
        console.log(filtered)
        if (filtered.length > 0) {
          const newID= filtered[0].ID
          console.log(newID)
          nav(`/SeeDemande/${newID}`);
        }
  }})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {errors.map((err, index) => <p key={index}>{err}</p>)}
      <Link to="/">Accueil</Link>
      <table>
        <thead>
          <tr>
            <th>Nom de salarié:</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <button onClick={() => handleButtonClick(index)}>
                  {item.valid ? 'Validé' : 'Non Validé'}
                </button>
              </td>
              <td>
                <button onClick={() => Demande(index)}>Voir Demande</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Validation;
