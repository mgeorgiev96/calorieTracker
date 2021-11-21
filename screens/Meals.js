import React,{useEffect} from 'react';
import { Surface } from 'react-native-paper';
import {connect} from 'react-redux'
import AppLoading from 'expo-app-loading';
import { useFonts, Ruda_600SemiBold,Ruda_500Medium } from '@expo-google-fonts/ruda';
import ShowMeal from '../components/ShowMeal'
import AsyncStorage from "@react-native-async-storage/async-storage"

function Meals(props) {
    useEffect(async()=>{
        const prot = await AsyncStorage.getItem("data")
    })
    let [fontsLoaded] = useFonts({
        Ruda_600SemiBold,
        Ruda_500Medium
      });
      if(!fontsLoaded){
          return <AppLoading/>
      }else{
        return (
            <Surface style={{flex:1}}>
                <ShowMeal/>
            </Surface>
        )
      }
}
const mapStateToProps = (state) =>{
    return{
        main:state.main
    }
}
export default connect(mapStateToProps)(Meals)


