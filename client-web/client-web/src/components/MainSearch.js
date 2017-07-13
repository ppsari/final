import React from 'react';
import { Button, Form, Input } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <div className="container MainSearch">
        <Form className="row">
          <div className="col-md-6 offset-md-2">
            <Input type="text" name="email" id="location" placeholder="Find Property that you want" />
          </div>
          <div className="col-2">
            <Button>Submit</Button>
          </div>

        </Form>
      </div>
    );
  }
}
