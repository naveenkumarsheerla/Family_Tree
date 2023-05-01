import React from "react";
import f3 from "family-chart"; 
import './family-chart.css'; 

export default class FamilyTree extends React.Component {
  cont = React.createRef();

  componentDidMount() {
    if (!this.cont.current) return;

    const store = f3.createStore({
      data: data(),
      node_separation: 250,
      level_separation: 150
    }),
      view = f3.d3AnimationView({
        store,
        cont: document.querySelector("#FamilyChart")
      }),
      Card = f3.elements.Card({
        store,
        svg: view.svg,
        card_dim: { w: 230, h: 85, text_x: 75, text_y: 20, img_w: 60, img_h: 60, img_x: 3, img_y: 3 },
        card_display: [d => `${d.data['first name'] || ''} ${d.data['middle name']||''} ${d.data['last name'] || ''}`, d => `${d.data['date of birth'] || ''}  ${d.data['gender']||''} ${d.data['alive']||''} `, d =>`${d.data['mobile no']||''}`],
        mini_tree: true,
        link_break: false
      })

    view.setCard(Card)
    store.setOnUpdate(props => view.update(props || {}))
    store.update.tree({ initial: true })

    function data() {
      return [
        {
          "id": 6,
          "data": {
            "first name": "child",
            "last name": "test",
            "middle name": "",
            "gender": "male",
            "mobile no": 12344,
            "alive": true,
            "date of birth": "2023-04-30"
          },
          "rels": {
            "father": 1
          }
        },
        {
          "id": 1,
          "data": {
            "first name": "me",
            "last name": "test",
            "middle name": null,
            "gender": "M",
            "mobile no": 12345,
            "alive": true,
            "date of birth": "2023-01-05"
          },
          "rels": {
            "father": 2,
            "mother": 3,
            "children": [
              6
            ]
          }
        },
        {
          "id": 2,
          "data": {
            "first name": "father",
            "last name": "test",
            "middle name": null,
            "gender": "M",
            "mobile no": 12346,
            "alive": true,
            "date of birth": "2005-04-02"
          },
          "rels": {
            "father": 4,
            "mother": 5,
            "children": [
              1
            ]
          }
        },
        {
          "id": 4,
          "data": {
            "first name": "grand father",
            "last name": "test",
            "middle name": "",
            "gender": "M",
            "mobile no": 12348,
            "alive": true,
            "date of birth": "2023-04-30"
          },
          "rels": {
            "children": [
              2
            ]
          }
        },
        {
          "id": 5,
          "data": {
            "first name": "grand mother",
            "last name": "test",
            "middle name": "",
            "gender": "F",
            "mobile no": 12349,
            "alive": true,
            "date of birth": "2023-04-30"
          },
          "rels": {
            "children": [
              2
            ]
          }
        },
        {
          "id": 3,
          "data": {
            "first name": "mother",
            "last name": "test",
            "middle name": null,
            "gender": "F",
            "mobile no": 12347,
            "alive": true,
            "date of birth": "2006-04-08"
          },
          "rels": {
            "children": [
              1
            ]
          }
        }
      ]

    }

  }

  render() {
    return <div className="f3" id="FamilyChart" ref={this.cont}></div>;
  }
}
