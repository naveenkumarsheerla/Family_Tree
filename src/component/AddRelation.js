// 
import React, { useState } from "react";
import "../component/AddRelation.css"
import { Button } from "react-bootstrap";

export const AddRelation = () => {
  const [param1, setParam1] = useState("");
  const [param2, setParam2] = useState("");
  const [data, setData] = useState([]);
  const [all, setAll] = useState([])
  const [relation, setRelation] = useState([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleParam1Change = (e) => {
    setParam1(e.target.value);
  };

  const handleParam2Change = (e) => {
    setParam2(e.target.value);
  };

  const handleSearch = () => {
    const url = `http://localhost:8000/search?first_name=${param1}&last_name=${param2}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);

      })
      .catch((error) => {
        console.error(error);
      });


    fetch('http://localhost:8000/users')
      .then((res) => res.json())
      .then((data) => {
        setAll(data)

      }).catch((error) => {
        console.log(error)
      })
  };

  // const handleParentIdChange1 = (e) => {
  //   const parentId = parseInt(e.target.value);
  //   setData({
  //     ...data,parent_id:[parentId]
  //   })
  // };
  // const handleParentIdChange2 = (e) => {
  //   const parentId = parseInt(e.target.value);
  //   setData({
  //     ...data,parent_id:[parentId]
  //   })
  // };

  const handleFormSubmit = (e) => {


    e.preventDefault();

    let fid = document.getElementById("ddFather").value.toString();
    let mid = document.getElementById("ddMother").value.toString();

    data.parent_id = [fid, mid];
    setData({
      ...data
    })

    const url = `http://localhost:8000/update/${data.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setRelation(data)
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 2000)
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
    // console.log(relation)
  };

  return (
    <>
      <div className="content">
        <h4>Add Relation</h4>
        <div className="searchcontent">

          <input
            type="text"
            value={param1}
            onChange={handleParam1Change}
            placeholder="FirstName"
          />
          <input
            type="text"
            value={param2}
            onChange={handleParam2Change}
            placeholder="LastName"
          />
          <Button onClick={handleSearch} variant="primary">
            Search
          </Button>
        </div>

        <div>
          <form onSubmit={handleFormSubmit}>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Select Father</th>
                  <th>Select Mother</th>
                </tr>
              </thead>
              <tbody >
                <tr>
                  <td>{data.id}</td>
                  <td>{data.first_name}</td>
                  <td>{data.last_name}</td>
                  <td >
                    {/* <select id="ddFather" onChange={handleParentIdChange1}> */}
                    <select id="ddFather" mode="multiple">
                      <option value="">Select Father </option>
                      {all.map((person) => (
                        <option value={person.id} key={person.id}>{person.first_name} {person.last_name}</option>
                      ))}
                    </select>
                  </td>
                  <td >
                    {/* <select id="ddMother" onChange={handleParentIdChange2}> */}

                    <select id="ddMother">
                      <option value="">Select Mother</option>
                      {all.map((person) => (
                        <option value={person.id} key={person.id}>{person.first_name} {person.last_name}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <Button type="submit" className="button">
              Submit
            </Button>
          </form>

          <div className="updatemsg" >
            {showSuccessMessage && (
              <div className="success-message">Successfully updated!</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}