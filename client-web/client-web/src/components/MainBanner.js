import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

import './MainBanner.css'
const MainBanner = () => {
  return (
    <div className="MainBanner">
      <Jumbotron>
        <div className="container jumbotron">
          <div className="row">
            <div className="col-6 text-right">
              <h1 className="display-3 m-t-50"><span className="extra-bold green">ROOM360</span></h1>
              <h3 className="lead" style={{letterSpacing: 2, lineHeight: '1.7em'}}>Taking a Marketplace of property to the whole new level with <span className="extra-bold green">VIRTUAL REALITY.</span></h3>
              <hr className="my-2" />
              <p className="lead" >
                <Button color="theme-btn btn-style-one btn-same m-t-30">Learn More</Button>
              </p>
            </div>
            <div className="col-6">
              <img src="/img/room.jpg" alt="" className="img-responsive"/>
            </div>
          </div>
        </div>
      </Jumbotron>
    </div>
  );
};

export default MainBanner;
