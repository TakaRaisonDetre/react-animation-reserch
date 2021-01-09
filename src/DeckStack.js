import React, {Component} from 'react'
import {View, 
    Text, 
    Animated, 
    PanResponder, 
    Dimensions,
    LayoutAnimation,
    UIManager
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class DeckStack extends Component {

//Parent component does not pass the onSwipeLeft or onSwipeRight function props so then the default prop system would be appropriate for this case
static defaultProps ={
    onSwipeRight : ()=>{},
    onSwipeLeft : ()=>{},
}


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
      onPanResponderRelease: (event, gesture)=>{
        if(gesture.dx > SWIPE_THRESHOLD) {
            console.log('swipe right!')
            this.forceSwipe('right')
        } else if(gesture.dx < -SWIPE_THRESHOLD) {
            console.log('swipe left!')
            this.forceSwipe('left')
      } else {
        this.resetPosition();
      }
     
    }
    });

    //this.panResponder = panResponder;
    this.state = {panResponder, position, index:0};
}

componentWillUpdate(){
    // Piku piku Effect
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    LayoutAnimation.spring();
}


forceSwipe(direction){

    const x = direction ==='right'? SCREEN_WIDTH : -SCREEN_WIDTH
    // timing is slighlyd different from spring how things are moving, timing is slighly smoothier
    Animated.timing(this.state.position, {
        toValue: {x : x, y:0 },
        duration: SWIPE_OUT_DURATION // millisecond
    }).start(()=> this.onSwipeComplete(direction))
}

onSwipeComplete(direction){
    // we have not yet pass these props to the component we want to have a function called back when user swipe
 const {onSwipeLeft, onSwipeRight, data} = this.props
const item = data[this.state.index];

 direction === 'right'? onSwipeRight(item) :onSwipeLeft(item); 
 // forcibly reset the positino of x and y
 this.state.position.setValue({x: 0, y:0});
 this.setState({ index: this.state.index+1});
}


resetPosition(){
    Animated.spring(this.state.position, {
        toValue: {x:0, y:0}
    }).start();
}

// rotation function and set transform property for rotation interpolation 
// transform property access an array and specify number of transform such as rotate
getCardStyle(){

   // interpolation 
   const {position} = this.state;

  const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH *1.5, 0, SCREEN_WIDTH *1.5],
      outputRange: ['-120deg', '0deg', '120deg']
  })

    return {
        ...position.getLayout(),
            transform:[{rotate: rotate}]
        };


}

renderCards(){

 if(this.state.index >= this.props.data.length){
     return this.props.renderNoMoreCards();
 }

  return  this.props.data.map((item, i) =>{
    
    if(i < this.state.index) { return null ;}
    
    
    if(i ===this.state.index) {
          return (
              <Animated.View
              key={item.id}
              style={[this.getCardStyle(), styles.cardStyle]}
              {...this.state.panResponder.panHandlers}
              >
                  {
                      this.props.renderCards(item)
                  }
              </Animated.View>
          )
      }
      
        return (
            <Animated.View 
            key={item.id}
             style={[styles.cardStyle, {top :10 * (i-this.state.index)}]}>
                {this.props.renderCards(item)}
            </Animated.View>
            
        )
    }).reverse();
}



render(){
    return (
        <View>
            {this.renderCards()}
        </View>
    )
   }


}

const styles = {
    cardStyle :{
        position :'absolute',
        width:SCREEN_WIDTH
    }
};


export default DeckStack