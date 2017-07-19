import React from 'react'
import TitleSection from '../../components/TitleSection'

import './HowTo.css'

export default class Transaction extends React.Component {
  render () {
    let box = {backgroundColor:'#71b100', color: 'white', minHeight: 460}
    return (
      <div>
        <TitleSection lightTitle="HOW" boldTitle="TO" />
        <div className="col-lg-10 offset-lg-1">
          <h5 className="m-b-20">How to capture 360 image with your smartphone</h5>
          <div className="row">
            <div className="col-md-6 m-b-20">
              <div className="media how-to">
                <div className="media-left">
                  <img src="http://i.imgur.com/d1KZFs5.png" alt="" className="img-responsive"/>
                </div>
                <div className="media-body">
                  <p style={{ padding: 10 }}>install and open google street view from google playstore.</p>
                  <h3 className="bottom-right how-to-step">1.</h3>
                </div>
              </div>
            </div>
            <div className="col-md-6 m-b-20">
              <div className="media how-to">
                <div className="media-left">
                  <img src="http://i.imgur.com/zeFH16A.png" alt="" className="img-responsive"/>
                </div>
                <div className="media-body">
                  <p style={{ padding: 10 }}>push the camera icon at the bottom right corner of your screen.</p>
                  <h3 className="bottom-right how-to-step">2.</h3>
                </div>
              </div>
            </div>
            <div className="col-md-6 m-b-20">
              <div className="media how-to">
                <div className="media-left">
                  <img src="http://i.imgur.com/DK6pTJd.png" alt="" className="img-responsive"/>
                </div>
                <div className="media-body">
                  <p style={{ padding: 10 }}>choose camera to open your smartphone camera.</p>
                  <h3 className="bottom-right how-to-step">3.</h3>
                </div>
              </div>
            </div>
            <div className="col-md-6 m-b-20">
              <div className="media how-to">
                <div className="media-left">
                  <img src="http://i.imgur.com/wahtvzD.png" alt="" className="img-responsive"/>
                </div>
                <div className="media-body">
                  <p style={{ padding: 10 }}>point your camera to the dot, till check button turns to green, then press it to process the picture.</p>
                  <h3 className="bottom-right how-to-step">4.</h3>
              </div>
              </div>
            </div>
            <div className="col-md-6 m-b-20">
              <div className="media how-to">
                <div className="media-left">
                  <img src="http://i.imgur.com/HYOd5Us.png" alt="" className="img-responsive"/>
                </div>
                <div className="media-body">
                  <p style={{ padding: 10 }}>done, lets take a look at panoramas folder in your gallery.</p>
                  <h3 className="bottom-right how-to-step">5.</h3>
                </div>
              </div>
            </div>
          </div>

            <div className="table-responsive m-t-30">
              <table className="table">
                <tbody>
                  <tr>
                    <td colSpan="6" className="bg-gray">
                      <small className="italic">TIPS : </small>
                      <p>to get the best result use tripod or something to make your phone rotate smoothly, and place your camera lens as the axis.</p>
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
