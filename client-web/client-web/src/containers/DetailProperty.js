import React from 'react'
import MenuBar from '../components/MenuBar'
import Footer from '../components/Footer'

export default class DetailProperty extends React.Component {
  constructor () {
    super()
    this.state = {
      "_id": "5966c710af03e056224c474e",
      "descr": "rumah bagus diatas bukit banyak bonus setan ed",
      "address": "Jl. Sunter Agung Utara Raya, Blok A no. 5B, Sunter, Jakarta, Indonesia 14350",
      "image": "http://modeltheme.com/mt_urbanpoint/wp-content/uploads/2017/05/duplex_house_01-800x500.jpg",
      "_ownerId": "5966bacbbc397545e2290f93",
      "_categoryId": "5966c422b3a95452ff5018bc",
      "name": "rumah pondok indah ed",
      "city": "Jakarta ed",
      "__v": 0,
      "_accessId": [
        "5966c443b3a95452ff5018bd",
        "5966c448b3a95452ff5018be"
      ],
      "price": {
        "descr": "hour",
        "amount": 10
      },
      "status": "rent"
    }
  }

  render () {
    // let id = this.props.match.params.id;
    let data = this.state;
    console.log(data);
    return (
      <div>
        <MenuBar />
        <div className="container">
          <div className="row m-t-30">
            <div className="col-6">
              <h3>{data.name}</h3>
              <small>{data.address}</small>
            </div>
            <div className="col-6">
              <h5 className="text-right">Rp {data.price.amount},-</h5>
            </div>
          </div>
          <div className="row m-t-30">
            <div className="col-8">
              <img src={data.image} alt="preview" className="img-responsive" />
              <p className="m-t-20">{data.descr}</p>
            </div>
            <div className="col-6">

            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
