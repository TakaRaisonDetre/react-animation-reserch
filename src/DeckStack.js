import React, {Component} from 'react'
import {View, Text, Animated, PanResponder, Dimensions} from 'react-native'



class DeckStack extends Component {

constructor(props){
    super(props);
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder :() =>true,
      onPanResponderMove: (event, gesture)=>{
          console.log(gesture)
      },
      onPanResponderRelease: ()=>{}
    });

    //this.panResponder = panResponder;
    this.state = {panResponder};
}


renderCards(){
  return  this.props.data.map(item =>{
        return this.props.renderCards(item)
    })
}



render(){
    return (
        <View>
            {this.renderCards()}
        </View>
    )
   }


}

export default DeckStack