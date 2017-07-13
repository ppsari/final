import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Image,
  Button
} from 'react-vr';

export default class reactVR extends React.Component {
  constructor(props){
    super(props)
    this.state={
      roomName: "chess",
      room: "chess-world.jpg"
    }

  }
  render() {
    return (
      <View>
        <Pano source={asset(this.state.room)}/>
        <Text
          onEnter={()=>this.move()}
          style={{
            fontSize: 0.3,
            fontWeight: '100',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}]
          }}>
          {this.state.roomName}
        </Text>
        <Text
          onEnter={()=>this.back()}
          style={{
            color: 'red',
            fontSize: 0.8,
            fontWeight: '100',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [1, 1, 5]},
                        {rotateY : 180},
                        {rotateX : 0}]
          }}>
          BACK
        </Text>
      </View>
    );
  }

  move(){
    this.setState({
      roomName: 'hacktiv',
      room: "PANO_20170712_204306_1.jpg.jpeg"
    })
  }
  back(){
    this.setState({
      roomName: 'pondok indah office tower',
      room: "PANO_20170713_094911_0.jpg.jpeg"
    })
  }
};


AppRegistry.registerComponent('reactVR', () => reactVR);
