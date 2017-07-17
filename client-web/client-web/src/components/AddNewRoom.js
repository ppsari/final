import React from 'react'

export default class AddNewRoom extends React.Component {
  constructor () {
    super()
    this.state = {
      isAddRoom: false,
    }
  }

  addRoom () {
    this.setState({
      isAddRoom: true,
    })
  }

  render () {
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
                      <button type="button" onClick={() => {this.addRoom()}}><small>New Room</small></button>
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
                        <input type="file" className="form-control" ref="image" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <p>Description</p>
                    </div>
                    <div className="col-lg-8 m-b-20">
                      <textarea type="textarea" className="form-control" ref="descr" required />
                    </div>
                    <div className="col-12 text-center m-t-20">
                      <button type="submit" className="button btn-round">
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
}
