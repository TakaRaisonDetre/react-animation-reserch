import React, {Component} from 'react'
import {View, Text, Animated, PanResponder, Dimensions} from 'react-native'



class DeckStack extends Component {

constructor(props){
    super(props);

    // animated valueXY, I do not pass any default x and y value on it
    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder :() =>true,
      // when draggin finger on screen and hand off the gesture objec to animated system 
      onPanResponderMove: (event, gesture)=>{
         position.setValue({x:gesture.dx ,y:gesture.dx });
      },
      onPanResponderRelease: ()=>{}
    });

    //this.panResponder = panResponder;
    this.state = {panResponder, position};
}


renderCards(){
  return  this.props.data.map(item =>{
        return this.props.renderCards(item)
    })
}



render(){
    return (
        <Animated.View
        style={this.state.position.getLayout()}
        {...this.state.panResponder.panHandlers}>
            {this.renderCards()}
        </Animated.View>
    )
   }


}

export default DeckStack