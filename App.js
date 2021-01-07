import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Card, Button} from 'react-native-elements'
import Deck from './src/Deck'

const DATA = [
  { id: 1, text: 'Card #1', uri: "https://picsum.photos/200/300?grayscale"},
  { id: 2, text: 'Card #2', uri: 'https://picsum.photos/200/300?grayscale' },
  { id: 3, text: 'Card #3', uri: 'https://picsum.photos/200/300?grayscale' },
  { id: 4, text: 'Card #4', uri: 'https://picsum.photos/200/300?grayscale' },
  { id: 5, text: 'Card #5', uri: 'https://picsum.photos/200/300?grayscale' },
  { id: 6, text: 'Card #6', uri: 'https://picsum.photos/200/300?grayscale' },
  { id: 7, text: 'Card #7', uri: 'https://picsum.photos/200/300?grayscale' },
  { id: 8, text: 'Card #8', uri: 'https://picsum.photos/200/300?grayscale' },
];

class App extends React.Component  {
  
  renderCard(item){
    return (
    <Card 
    key={item.id}
    title={item.text}
    
    >     
    <Image style={styles.img} source={{uri:item.uri}}/>
<Text>Ican customize</Text>
<Button
          icon={{name:'code'}}
          backgroundColor = "#03A9F4"
          title="View Now"
        />
    </Card>
     
      
     

     
    )
  }
  render(){
    return (
      <View style={styles.container}>
         <Deck
          data={DATA}
          renderCards ={this.renderCard}
         />
      </View>
     
     );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  img :{
    height:150,
    width:'100%'
  }
});

export default App
