import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

const MainBanner = () => {
  return (
    <div className="MainBanner">
      <Jumbotron>
        <div className="container jumbotron">
          <div className="col-6">
            <h1 className="display-3">Hello, world!</h1>
            <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-2" />
            <p>Home. Not Protected. Anyone can see this.</p>
            <p className="lead">
              <Button color="primary">Learn More</Button>
            </p>
          </div>
        </div>
      </Jumbotron>
    </div>
  );
};

export default MainBanner;
