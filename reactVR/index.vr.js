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
      room: 'https://c1.staticflickr.com/7/6111/6325190163_31f3ce748a_b.jpg',
      img: {},
      desc: "",
      isIcons: true,
      limit: 2,
      space: 2,
      start: 0,
      images:[{
          _id: 0,
          name: 'chess',
          image: 'https://c1.staticflickr.com/7/6111/6325190163_31f3ce748a_b.jpg',
          type: 'bathRoom',
          description: 'aku chess'
        },
        {
          _id: 1,
          name: 'hacktiv',
          image:'https://i2.wp.com/www.samrohn.com/wp-content/uploads/standard-hotel.jpg?fit=1200%2C600',
          type: 'bedRoom',
          description: 'aku hacktiv'
        },
        {
          _id: 2,
          name: 'Pondok Indah Office Tower',
          image: 'https://c1.staticflickr.com/1/128/395079578_c4bc3550c8_b.jpg',
          type: 'livingRoom',
          description: 'aku pim'
        },
        {
            _id: 3,
            name: 'chess',
            image: 'http://i.imgur.com/cNFqhX1.jpg',
            type: 'bathRoom',
            description: 'aku chess'
          },
          {
            _id: 4,
            name: 'hacktiv',
            image:'https://www.textures.com/system/gallery/photos/HDR%20Spheres/125783/HDRPanoramas0021_1_download600.jpg',
            type: 'bedRoom',
            description: 'aku hacktiv'
          },
          {
            _id: 5,
            name: 'Pondok Indah Office Tower',
            image: 'https://www.textures.com/system/gallery/photos/HDR%20Spheres/125648/HDRPanoramas0016_3_download600.jpg',
            type: 'livingRoom',
            description: 'aku pim'
          },
          {
              _id: 6,
              name: 'chess',
              image: 'http://sky.easypano.com/EPSUpload2/Pano/2016/12-21/01/636178803368020490/320_190.jpg',
              type: 'bathRoom',
              description: 'aku chess'
            },
            {
              _id: 7,
              name: 'hacktiv',
              image:'http://pchuck.net/wp-content/uploads/2016/12/Great_fish_equirectangular.jpg',
              type: 'bedRoom',
              description: 'aku hacktiv'
            },
            {
              _id: 8,
              name: 'Pondok Indah Office Tower',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeIFdQ7C-y0JDgWjyzALX_Bl-et8V8anuDtbRtv5cuivY5UdQf',
              type: 'livingRoom',
              description: 'aku pim'
            },
            {
                _id: 9,
                name: 'chess',
                image: 'http://sky.easypano.com/EPSUpload2/Pano/2016/10-23/06/636127994570431286/320_190.jpg',
                type: 'bathRoom',
                description: 'aku chess'
              },
              {
                _id: 10,
                name: 'hacktiv',
                image:'http://sky.easypano.com/EPSUpload2/Pano/2016/10-23/06/636127994570431286/320_190.jpg',
                type: 'bedRoom',
                description: 'aku hacktiv'
              },
              {
                _id: 11,
                name: 'Pondok Indah Office Tower',
                image: 'http://sky.easypano.com/EPSUpload2/Pano/2017/01-11/15/636197439309658602/320_190.jpg',
                type: 'livingRoom',
                description: 'aku pim'
              }
      ],
      icons:
        {
        bathRoom : 'https://c1.staticflickr.com/7/6111/6325190163_31f3ce748a_b.jpg',
        bedRoom : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa7DiBD56aB4XGgEZFVYQtORUeszCUJIeAFowRXKQ-Su8SMI1H',
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
           {this.state.images.slice(this.state.start,this.state.space).map((img,index)=> {
            // let icon = {uri: this.state.icons[img.type]};
            let icon = {uri:img.image}
            let x = -3
            let y = 1
            let z = -2
            return (
              <View
                style={{width: 0.8,
                      height: 0.8,
                      margin: 0.1,
                      transform: [{translate: [x, y, z]},
                                  {rotateX: 0},
                                  {rotateY: 30}]}}
                key={index}>
              <VrButton onClick={()=>this.go(img)}>
                <Image
                source={icon}
                style={{width: 0.7,
                        height: 0.7}} />
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
            style={{width: 0.7,
                    height: 0.7,
                    transform: [{translate: [-3.8, 2.7, -4.2]},
                                {rotateX: 0},
                                {rotateY: 30}]}} />
         </VrButton>
        :<VrButton></VrButton>
       }
        {(this.state.start > 0 && this.state.isIcons === true)
        ?<VrButton onClick={()=> this.back()}>
           <Image
            source={{uri:'https://upload.wikimedia.org/wikipedia/commons/8/86/Glossy_3d_blue_arrow_left.png'}}
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
           source={{uri:'http://2.bp.blogspot.com/-Xy0IfbMCvU0/UC8fQzYfzkI/AAAAAAAAA08/FciCBs0MAAs/s200-c/minimize.png'}}
           style={{width: 0.15,
                   height: 0.15,
                   transform: [{translate: [-2.7, 5.3, -2]},
                               {rotateY: 35}]}} />
        </VrButton>
        {(this.state.isIcons === true)
        ? <Text
          style={{
            color: 'white',
            fontSize: 0.2,
            fontWeight: '100',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [-3.7, 6.7, -3]},
                        {rotateX: 10},
                        {rotateY: 35}]
          }}>
          click to clear screen, i'll wait at top
         </Text>
        : <Text
          style={{
            color: 'white',
            fontSize: 0.4,
            fontWeight: '100',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [-3.7, 6.7, -3]},
                        {rotateX: 20},
                        {rotateY: 30}]
          }}>
          click to bring back the room menus
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
            transform: [{translate: [0, 4.5, -3]}]
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
