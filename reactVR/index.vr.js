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
  VideoPano,
  Sphere,
  StyleSheet
} from 'react-vr';

export default class reactVR extends React.Component {
  constructor(props){
    super(props)
    this.state={
      roomName: 'Chess',
      room: 'chess-world.jpg',
      img: {},
      desc: "",
      isIcons: true,
      limit: 2,
      space: 2,
      start: 0,
      images:[{
          _id: 0,
          name: 'chess',
          image: 'chess-world.jpg',
          type: 'bathRoom',
          description: 'aku chess'
        },
        {
          _id: 1,
          name: 'hacktiv',
          image:'PANO_20170712_204306_1.jpg.jpeg',
          type: 'bedRoom',
          description: 'aku hacktiv'
        },
        {
          _id: 2,
          name: 'Pondok Indah Office Tower',
          image: 'PANO_20170713_094911_0.jpg.jpeg',
          type: 'livingRoom',
          description: 'aku pim'
        },
        {
            _id: 3,
            name: 'chess',
            image: 'chess-world.jpg',
            type: 'bathRoom',
            description: 'aku chess'
          },
          {
            _id: 4,
            name: 'hacktiv',
            image:'PANO_20170712_204306_1.jpg.jpeg',
            type: 'bedRoom',
            description: 'aku hacktiv'
          },
          {
            _id: 5,
            name: 'Pondok Indah Office Tower',
            image: 'PANO_20170713_094911_0.jpg.jpeg',
            type: 'livingRoom',
            description: 'aku pim'
          },
          {
              _id: 6,
              name: 'chess',
              image: 'chess-world.jpg',
              type: 'bathRoom',
              description: 'aku chess'
            },
            {
              _id: 7,
              name: 'hacktiv',
              image:'PANO_20170712_204306_1.jpg.jpeg',
              type: 'bedRoom',
              description: 'aku hacktiv'
            },
            {
              _id: 8,
              name: 'Pondok Indah Office Tower',
              image: 'PANO_20170713_094911_0.jpg.jpeg',
              type: 'livingRoom',
              description: 'aku pim'
            },
            {
                _id: 9,
                name: 'chess',
                image: 'chess-world.jpg',
                type: 'bathRoom',
                description: 'aku chess'
              },
              {
                _id: 10,
                name: 'hacktiv',
                image:'PANO_20170712_204306_1.jpg.jpeg',
                type: 'bedRoom',
                description: 'aku hacktiv'
              },
              {
                _id: 11,
                name: 'Pondok Indah Office Tower',
                image: 'PANO_20170713_094911_0.jpg.jpeg',
                type: 'livingRoom',
                description: 'aku pim'
              }
      ],
      icons:
        {
        bathRoom : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRmIdSODOyQhIiwvubG7Xe0iaBJlrTFgmoEtMS-P3GjC49GmZ4',
        bedRoom : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa7DiBD56aB4XGgEZFVYQtORUeszCUJIeAFowRXKQ-Su8SMI1H',
        livingRoom: 'http://img.freepik.com/free-vector/modern-living-room-furniture_23-2147518147.jpg?size=338&ext=jpg'
      }
    }

  }
  render() {
    return (
      <View>
        <Pano source={asset(this.state.room)}/>
        {(this.state.isIcons === true)
         ? <View>
           {this.state.images.slice(this.state.start,this.state.space).map((img,index)=> {
            let icon = {uri: this.state.icons[img.type]};
            let x = -3
            let y = 0.9
            let d = -3
            return (
              <View
                style={{width: 0.5,
                      height: 0.5,
                      margin: 0.1,
                      transform: [{translate: [x, y, d]},
                                  {rotateX: 0},
                                  {rotateY: 30}]}}
                key={index}>
              <VrButton onClick={()=>this.go(img)}>
                <Image
                source={icon}
                style={{width: 0.5,
                        height: 0.5}} />
                <Text>{img.name}</Text>
               </VrButton>
             </View>)
          })}
          </View>
        : <VrButton></VrButton>
        }
        {(this.state.desc !== "")
        ?<Text
          style={styles.desc}>
          {this.state.desc}
         </Text>
        :<VrButton></VrButton>
        }
        <VrButton onClick={()=> this.desc(this.state.img)}>
          <Image
            source={{uri:'https://upload.wikimedia.org/wikipedia/commons/1/13/Glossy_3d_blue_questionmark.png'}}
            style={{width: 0.5,
                    height: 0.5,
                    transform: [{translate: [5.1, 2.5, 0]},
                                {rotateY: -80}]}} />
        </VrButton>
        {(this.state.images.length > this.state.space && this.state.isIcons === true)
        ? <VrButton onClick={()=> this.next()}>
           <Image
            source={{uri:'https://upload.wikimedia.org/wikipedia/commons/1/12/Glossy_3d_blue_arrow_right.png'}}
            style={{width: 0.3,
                    height: 0.3,
                    transform: [{translate: [-2.2, 2.5, -3]},
                                {rotateX: 0},
                                {rotateY: 30}]}} />
         </VrButton>
        :<VrButton></VrButton>
       }
        {(this.state.start > 0 && this.state.isIcons === true)
        ?<VrButton onClick={()=> this.back()}>
           <Image
            source={{uri:'https://upload.wikimedia.org/wikipedia/commons/8/86/Glossy_3d_blue_arrow_left.png'}}
            style={{width: 0.3,
                    height: 0.3,
                    transform: [{translate: [-3.45, 2.65, -2.9]},
                                {rotateX: 0},
                                {rotateY: 30}]}} />
         </VrButton>
        :<VrButton></VrButton>
       }
       <VrButton onClick={()=> this.minimize()}>
          <Image
           source={{uri:'http://2.bp.blogspot.com/-Xy0IfbMCvU0/UC8fQzYfzkI/AAAAAAAAA08/FciCBs0MAAs/s200-c/minimize.png'}}
           style={{width: 0.1,
                   height: 0.1,
                   transform: [{translate: [-2.7, 3.9, -3]},
                               {rotateY: 30}]}} />
        </VrButton>
        {(this.state.isIcons === true)
        ? <Text
          style={{
            color: 'white',
            fontSize: 0.1,
            fontWeight: '100',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [-2.7, 4.1, -3]},
                        {rotateX: 0},
                        {rotateY: 30}]
          }}>
          click to clear, i'll wait at top
         </Text>
        : <Text
          style={{
            color: 'white',
            fontSize: 0.1,
            fontWeight: '100',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [-2.7, 4.1, -3]},
                        {rotateX: 0},
                        {rotateY: 30}]
          }}>
          click to bring back the room icons
         </Text>
      }
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
            transform: [{translate: [0, 3, -3]}]
          }}>
          {this.state.roomName}
        </Text>

      </View>
    );
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
        desc: img.description
      })
    } else{
      this.setState({
        desc: ""
      })
    }
  }

  // move(){
  //   this.setState({
  //     roomName: this.state.images[this.state.index + 1].name,
  //     room: this.state.images[this.state.index + 1].image,
  //     index: this.state.index + 1
  //   })
  // }
  // back(){
  //   this.setState({
  //     roomName: this.state.images[this.state.index - 1].name,
  //     room: this.state.images[this.state.index - 1].image,
  //     index: this.state.index - 1
  //   })
  // }
};

var styles = StyleSheet.create({
desc: {
  color: 'white',
  fontSize: 0.3,
  fontWeight: '100',
  layoutOrigin: [0.5, 0.5],
  paddingLeft: 0.2,
  paddingRight: 0.2,
  textAlign: 'center',
  textAlignVertical: 'center',
  transform: [{translate: [3, 2,-1]},
              {rotateY: -45}]
},
descBox:{
  borderRadius: 4,
  borderWidth: 0.5,
  borderColor: '#d6d7da',
},
title: {
  fontSize: 19,
  fontWeight: 'bold',
},
activeTitle: {
  color: 'red',
},
});


AppRegistry.registerComponent('reactVR', () => reactVR);
