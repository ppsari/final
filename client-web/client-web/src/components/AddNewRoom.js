import React from 'react'
import axios from 'axios'
import { upload } from '../helpers/upload'

import './AddNewRoom.css'
const api = 'https://api.room360.ga/api'
let newRoom = {}

class AddNewRoom extends React.Component {
  constructor () {
    super()
    this.state = {
      isAddRoom: true,
      rooms: []
    }
  }

  render () {
    // console.log(this.state.rooms);
    return (
      <div>
        <div className="b-a b-grey" style={{borderRadius:4}}>
          <h5 className="text-center bg-gray padding-15" style={{borderRadius: '4px 4px 0 0'}}>Room Detail</h5>
          <div className="padding-15">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h5 className="panel-title text-center">List Room</h5>
              </div>
              <div className="panel-body">
                <div className="row">
                  {(this.state.rooms.length === 0)
                    ? (<div className="col-2">
                        <div>
                          <img src="http://via.placeholder.com/200x200" className="img-responsive" alt="placeholder" />
                        </div>
                      </div>)
                    : (this.state.rooms.map((room,index)=>{
                      return <div className='col-md-3 m-b-20' key={index}>
                                <div className="room-grid-view p-b-10">
                                  <div className="room-img-container">
                                    <img src={room.image} key={index} className='img-responsive' alt="room"/>
                                  </div>
                                  <div className="padding-20">
                                    <h6>{room.name}</h6>
                                    {/*
                                      <a className="btn btn-danger
                                      text-white"
                                      onClick={()=>this.deleteRoom(room._id,index)}>
                                        <span className="glyphicon glyphicon-trash">Delete</span>
                                      </a>
                                    */}
                                  </div>
                                </div>
                             </div>
                    }))}
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
                        <input type="file" defaultValue="upload" id="fileButton" className="form-control" ref="image" placeholder="add image url here" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <p>Description</p>
                    </div>
                    <div className="col-lg-8 m-b-20">
                      <textarea type="textarea" className="form-control" ref="descr" required />
                    </div>
                    <div className="col-12 text-center m-t-20">
                      <button type="submit" className="button btn-round" onClick={(e)=>{
                          this.addRoom(e)
                        }}>
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

  isAdd(callback){
    this.setState({
      isAddRoom: true,
    })
  }

  addRoom(e){
    e.preventDefault()
    const token = JSON.parse(localStorage.getItem('token')).token
    const status = this.props.match.params.status
    const propId = this.props.match.params.idproperty
    newRoom.name = this.refs.name.value;
    newRoom.descr = this.refs.descr.value

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

  deleteRoom(rId,index){
    const token = JSON.parse(localStorage.getItem('token')).token
    const status = this.props.match.params.status
    const propId = this.props.match.params.idproperty
    if(window.confirm(`Are You Sure You Want to Delete This Room?`)){
      if(status === 'rent'){
        axios.delete(api+`/roomRent/${rId}`,{headers:{token:token}})
        .then(pr=>{
          this.setState({
            rooms: this.state.rooms.splice(index,1)
          })
        })
      } else{
        axios.delete(api+`/roomSell/${rId}`,{headers:{token:token}})
        .then(ps=>{
          this.setState({
            rooms: this.state.rooms.splice(index,1)
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
      axios.get(api+`/propertyRent/${propId}`,{headers:{token:token}})
      .then(pr=>{
        this.setState({
          rooms: pr.data._roomId
        })
      })
    } else{
      axios.get(api+`/propertySell/${propId}`,{headers:{token:token}})
      .then(ps=>{
        this.setState({
          rooms: ps.data._roomId
        })
      })
    }
  }

  componentDidMount () {
    upload('uploader', 'fileButton',(url)=>{
      newRoom.image = url
      console.log(url);
    })
  }
}



export default AddNewRoom
