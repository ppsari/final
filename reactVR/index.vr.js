import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Image,
  Mesh,
  VideoPano
} from 'react-vr';

export default class reactVR extends React.Component {
  constructor(props){
    super(props)
    this.state={
      roomName: 'Chess',
      room: 'chess-world.jpg',
      index: 0,
      images:[{
          name: 'chess',
          image: 'chess-world.jpg',
          type: 'bathRoom'
        },
        {
          name: 'hacktiv',
          image:'PANO_20170712_204306_1.jpg.jpeg',
          type: 'bedRoom'
        },
        {
          name: 'Pondok Indah Office Tower',
          image: 'PANO_20170713_094911_0.jpg.jpeg',
          type: 'livingRoom'
        }
      ],
      icons:
        {bathRoom : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRmIdSODOyQhIiwvubG7Xe0iaBJlrTFgmoEtMS-P3GjC49GmZ4',
        bedRoom : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa7DiBD56aB4XGgEZFVYQtORUeszCUJIeAFowRXKQ-Su8SMI1H',
        livingRoom: 'http://img.freepik.com/free-vector/modern-living-room-furniture_23-2147518147.jpg?size=338&ext=jpg'}
    }

  }
  render() {
    return (
      <View>
        <Pano source={asset(this.state.room)}/>
         {/* {(this.state.index < this.state.images.length - 1)
         ?<VrButton onClick={()=>this.move()}>
           <Image
             source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrGUAHUDT6MyZfAnJkrOPoVsTX4x_00ohYJED-BajrskGGQ5iI_Q'}}
             style={{width: 0.5,
                     height: 0.5,
                     transform: [{
                       translate: [0, 2, -3]},
                       {rotateY : 0},
                       {rotateX : 0}]}} /></VrButton>
         :<VrButton></VrButton>
       }
       {(this.state.index > 0)
       ? <VrButton onClick={()=>this.back()}>
         <Image
           source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNTqhTYiaJW9iU1d4Il5ihLupDAUiBSE3IVb22nJJhnB5LBuM_'}}
           style={{width: 1,
                   height: 1,
                   transform: [{translate: [1, 1, 5]},
                               {rotateY : 90},
                               {rotateX : 0}]}} /></VrButton>
       :<VrButton></VrButton>
     } */}
     {this.state.images.map((img,index)=> {
       let icon = {uri: this.state.icons[img.type]};
       return (
         <View key={index}>
         <VrButton onClick={()=>this.go(img)}>
           <Image
           source={icon}
           style={{width: 0.5,
                   height: 0.5,
                   transform: [{translate: [-3.5, 0.8, -3]},
                               {rotateY : 0},
                               {rotateX : 0}]}} />
          </VrButton>
        <View><Text> {img.name}  </Text></View>
        </View>)
     })}
        <Text
          style={{
            color: 'white',
            fontSize: 0.3,
            fontWeight: '100',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 2, -3]}]
          }}>
          {this.state.roomName}
        </Text>

      </View>
    );
  }

  tes(){
    console.log('halo');
  }

  go(img){
    this.setState({
      roomName: img.name,
      room: img.image
    })
  }

  move(){
    this.setState({
      roomName: this.state.images[this.state.index + 1].name,
      room: this.state.images[this.state.index + 1].image,
      index: this.state.index + 1
    })
  }
  back(){
    this.setState({
      roomName: this.state.images[this.state.index - 1].name,
      room: this.state.images[this.state.index - 1].image,
      index: this.state.index - 1
    })
  }
};


AppRegistry.registerComponent('reactVR', () => reactVR);
