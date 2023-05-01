import React from "react";

export const Tree = () => {
    const data = [
        {
            "parent": {
                "id": 5,
                "first_name": "father",
                "gender": "male"
            }
        },
        {
            "parent": {
                "id": 6,
                "first_name": "mother",
                "gender": "female"
            }
        },
        {
            "user": {
                "last_name": "test",
                "first_name": "me",
                "gender": "male",
                "alive": true,
                "mobile_no": 12345,
                "middle_name": "",
                "id": 4,
                "date_of_birth": "2023-04-28",
                "parent": [
                    5,
                    6
                ]
            }
        }
    ]

    const father = data.find((item) => item.parent.gender === 'male')
    const mother = data.find((item) => item.parent.gender === 'female')
    const user = data.find((item) => item.user)


    return (
        <>
            <h4>FatherName {father.parent.first_name} </h4>
            <h4> MotherName    {mother.parent.first_name}</h4>
            <h4> UserName: {user.user.first_name}</h4>
            <h6>{user.user.parent.map((parentId) => {
                const parent = data.find((item) => item.parent.id === parentId)
                // console.log(parent)
                if(parent.parent.gender==='male'){
                   var gf = parent
                //    console.log(gf)
                }else{
                    const gm = parent
                }
                return (
                    
                    <ul key={parentId}>
                        <div>
                            <h4>father</h4>
                        {gf?.parent?.first_name}
                        </div>
                    </ul>
                );
            })}</h6>
        </>
    )
}