import React from 'react'
import { View, Text , Animated} from 'react-native'

class  Ball extends React.Component {
 
componentWillMount(){
    this.position = new Animated.ValueXY(0,0);
    Animated.spring(this.position,{
        toValue: {x: 300, y:400}
    }).start();
}


 render(){
    return (
        <Animated.View style={this.position.getLayout()}>
            <View style={styles.ball}/>
        </Animated.View>
    )
 }
    
}


const styles ={
    ball: {
        height:60,
        width:60,
        borderRadius:30,
        borderWidth:30,
        borderColor:'grey'
    }
}

export default Ball;


