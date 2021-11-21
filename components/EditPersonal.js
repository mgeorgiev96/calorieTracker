import React,{useState} from 'react'
import Modal from "react-native-modal";
import { Button, Text, Surface } from "react-native-paper";
import { TouchableOpacity,ScrollView,TextInput} from 'react-native';
import {styles} from '../global/styles'
import {FontAwesome5,MaterialCommunityIcons} from '@expo/vector-icons';
import {connect} from 'react-redux'
import { useFonts, Ruda_600SemiBold,Ruda_500Medium } from '@expo-google-fonts/ruda';
import AppLoading from 'expo-app-loading';
import * as ACTIONS from '../global/store/actions'
import NumericInput from 'react-native-numeric-input-counter'
import AsyncStorage from '@react-native-async-storage/async-storage';

function ShowMeal(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [val,setVAL] = useState(0)
  const [goal,setGoal] = useState(0)

  let [fontsLoaded] = useFonts({
    Ruda_600SemiBold,
    Ruda_500Medium
  });
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const saveData = async(type,data)=>{
    if(data==="weight-number"){
      let newObj = Object.assign({},props.main.params)
      newObj.goalWeight = goal
      newObj.weight = val
      await AsyncStorage.setItem("data",JSON.stringify(newObj))
      props.saveParam(newObj)
      setVAL(0)
      setGoal(0)
      toggleModal()
    }else{
      let newObj = Object.assign({},props.main.params)
      newObj[type] = val
      await AsyncStorage.setItem("data",JSON.stringify(newObj))
      props.saveParam(newObj)
      setVAL(0)
      toggleModal()
    }
  }

  if(!fontsLoaded){
    return <AppLoading/>
  }else{
    return (
      <Surface style={{justifyContent:"center",shadowOpacity:0}}>
        <TouchableOpacity onPress={toggleModal}><FontAwesome5 name={props.icon} size={30} color={props.main.theme ? "#C867FF" : "#00CAB1"} /></TouchableOpacity>
        <Modal isVisible={isModalVisible} style={{height:200}}>
          <Surface  style={{backgroundColor:"white",shadowOpacity:0}}>
            <Surface style={{padding:20,height:"auto"}}>
                <Text style={{...styles.modalText,fontFamily:"Ruda_600SemiBold"}}>{props.type.slice(0,1).toUpperCase()}{props.type.slice(1)}</Text>
                {props.data === "number" || props.data === "weight-number" ?  <NumericInput 
                            value={val} 
                            onChange={value => setVAL(value)} 
                            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                            totalWidth={200} 
                            totalHeight={50} 
                            iconSize={25}
                            step={1}
                            containerStyle={{marginVertical:20,alignSelf:"center"}}
                            valueType='real'
                            rounded 
                            textColor={props.main.theme ? "#C867FF" : "#00CAB1"}
                            iconStyle={{ color: 'white' }} 
                            rightButtonBackgroundColor={props.main.theme ? "#C867FF" : "#00CAB1"} 
                            leftButtonBackgroundColor={props.main.theme ? "#C867FF" : "#00CAB1"}/> : <TextInput onChangeText={val=>setVAL(val)} selectionColor={props.main.theme ? "#C867FF" : "#00CAB1"}  placeholderTextColor={props.main.theme ? "white" : "black"}
                            style={{...styles.mealName,color:props.main.theme ? "white" : "black",padding:15,marginTop:30}} placeholder="Enter..."></TextInput> }
                            {props.data === "weight-number" ? <Text style={{...styles.modalText,fontFamily:"Ruda_600SemiBold"}}>Goal Weight</Text> : null}
                    {props.data === "weight-number" ? <NumericInput 
                            value={goal} 
                            onChange={value => setGoal(value)} 
                            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                            totalWidth={200} 
                            totalHeight={50} 
                            iconSize={25}
                            step={1}
                            containerStyle={{marginVertical:20,alignSelf:"center"}}

                            valueType='real'
                            rounded 
                            textColor={props.main.theme ? "#C867FF" : "#00CAB1"}
                            iconStyle={{ color: 'white' }} 
                            rightButtonBackgroundColor={props.main.theme ? "#C867FF" : "#00CAB1"} 
                            leftButtonBackgroundColor={props.main.theme ? "#C867FF" : "#00CAB1"}/>: null}
            </Surface>
            <Surface style={{flexDirection:"row",justifyContent:"space-evenly",paddingBottom:20}}>
              <Button color={props.main.theme ? "#C867FF" : "#00CAB1"} labelStyle={{color:"white"}}  mode="contained" onPress={()=> saveData(props.type,props.data)} >SAVE</Button>
              <Button color={props.main.theme ? "#C867FF" : "#00CAB1"} labelStyle={{color:"white"}}  mode="contained" onPress={toggleModal} >CANCEL</Button>
            </Surface>
          </Surface>
        </Modal>
      </Surface>
    );
  }
}
const mapStateToProps = state =>{
  return {
    main: state.main
  }
}

const mapDispatchToProps = dispatch=>{
  return{
    addFood: (food)=> dispatch(ACTIONS.addFood(food)),
    removeMeal: (id)=> dispatch(ACTIONS.removeMeal(id)),
    saveParam: (param)=> dispatch(ACTIONS.saveParam(param))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ShowMeal);