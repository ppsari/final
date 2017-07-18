import React from 'react';
import {StackNavigator} from 'react-navigation'
import axios from 'axios'

import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Image,
  Mesh,
  VideoPano,
  Sphere,
  StyleSheet,
  localStorage,
  AsyncStorage,
  NativeModules
} from 'react-vr';

const Location = NativeModules.Location


class reactVR extends React.Component {
  constructor(props){
    super(props)
    this.state={
      roomName: '',
      room: '',
      img: {},
      desc: "",
      isIcons: true,
      limit: 2,
      space: 2,
      start: 0,
      rooms: [],
      icons:
        {
        bathRoom : 'https://s3-ap-southeast-1.amazonaws.com/room360/teshome.jpg',
        bedRoom : 'https://encrypted-tbn0.gstatic.com/rooms?q=tbn:ANd9GcSa7DiBD56aB4XGgEZFVYQtORUeszCUJIeAFowRXKQ-Su8SMI1H',
        livingRoom: 'http://img.freepik.com/free-vector/modern-living-room-furniture_23-2147518147.jpg?size=338&ext=jpg'
      }
    }

  }
  render() {
    return (
      <View>
        <Pano source={{uri:this.state.room}}/>
        {(this.state.isIcons === true)
         ? <View>
           {this.state.rooms.slice(this.state.start,this.state.space).map((img,index)=> {
            // let icon = {uri: this.state.icons[img.type]};
            let icon = {uri:img.image}
            let x = -3
            let y = 0.5
            let z = -2
            return (
              <View
                style={{
                      width: 0.8,
                      height: 0.8,
                      margin: 0.1,
                      transform: [{translate: [x, y, z]},
                                  {rotateX: 0},
                                  {rotateY: 40}]}}
                key={index}>
              <VrButton onClick={()=>this.go(img)}>
                <Image
                source={icon}
                style={{width: 0.7,
                        height: 0.7}} />
                <Text style={{
                  fontWeight: '300',
                  color: 'black',
                  shadowColor: 'black',
                  shadowOffset:{width: 0.5, height: 0.5},
                  transform: [{rotateY: 15}]
                }}>{img.name}</Text>
               </VrButton>
             </View>)
          })}
          </View>
        : <VrButton></VrButton>
        }
        {(this.state.desc !== "")
        ?<View
          style={
            styles.descBox
          }
          ><Text
            style={styles.descTitle}
            >{this.state.roomName}</Text>
            <Text
          style={styles.desc}>
          {this.state.desc}
         </Text></View>
        :<VrButton></VrButton>
        }
        <VrButton onClick={()=> this.desc(this.state.img)}>
          <Image
            source={{uri:'http://i.imgur.com/pUcQRbV.png'}}
            style={{width: 0.5,
                    height: 0.5,
                    transform: [{translate: [5.1, 2.5, 0]},
                                {rotateY: -65}]}} />
        </VrButton>
        {(this.state.rooms.length > this.state.space && this.state.isIcons === true)
        ? <VrButton onClick={()=> this.next()}>
           <Image
            source={{uri:'http://i.imgur.com/BypPNZ9.png'}}
            style={{width : 0.7,
                    height: 0.7,
                    transform: [{translate: [-3.8, 2.7, -4.2]},
                                {rotateX: 0},
                                {rotateY: 215}]}} />
         </VrButton>
        :<VrButton></VrButton>
       }
        {(this.state.start > 0 && this.state.isIcons === true)
        ?<VrButton onClick={()=> this.back()}>
           <Image
            source={{uri:'http://i.imgur.com/BypPNZ9.png'}}
            style={{width: 0.7,
                    height: 0.7,
                    transform: [{translate: [-7, 2.9, -3.3]},
                                {rotateX: 0},
                                {rotateY: 35}]}} />
         </VrButton>
        :<VrButton></VrButton>
       }
       <VrButton onClick={()=> this.minimize()}>
          <Image
           source={{uri:'http://i.imgur.com/SefE9C8.png'}}
           style={{width: 0.15,
                   height: 0.15,
                   transform: [{translate: [-2.7, 4.7, -2]},
                               {rotateY: 35}]}} />
        </VrButton>
        {(this.state.isIcons === true)
        ? <Text
          style={{
            fontWeight: '300',
            color: 'black',
            fontSize: 0.2,
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [-3.7, 5.7, -3]},
                        {rotateX: 10},
                        {rotateY: 35}]
          }}>
          click to clear screen, i'll wait at top
         </Text>
        : <Text
          style={{
            fontWeight: '300',
            color: 'black',
            fontSize: 0.4,
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [-3.7, 5.7, -3]},
                        {rotateX: 20},
                        {rotateY: 30}]
          }}>
          click to bring back the room menus
         </Text>
      }
        <Text
          style={{
            backgroundColor: 'black',
            color: 'white',
            fontSize: 0.3,
            fontWeight: '200',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 4.5, -3]}]
          }}>
          {this.state.roomName}
        </Text>
      </View>
    );
  }

  componentDidMount(){
    const api = `http://dev-env.zcwmcsi6ny.us-west-2.elasticbeanstalk.com`
    const params = Location.href.split('?')[1].split('=')[1]
    const status = params.split('/')[0]
    const propId = params.split('/')[1]
    axios.get(api+`/api/${status}/${propId}`)
    .then((response,err)=>{
      this.setState({
        roomName: response.data._roomId[0].name,
        room: response.data._roomId[0].image,
        img: response.data._roomId[0],
        rooms: response.data._roomId
      })
    })
  }

  minimize(){
    if(this.state.isIcons === true){
      this.setState({
        isIcons: false
      })
    } else{
      this.setState({
        isIcons: true
      })
    }
  }
  back(){
    this.setState({
      start: this.state.start - this.state.limit,
      space: this.state.start
    })
  }
  next(){
    this.setState({
      start: this.state.space,
      space: this.state.space + this.state.limit
    })
  }
  go(img){
    this.setState({
      roomName: img.name,
      room: img.image,
      img: img,
      desc: ""
    })
  }
  desc(img){
    if(this.state.desc === ""){
      this.setState({
        desc: img.descr
      })
    } else{
      this.setState({
        desc: ""
      })
    }
  }
  // move(){
  //   this.setState({
  //     roomName: this.state.rooms[this.state.index + 1].name,
  //     room: this.state.rooms[this.state.index + 1].image,
  //     index: this.state.index + 1
  //   })
  // }
  // back(){
  //   this.setState({
  //     roomName: this.state.rooms[this.state.index - 1].name,
  //     room: this.state.rooms[this.state.index - 1].image,
  //     index: this.state.index - 1
  //   })
  // }
};
var styles = StyleSheet.create({
desc: {
  color: 'white',
  fontSize: 0.3,
  fontWeight: '100',
  textAlign: 'center',
  textAlignVertical: 'center',

},
descBox:{
  backgroundColor: 'black',
  width: 2.1,
  transform: [{translate: [3, 2,-2]},
              {rotateY: -55}]
},
descTitle:{
  color: 'white',
  fontSize: 0.4,
  fontWeight: 'bold',
  textAlign: 'center',
  textAlignVertical: 'center',
},
title: {
  fontSize: 19,
  fontWeight: 'bold',
},
activeTitle: {
  color: 'red',
},
});

const App = StackNavigator({
  Home: {screen:reactVR,
         path: 'room/:id'},
});

AppRegistry.registerComponent('reactVR', () => reactVR);
