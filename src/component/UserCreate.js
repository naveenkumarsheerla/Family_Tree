import React from "react";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import"../component/UserCreate.css"

export const UserCreate = ()=>{
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        middle_name: '',
        date_of_birth: '',
        gender: '',
        alive: true,
        mobile_no: Number(0),
        
        

    })
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();


        fetch("http://localhost:8000/postuser", {
            method: "POST",
            // mode: 'no-cors',
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => (response.json()))
            .then((data) => {

                setFormData(data)
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 2000)
                window.location.reload();
            })
       
            .catch((error) => console.log(error));

        // console.log((formData.mobile_no))
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === "checkbox" ? checked : value;
        setFormData({ ...formData, [name]: fieldValue });
    };

    return(
        <>
         <h4>Add Person</h4>
            <div className="container">   
           
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <label>First Name:</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="First Name"
                            />
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <label>Middle Name</label>
                            <input
                                type="text"
                                name="middle_name"
                                value={formData.middle_name}
                                onChange={handleChange}
                                placeholder="Last Name"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Last Name</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Last Name"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Date of birth</label>&nbsp;&nbsp;
                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                placeholder="Date of Birth"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Alive</label>&nbsp;&nbsp;
                            <input
                                type="checkbox"
                                name="alive"
                                checked={formData.alive}
                                onChange={handleChange}
                            />
                        </Col>

                    </Row>
                    {/* <Row>
                    <input
                        type="date"
                        name="date_of_demise"
                        value={formData.date_of_demise}
                        onChange={handleChange}
                        placeholder="date_of_demise"

                    />
                </Row> */}
                    <Row>
                        <Col >
                            <label>Gender</label>
                            <select
                                className="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Mobile No</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <input
                                type="number"
                                name="mobile_no"
                                value={formData.mobile_no}
                                onChange={handleChange}
                                placeholder="Mobile Number"
                            />
                        </Col>
                    </Row>
                    <Row style={{ margin: '2em' }}>
                        <Button type="submit" className="button" >Submit</Button>
                    </Row>
                </form>
                <div className="showcontent">
                {showSuccessMessage && (
                    <div className="success-message">Successfully updated!</div>
                )}
                </div>
               
            </div>
        
        </>
    )
}