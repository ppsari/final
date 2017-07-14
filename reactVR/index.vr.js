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
  Sphere
} from 'react-vr';

export default class reactVR extends React.Component {
  constructor(props){
    super(props)
    this.state={
      roomName: 'Chess',
      room: 'chess-world.jpg',
      index: 0,
      desc: "",
      isRead: false,
      limit: 2,
      space: 2,
      start: 0,
      images:[{
          name: 'chess',
          image: 'chess-world.jpg',
          type: 'bathRoom',
          description: 'aku chess'
        },
        {
          name: 'hacktiv',
          image:'PANO_20170712_204306_1.jpg.jpeg',
          type: 'bedRoom',
          description: 'aku hacktiv'
        },
        {
          name: 'Pondok Indah Office Tower',
          image: 'PANO_20170713_094911_0.jpg.jpeg',
          type: 'livingRoom',
          description: 'aku pim'
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
                      transform: [{translate: [x, y, d]}]}}
                key={index}>
              <VrButton onClick={()=>this.go(img,index)}>
                <Image
                source={icon}
                style={{width: 0.5,
                        height: 0.5}} />
                <Text>{img.name}</Text>
               </VrButton>
             </View>)
          })}
        {(this.state.desc !== "")
        ?<Text
          style={{
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
          }}>
          {this.state.desc}
         </Text>
        :<VrButton></VrButton>
        }
        <VrButton onClick={()=> this.desc(this.state.index)}>
          <Image
            source={{uri:'https://thumbs.dreamstime.com/x/glassy-button-question-mark-24185998.jpg'}}
            style={{width: 0.5,
                    height: 0.5,
                    transform: [{translate: [5.1, 2.5, 0]},
                                {rotateY: -80}]}} />
        </VrButton>
        {(this.state.images.length > this.state.space)
        ? <VrButton onClick={()=> this.next()}>
           <Image
            source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzzy_3OCG4HsujWkupN29XNKPBrvBAOftMsiQdIT-7r4MgC4RKXw'}}
            style={{width: 0.3,
                    height: 0.3,
                    transform: [{translate: [-2.2, 2.5, -3]},
                                {rotateY: 0}]}} />
         </VrButton>
        :<VrButton></VrButton>
       }
        {(this.state.start > 0)
        ?<VrButton onClick={()=> this.back()}>
           <Image
            source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6vguGtVqUlynlSkdS0xu_Nhhf8UMJd69YBILsNUnLM4TLPa1x'}}
            style={{width: 0.3,
                    height: 0.3,
                    transform: [{translate: [-3.4, 2.5, -3]},
                                {rotateY: 0}]}} />
         </VrButton>
        :<VrButton></VrButton>
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

  closeDesc(){
    this.setState({
      desc:""
    })
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

  go(img,index){
    console.log(img.name);
    console.log(img.image);
    console.log(index);
    this.setState({
      roomName: img.name,
      room: img.image,
      index: index,
      desc: ""
    })
  }

  desc(i){
    if(this.state.desc === ""){
      this.setState({
        desc: this.state.images[i].description
      })
        console.log(i);
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


AppRegistry.registerComponent('reactVR', () => reactVR);
