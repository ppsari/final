import React from 'react'
import {connect} from 'react-redux'

import {acceptRequest,rejectRequest} from '../../actions/index.js'

class Request extends React.Component {
  constructor(props) {
    super(props)
    this.toggleClass = this.toggleClass.bind(this)
    this.state = {
      active: false
    }
  }
  toggleClass() {
    const currentState = this.state.active;
    this.setState({
      active: !currentState
    })
  }

  render () {
    return (
      <div>
        <div className="col-lg-10 offset-lg-1">
          <h4>Request List</h4>
            <div className="table-responsive m-t-30">
              <table className="table">
                <tbody>
                  <tr className={this.state.active ? 'active' : null}>
                    <td style={{width: '20%'}}>
                      <div className="image-small">
                        <img className="img-responsive" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy8RObu6BpVxTv89TVAgwO_hDD9YD4IYU3wwfWx4V6-GjiU24EZA" alt="" />
                      </div>
                    </td>
                    <td>
                      <small className="italic">Property Name:</small>
                      <h6><span className="lnr lnr-home green m-r-10"></span><span className="bold">Pondok Indah Permai</span></h6>
                      <h6><span className="lnr lnr-map-marker green m-r-10"></span>Jakarta Selatan</h6>
                    </td>
                    <td>
                      <small className="italic">Requested by:</small>
                      <h6><span className="lnr lnr-user green m-r-10"></span> Ppsari Mighty</h6>
                      <h6><span className="lnr lnr-phone-handset green m-r-10"></span>+62889788210</h6>
                      <h6><span className="lnr lnr-bubble green m-r-10"></span>
                        <button type="button" onClick={() => {this.toggleClass()}} className="btn-link">See Message</button>
                      </h6>
                    </td>
                    <td className="list-table p-b-0 p-t-25">
                      <button type="submit" className="theme-btn btn-style-one btn-small" >
                        Accept
                      </button>
                      <button type="submit" className="theme-btn btn-style-three btn-small" >
                        Reject
                      </button>
                    </td>
                  </tr>
                  <tr style={this.state.active ? null : {display: 'none'}} >
                    <td colSpan="4" className="bg-gray">
                      <small className="italic">Message:</small>
                      <p>
                        Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal
                      </p>
                    </td>
                  </tr>
                  <tr className={this.state.active ? 'active' : null}>
                    <td style={{width: '20%'}}>
                      <div className="image-small">
                        <img className="img-responsive" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy8RObu6BpVxTv89TVAgwO_hDD9YD4IYU3wwfWx4V6-GjiU24EZA" alt="" />
                      </div>
                    </td>
                    <td>
                      <small className="italic">Property Name:</small>
                      <h6><span className="lnr lnr-home green m-r-10"></span><span className="bold">Pondok Indah Permai</span></h6>
                      <h6><span className="lnr lnr-map-marker green m-r-10"></span>Jakarta Selatan</h6>
                    </td>
                    <td>
                      <small className="italic">Requested by:</small>
                      <h6><span className="lnr lnr-user green m-r-10"></span> Ppsari Mighty</h6>
                      <h6><span className="lnr lnr-phone-handset green m-r-10"></span>+62889788210</h6>
                      <h6><span className="lnr lnr-bubble green m-r-10"></span>
                        <button type="button" onClick={() => {this.toggleClass()}} className="btn-link">See Message</button>
                      </h6>
                    </td>
                    <td className="list-table p-b-0 p-t-25">
                      <button type="submit" className="theme-btn btn-style-one btn-small" >
                        Accept
                      </button>
                      <button type="submit" className="theme-btn btn-style-three btn-small" >
                        Reject
                      </button>
                    </td>
                  </tr>
                  <tr style={this.state.active ? null : {display: 'none'}} >
                    <td colSpan="4" className="bg-gray">
                      <small className="italic">Message:</small>
                      <p>
                        Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) =>{

}

const mapDispatchToProps = (dispatch)=>{

  acceptRequest: (id) => dispatch(acceptRequest(id))
  rejectRequest: (id) => dispatch(rejectRequest(id))
}

export default connect (mapStateToProps,mapDispatchToProps)(Request)
