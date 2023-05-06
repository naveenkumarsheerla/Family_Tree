import React, { useState, useEffect, useRef } from "react";
import f3 from "family-chart";
import "../component/Tree.css"

export const Tree = () => {
    // const [param1, setParam1] = useState("");
    const [familyTree, setFamilyTree] = useState([])
    const cont = useRef();

    // const handleParam1Change = (e) => {
    //     setParam1(e.target.value);
    // };

    // const userId = Number(param1)

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userid = document.getElementById("txtUserId").value;
        console.log(userid)

        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:8000/family-tree/${userid}`)
                const data = await res.json();
                fnDraw(data);
            } catch (error) {
                console.log(error)

            }
        }
        fetchData()

    }

    function fnDraw(familyTree) {
        if (!cont.current ) return;
        console.log("in fnDraw = " + familyTree);
        const store = f3.createStore({
            // data: data(),
            data: familyTree,
            node_separation: 240,
            level_separation: 150
        }),
            view = f3.d3AnimationView({
                store,
                cont: document.querySelector("#FamilyChart")
            }),
            Card = f3.elements.Card({
                store,
                svg: view.svg,
                card_dim: { w: 220, h: 70, text_x: 75, text_y: 15, img_w: 60, img_h: 60, img_x: 5, img_y: 5 },
                card_display: [d => `${d.data['first name'] || ''} ${d.data['middle name'] || ''} ${d.data['last name'] || ''}`, d => `${d.data['date of birth'] || ''}  ${d.data['gender'] || ''} ${d.data['alive'] || ''} `, d => `${d.data['mobile no'] || ''}`],
                mini_tree: true,
                link_break: false
            })

        view.setCard(Card)
        store.setOnUpdate(props => view.update(props || {}))
        store.update.tree({ initial: true })
    
        // function data() {
        //     return familyTree
        // }
    }

    // useEffect(() => {
    //     if (!cont.current || !familyTree.length) return;

    //     const store = f3.createStore({
    //         data: data(),
    //         node_separation: 250,
    //         level_separation: 150
    //     }),
    //         view = f3.d3AnimationView({
    //             store,
    //             cont: document.querySelector("#FamilyChart")
    //         }),
    //         Card = f3.elements.Card({
    //             store,
    //             svg: view.svg,
    //             card_dim: { w: 220, h: 70, text_x: 75, text_y: 15, img_w: 60, img_h: 60, img_x: 5, img_y: 5 },
    //             card_display: [d => `${d.data['first name'] || ''} ${d.data['middle name'] || ''} ${d.data['last name'] || ''}`, d => `${d.data['date of birth'] || ''}  ${d.data['gender'] || ''} ${d.data['alive'] || ''} `, d => `${d.data['mobile no'] || ''}`],
    //             mini_tree: true,
    //             link_break: false
    //         })

    //     view.setCard(Card)
    //     store.setOnUpdate(props => view.update(props || {}))
    //     store.update.tree({ initial: true })
    //     function data() {
    //         return familyTree
    //     }

    // }, [familyTree])

    return (
        <>
            <div className="container-fluid">
                <h3>Family Tree</h3>
                <form onSubmit={handleSubmit}>
                    <input id="txtUserId" type="text"
                        placeholder="userid"
                    />
                    &nbsp; &nbsp;
                    <button type="submit" className="btn btn-primary">Fetch Data</button>
                </form>
                <div className="f3" id="FamilyChart" ref={cont} style={{height:'100vh',width:'120vw' ,marginLeft:'-5rem',marginTop:"0.5rem"}}></div>
            </div>

            


        </>
    )



}
