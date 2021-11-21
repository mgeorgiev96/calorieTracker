import React,{useState} from 'react'
import Modal from "react-native-modal";
import { Button, Text, Surface,Snackbar} from "react-native-paper";
import { TouchableOpacity,ScrollView} from 'react-native';
import {styles} from '../global/styles'
import {FontAwesome5,MaterialCommunityIcons} from '@expo/vector-icons';
import {connect} from 'react-redux'
import { useFonts, Ruda_600SemiBold,Ruda_500Medium } from '@expo-google-fonts/ruda';
import AppLoading from 'expo-app-loading';
import * as ACTIONS from '../global/store/actions'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';

function ShowMeal(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [visible,setVisible] = useState(false)
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [curMeal,setCurMeal] = useState({
    name:"",
    calories:"",
    protein:"",
    carbs:"",
    fat:"",
    ingredients: []
  })
  let [fontsLoaded] = useFonts({
    Ruda_600SemiBold,
    Ruda_500Medium
  });
  const rMeal = async (id)=>{
    let params = props.main.params
    params.meals = params.meals.filter(i=>i.id!==id)
    await AsyncStorage.setItem("data",JSON.stringify(params))
    props.removeMeal(id)
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const showCurMeal = (meal)=>{
    setCurMeal(meal)
    toggleModal()
  }

  const addToMacro= async ()=>{
    let params = props.main.params
    params.currentCalories += parseFloat(curMeal.calories)
    params.currentProtein += parseFloat(curMeal.protein)
    params.currentCarbs += parseFloat(curMeal.carbs)
    params.currentFat += parseFloat(curMeal.fat)
    await AsyncStorage.setItem("data",JSON.stringify(params))

    props.saveParam(params)
    toggleModal()
    onToggleSnackBar()
  }

  if(!fontsLoaded){
    return <AppLoading/>
  }else{
    return (
      <Surface style={{justifyContent:"center",shadowOpacity:0}}>
        {props.main.params.meals ? props.main.params.meals.map(item=>{

          return <TouchableOpacity key={uuid.v4()} onPress={()=>showCurMeal(item)}>
                  <Surface style={{...styles.mealItem,borderColor:props.main.theme ? "grey" : "lightgrey"}}>
                      <Surface style={{flexDirection:"row",alignItems:'center',shadowOpacity:0}}>
                          <MaterialCommunityIcons style={{alignSelf:'center',marginRight:25,marginLeft:5}} name="food-variant" size={24} color={props.main.theme ? "#C867FF" : "#00CAB1"} />
                          <Surface style={{shadowOpacity:0}}>
                              <Text style={{fontFamily:"Ruda_600SemiBold",fontSize:20}}>{item.mealName}</Text>
                              <Text style={{fontFamily:"Ruda_500Medium",color:props.main.theme ? "lightgrey" : "grey"}}>{item.calories} kcal</Text>
                          </Surface>
                      </Surface>
                      <TouchableOpacity onPress={()=>rMeal(item.id)} style={{alignSelf:'center'}}><FontAwesome5 name="times-circle" size={28} color={props.main.theme ? "#C867FF" : "#00CAB1"} /></TouchableOpacity>
                  </Surface>
              </TouchableOpacity>
        }):null}
        <Modal isVisible={isModalVisible} style={{height:200}}>
          <Surface  style={{backgroundColor:"white",shadowOpacity:0}}>
            <Surface style={{padding:20,height:"91%",shadowOpacity:0}}>
              <Text style={{alignSelf:"center",marginVertical:15,fontSize:20,fontWeight:"bold",fontFamily:"Ruda_600SemiBold",shadowOpacity:0}}>{curMeal.mealName}</Text>
                <Surface style={{flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100%",borderBottomWidth:1,borderBottomColor:"lightgrey",paddingBottom:5,shadowOpacity:0}}>
                    <Surface style={{justifyContent:'center',width:"auto",marginLeft:10,paddingHorizontal:10,alignItems:"center",shadowOpacity:0}}>
                      <Surface style={{flexDirection:"row",shadowOpacity:0}}>
                          <Surface style={{shadowOpacity:0}}>
                            <Text style={{margin:10,fontFamily:"Ruda_600SemiBold"}}><FontAwesome5 style={{marginRight:5}} name="fire" size={15} color={props.main.theme ? "#C867FF" : "#00CAB1"} />  CAL - {curMeal.calories}</Text>
                            <Text style={{margin:10,fontFamily:"Ruda_600SemiBold"}}><FontAwesome5 style={{marginRight:5}} name="egg" size={15} color={props.main.theme ? "#C867FF" : "#00CAB1"} />  PROT - {curMeal.protein}</Text>
                          </Surface>
                          <Surface style={{shadowOpacity:0}}>
                            <Text style={{margin:10,fontFamily:"Ruda_600SemiBold"}}><FontAwesome5 style={{marginRight:5}} name="bread-slice" size={15} color={props.main.theme ? "#C867FF" : "#00CAB1"} />  CARBS - {curMeal.carbs}</Text>
                            <Text style={{margin:10,fontFamily:"Ruda_600SemiBold"}}><FontAwesome5 style={{marginRight:5}} name="bacon" size={15} color={props.main.theme ? "#C867FF" : "#00CAB1"} />  FAT - {curMeal.fat}</Text>
                          </Surface>

                      </Surface>

                    </Surface>
                  </Surface>
              <Text style={{alignSelf:"center",marginVertical:15,fontSize:20,fontWeight:"bold",fontFamily:"Ruda_600SemiBold"}}>Ingredients</Text>
              <ScrollView>
                {curMeal.ingredients.map((i)=>{
                  return<Surface key={uuid.v4()} style={{flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100%",borderBottomWidth:1,borderBottomColor:"lightgrey",paddingBottom:5,shadowOpacity:0}}>
                  <Surface style={{justifyContent:'center',width:"auto",marginLeft:10,paddingHorizontal:10,alignItems:"center",shadowOpacity:0}}>
                    <Text style={{marginVertical:5,fontFamily:"Ruda_600SemiBold"}}>{i.name}</Text>
                    <Surface style={{flexDirection:"row",shadowOpacity:0}}>
                        <Surface style={{shadowOpacity:0}}>
                          <Text style={{margin:10,fontFamily:"Ruda_600SemiBold"}}><FontAwesome5 style={{marginRight:5}} name="fire" size={15} color={props.main.theme ? "#C867FF" : "#00CAB1"} />  CAL - {i.calories}</Text>
                          <Text style={{margin:10,fontFamily:"Ruda_600SemiBold"}}><FontAwesome5 style={{marginRight:5}} name="egg" size={15} color={props.main.theme ? "#C867FF" : "#00CAB1"} />  PROT - {i.protein}</Text>
                        </Surface>
                        <Surface style={{shadowOpacity:0}}>
                          <Text style={{margin:10,fontFamily:"Ruda_600SemiBold"}}><FontAwesome5 style={{marginRight:5}} name="bread-slice" size={15} color={props.main.theme ? "#C867FF" : "#00CAB1"} />  CARBS - {i.carbs}</Text>
                          <Text style={{margin:10,fontFamily:"Ruda_600SemiBold"}}><FontAwesome5 style={{marginRight:5}} name="bacon" size={15} color={props.main.theme ? "#C867FF" : "#00CAB1"} />  FAT - {i.fat}</Text>
                        </Surface>

                    </Surface>

                  </Surface>
                </Surface>
                })}
              </ScrollView>
            </Surface>
            <Surface style={{flexDirection:"row",justifyContent:"center",paddingBottom:20}}>
              <Button onPress={()=>addToMacro()} labelStyle={{color:"white"}} color={props.main.theme ? "#C867FF" : "#00CAB1"}  mode="contained" style={{marginRight:20}}>Add to macros</Button>
              <Button color={props.main.theme ? "#C867FF" : "#00CAB1"} labelStyle={{color:"white"}}  mode="contained" onPress={toggleModal} >CLOSE</Button>
            </Surface>
          </Surface>
          <Snackbar
                duration={1300}
                visible={visible}
                style={{backgroundColor:"black"}}
                onDismiss={onDismissSnackBar}
                theme={{colors:{accent:props.main.theme ? "#C867FF" : "#00CAB1",surface:props.main.theme ? "#C867FF" : "#00CAB1"}}}>
                Added to macros.
          </Snackbar>
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
    saveParam: (params) => dispatch(ACTIONS.saveParam(params))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ShowMeal);