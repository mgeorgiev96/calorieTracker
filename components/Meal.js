import React,{useState} from 'react'
import Modal from "react-native-modal";
import { Button, Text, Surface } from "react-native-paper";
import { TouchableOpacity,ScrollView,TextInput} from 'react-native';
import {styles} from '../global/styles'
import { MaterialIcons,FontAwesome5} from '@expo/vector-icons';
import {connect} from 'react-redux'
import { useFonts, Ruda_600SemiBold,Ruda_500Medium } from '@expo-google-fonts/ruda';
import AppLoading from 'expo-app-loading';
import * as ACTIONS from '../global/store/actions'
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Meal(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [mealName,setMealName] = useState("")

  let [fontsLoaded] = useFonts({
    Ruda_600SemiBold,
    Ruda_500Medium
  });
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addNewMeal = async ()=>{
    let params = Object.assign(props.main.params)
    const meal = {mealName,
      ingredients:props.main.currentMeal,
      calories:props.main.totalCalories,
      protein:props.main.totalProtein,
      carbs:props.main.totalCarbs,
      fat:props.main.totalFat,
      id:uuid.v4()}
    params.meals = [...params.meals,meal]
    await AsyncStorage.setItem("data",JSON.stringify(params))
    props.addMeal(meal)
    toggleModal()
  }

  if(!fontsLoaded){
    return <AppLoading/>
  }else{
    return (
      <Surface style={{shadowOpacity:0}}>
        <TouchableOpacity style={{...styles.addMeal,backgroundColor:props.main.theme ? "#C867FF" : "#00CAB1"}} onPress={toggleModal}>
          <MaterialIcons style={{marginRight:5}} name="dinner-dining" size={24} color="white" />
          <Text style={{color:"white"}}>ADD MEAL</Text>
        </TouchableOpacity>
  
        <Modal isVisible={isModalVisible} style={{height:200}}>
          <Surface style={{shadowOpacity:0}}>
            <Surface style={{padding:20,height:"91%",shadowOpacity:0}}>
              <TextInput onChangeText={val=>setMealName(val)} selectionColor={props.main.theme ? "#C867FF" : "#00CAB1"}  placeholderTextColor={props.main.theme ? "white" : "black"}
                style={{...styles.mealName,color:props.main.theme ? "white" : "black"}} placeholder="Meal Name..."></TextInput>
              <Text style={{alignSelf:"center",marginVertical:15,fontSize:20,fontWeight:"bold",fontFamily:"Ruda_600SemiBold"}}>Ingredients</Text>
              <ScrollView>
                {props.main.currentMeal.map(item=>{
                                 return  <Surface key={uuid.v4()} style={{flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100%",paddingBottom:5,shadowOpacity:0}}>
                                  <Surface style={{justifyContent:'center',width:"auto",marginLeft:10,paddingHorizontal:10,alignItems:"center"}}>
                                    <Text style={{marginVertical:5,fontFamily:"Ruda_600SemiBold"}}>{item.name}</Text>
                                    
                                    <Surface style={{flexDirection:"row",shadowOpacity:0}}>
                                        <Surface style={{shadowOpacity:0}}>
                                          <Text style={{margin:5,fontFamily:"Ruda_600SemiBold"}}><FontAwesome5 style={{marginRight:5}} name="fire" size={15} color={props.main.theme ? "#C867FF" : "#00CAB1"} />  CAL - {item.calories}</Text>
                                          <Text style={{margin:5,fontFamily:"Ruda_600SemiBold"}}><FontAwesome5 style={{marginRight:5}} name="egg" size={15} color={props.main.theme ? "#C867FF" : "#00CAB1"} />  PROT - {item.protein}</Text>
                                        </Surface>
                                        <Surface style={{shadowOpacity:0}}>
                                          <Text style={{margin:5,fontFamily:"Ruda_600SemiBold"}}><FontAwesome5 style={{marginRight:5}} name="bread-slice" size={15} color={props.main.theme ? "#C867FF" : "#00CAB1"} />  CARBS - {item.carbs}</Text>
                                          <Text style={{margin:5,fontFamily:"Ruda_600SemiBold"}}><FontAwesome5 style={{marginRight:5}} name="bacon" size={15} color={props.main.theme ? "#C867FF" : "#00CAB1"} />  FAT - {item.fat}</Text>
                                        </Surface>
                                    </Surface>
                                    <TouchableOpacity style={{alignSelf:"center",marginVertical:7}} onPress={()=>props.removeIngr(item.id)}>
                                            <FontAwesome5 name="times-circle" size={24} color={props.main.theme ? "#C867FF" : "#00CAB1"} />
                                        </TouchableOpacity>
                                  </Surface>
                                </Surface>
                })}
              </ScrollView>
            </Surface>
            <Surface style={{flexDirection:"row",justifyContent:"center",paddingBottom:20,shadowOpacity:0}}>
              <Button  color={props.main.theme ? "#C867FF" : "#00CAB1"} labelStyle={{color:"white"}}  mode="contained" onPress={addNewMeal} style={{marginRight:10,zIndex:3}} >SAVE</Button>
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

const mapDispatchToProps = dispatch =>{
  return {
    addMeal: (meal)=> dispatch(ACTIONS.addMeal(meal)),
    removeIngr: (id)=> dispatch(ACTIONS.removeIngr(id))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Meal);