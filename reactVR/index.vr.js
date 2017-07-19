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
      hoverNext: 100,
      hoverBack: 100,
      hoverPic1: 100,
      hoverPic2: 100,
      hoverTitle: 100,
      hoverDesc: 100,
      hoverTitle: 100,
      hoverText1: 100,
      hoverText2: 100
    }

  }
  render() {
    return (
      <View>
        <Pano source={{uri:this.state.room}}/>
        {(this.state.isIcons === true)
         ? <View>
           {this.state.rooms.slice(this.state.start,this.state.space).map((img,index)=> {
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
                        height: 0.7,
                        }} />
                <Text
                  style={{
                  fontWeight: '300',
                  color: 'black',
                  shadowOffset:{width: 0.5, height: 0.5},
                  transform: [{rotateY: 5}]
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
            onEnter={()=>this.hover(desc)}
            onExit={()=> this.unhover(desc)}
            source={{uri:'https://s3.amazonaws.com/aws-website-room-23fnj/help-web-button.png'}}
            style={{width: 0.5,
                    height: 0.5,
                    opacity: this.state.hoverDesc,
                    transform: [{translate: [5.1, 2.5, 0]},
                                {rotateY: -65}]}} />
        </VrButton>
        {(this.state.rooms.length > this.state.space && this.state.isIcons === true)
        ? <VrButton onClick={()=> this.next()}>
           <Image
            onEnter={()=>this.hover(next)}
            onExit={()=> this.unhover(next)}
            source={{uri:'https://s3.amazonaws.com/aws-website-room-23fnj/arrow-back-button.png'}}
            style={{width : 0.7,
                    height: 0.7,
                    opacity: this.state.hoverNext,
                    transform: [{translate: [-3.8, 2.7, -4.2]},
                                {rotateX: 0},
                                {rotateY: 215}]}} />
         </VrButton>
        :<VrButton></VrButton>
       }
        {(this.state.start > 0 && this.state.isIcons === true)
        ?<VrButton onClick={()=> this.back()}>
           <Image
             onEnter={()=>this.hover(back)}
             onExit={()=> this.unhover(back)}
            source={{uri:'https://s3.amazonaws.com/aws-website-room-23fnj/arrow-back-button.png'}}
            style={{width: 0.7,
                    height: 0.7,
                    opacity: this.state.hoverBack,
                    transform: [{translate: [-7, 2.9, -3.3]},
                                {rotateX: 0},
                                {rotateY: 35}]}} />
         </VrButton>
        :<VrButton></VrButton>
       }
       <VrButton onClick={()=> this.minimize()}>
          <Image
           source={{uri:'https://s3.amazonaws.com/aws-website-room-23fnj/Arrow_Up_Button.png'}}
           style={{width: 0.15,
                   height: 0.15,
                   opacity: this.state.hover,
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
                        {rotateX: 15},
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
          onEnter={()=>this.hover(title)}
          onExit={()=> this.unhover(title)}
          style={{
            backgroundColor: 'black',
            opacity: this.state.hoverTitle,
            color: 'white',
            fontSize: 0.3,
            fontWeight: '200',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 4.3, -3]}]
          }}>
          {this.state.roomName}
        </Text>
      </View>
    );
  }

  unhover(e){
    const full = 100
    switch (e) {
      case 'next':this.setState({hoverNext: full});break
      case 'back':this.setState({hoverBack: full});break
      case '0':this.setState({hoverPic1: full});break
      case '1':this.setState({hoverPic2: full});break
      case '0T':this.setState({hoverText1: full});break
      case '1T':this.setState({hoverText2: full});break
      case 'title':this.setState({hoverTitle: full});break
      case 'desc':this.setState({hoverDesc: full});break
      default:this.setState({hoverTitle: full});break
    }
  }

  hover(e){
    const shadow = 1
    switch (e) {
      case 'next':this.setState({hoverNext: shadow});break
      case 'back':this.setState({hoverBack: shadow});break
      case '0':this.setState({hoverPic1: shadow});break
      case '1':this.setState({hoverPic2: shadow});break
      case '0T':this.setState({hoverText1: shadow});break
      case '1T':this.setState({hoverText2: shadow});break
      case 'title':this.setState({hoverTitle: shadow});break
      case 'desc':this.setState({hoverDesc: shadow});break
      default:this.setState({hoverTitle: shadow});break
    }
    this.setState({
      hover: 1
    })
  }

  componentDidMount(){
    const api = `https://api.room360.ga/api`
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
