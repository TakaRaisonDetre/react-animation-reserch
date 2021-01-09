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
         position.setValue({x:gesture.dx ,y:gesture.dy });
      },
      onPanResponderRelease: ()=>{}
    });

    //this.panResponder = panResponder;
    this.state = {panResponder, position};
}
// rotation function and set transform property for rotation interpolation 
// transform property access an array and specify number of transform such as rotate
getCardStyle(){

   // interpolation 
   const {position} = this.state;

  const rotate = position.x.interpolate({
      inputRange: [-500, 0, 500],
      outputRange: ['-120deg', '0deg', '120deg']
  })

    return {
        ...position.getLayout(),
            transform:[{rotate: rotate}]
        };


}

renderCards(){
  return  this.props.data.map((item, index) =>{
      if(index ===0) {
          return (
              <Animated.View
              key={item.id}
              style={this.getCardStyle()}
              {...this.state.panResponder.panHandlers}
              >
                  {
                      this.props.renderCards(item)
                  }
              </Animated.View>
          )
      }
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