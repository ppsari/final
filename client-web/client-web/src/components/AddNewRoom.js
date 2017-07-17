import React from 'react'
import axios from 'axios'

const api = 'http://dev-env.zcwmcsi6ny.us-west-2.elasticbeanstalk.com/api'

class AddNewRoom extends React.Component {
  constructor () {
    super()
    this.state = {
      isAddRoom: false,
      rooms: []
    }
  }

  render () {
    return (
      <div>
        <div className="b-a b-grey" style={{borderRadius:4}}>
          <h5 className="text-center bg-gray padding-15" style={{borderRadius: '4px 4px 0 0'}}>Room Detail</h5>
          <div className='row'>
          {(this.state.rooms.length === 0)
            ? (<h1>babi</h1>)
            : (this.state.rooms.map((room,index)=>{
              return <div className='col-3' key={index}>
                      <h6>{room.name}</h6>
                      <img src={room.image} key={index} className='img-responsive'/>
                      <a className="btn btn-danger" onClick={()=>this.deleteRoom(room._id)}><span className="glyphicon glyphicon-trash">Delete</span></a>
                     </div>
            }))}
          </div>
          <div className="padding-15">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h5 className="panel-title text-center">List Room</h5>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-2">
                    <div>
                      <img src="http://via.placeholder.com/200x200" className="img-responsive" alt="placeholder" />
                    </div>
                  </div>
                  <div className="col-2 ">
                    <div className="relative bg-gray add-button-image">
                      <div className="pull-center-flex">
                        <h2 className="text-center">+</h2>
                      </div>
                      <button type="button" onClick={() => {this.isAdd()}}><small>New Room</small></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.state.isAddRoom
              ? <div className="panel panel-default">
              <div className="panel-heading">
                <h5 className="panel-title text-center">New Room</h5>
              </div>
              <div className="panel-body">
                <form>
                  <div className="row">
                    <div className="col-lg-3">
                      <p>Room Name</p>
                    </div>
                    <div className="col-lg-8 m-b-20">
                      <div className="input-group">
                        <input type="text" className="form-control" ref="name" required />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <p>Room Image</p>
                    </div>
                    <div className="col-lg-8 m-b-20">
                      <div className="input-group">
                        <input type="text" className="form-control" ref="image" placeholder="your image url here" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <p>Description</p>
                    </div>
                    <div className="col-lg-8 m-b-20">
                      <textarea type="textarea" className="form-control" ref="descr" required />
                    </div>
                    <div className="col-12 text-center m-t-20">
                      <button type="submit" className="button btn-round" onClick={(e)=>this.addRoom(e)}>
                        Save Room
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
              : null
            }
          </div>
        </div>
      </div>
    )
  }

  isAdd(){
    this.setState({
      isAddRoom: true,
    })
  }

  addRoom(e){
    e.preventDefault()
    const token = JSON.parse(localStorage.getItem('token')).token
    const status = this.props.match.params.status
    const propId = this.props.match.params.idproperty
    let newRoom = {
      name: this.refs.name.value,
      image: this.refs.image.value,
      descr: this.refs.descr.value,
    }
    if(status === 'rent'){
      axios.post(api+`/roomRent/${propId}`,newRoom,{headers:{token:token}})
      .then(pr=>{
        console.log(pr.data);
        this.setState({
          rooms: this.state.rooms.concat(pr.data)
        })
      })
    } else{
      axios.post(api+`/roomSell/${propId}`,newRoom,{headers:{token:token}})
      .then(ps=>{
        this.setState({
          rooms: this.state.rooms.concat(ps.data)
        })
      })
    }
  }

  deleteRoom(rId){
    const token = JSON.parse(localStorage.getItem('token')).token
    const status = this.props.match.params.status
    const propId = this.props.match.params.idproperty
    if(window.confirm(`Are You Sure You Want to Delete This Room?`)){
      if(status === 'rent'){
        axios.delete(api+`/roomRent/${rId}`,{headers:{token:token}})
        .then(pr=>{
          console.log(pr.data);
          this.setState({
            rooms: this.state.rooms.concat(pr.data)
          })
        })
      } else{
        axios.delete(api+`/roomSell/${rId}`,{headers:{token:token}})
        .then(ps=>{
          this.setState({
            rooms: this.state.rooms.concat(ps.data)
          })
        })
      }
    } else{
      return false
    }
  }


  componentWillMount(){
    const status = this.props.match.params.status
    const token = JSON.parse(localStorage.getItem('token')).token
    const propId = this.props.match.params.idproperty
    if(status === 'rent'){
      axios.get(api+`/roomRent/all/${propId}`,{headers:{token:token}})
      .then(pr=>{
        console.log(pr.data);
        this.setState({
          rooms: pr.data
        })
      })
    } else{
      axios.get(api+`/roomRent/all/${propId}`,{headers:{token:token}})
      .then(ps=>{
        this.setState({
          rooms: ps.data
        })
      })
    }

  }

}



export default AddNewRoom
