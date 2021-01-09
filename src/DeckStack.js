import React, {Component} from 'react'
import {View, Text, Animated, PanResponder, Dimensions} from 'react-native'



class DeckStack extends Component {




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