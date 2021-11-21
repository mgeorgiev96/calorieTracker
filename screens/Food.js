import React,{ useState} from 'react'
import { Surface, Text } from 'react-native-paper'
import {styles} from '../global/styles'
import {connect} from "react-redux"
import { Searchbar, Button, Card,Snackbar} from 'react-native-paper';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { IconButton } from 'react-native-paper';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import Meal from '../components/Meal'
import NumericInput from 'react-native-numeric-input-counter'
import * as ACTIONS from '../global/store/actions'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';


function Food(props) {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);
    const [nutrition,setNutrition] = useState(false)
    const [grams,setGrams] = useState(100)
    const [visible,setVisible] = useState(false)
    const [type,typeAdd] = useState("")
    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const addNewFood = (food)=>{
        props.addFood(food)
        typeAdd("meal")
        onToggleSnackBar()
    }

    const addMacro = async (nutrients)=>{
        let params = Object.assign({},props.main.params)
        params.currentCalories += parseFloat(nutrients.calories)
        params.currentProtein += parseFloat(nutrients.protein)
        params.currentCarbs += parseFloat(nutrients.carbs)
        params.currentFat += parseFloat(nutrients.fat)

        await AsyncStorage.setItem("data",JSON.stringify(params))

        props.saveParam(params)
        typeAdd("macros")
        onToggleSnackBar()

    }

    const getNutrition = ()=>{
        axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${searchQuery}&app_id=863d9db5&app_key=7e37b71c0bf79ca69735e529a105c322`).then((res)=>{
            if(res.data.hints.length > 0) setNutrition(JSON.parse(JSON.stringify(res.data.hints[0].food)))
        })
    }

    return (
        <Surface style={styles.container}>

            <Surface style={styles.searchContainerMain}>
            <Meal/>
                <Surface  style={styles.searchContainer}>

                    <Searchbar
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={{borderColor:'lightgrey',borderWidth:1,width:"83%"}}
                    />
                    <IconButton
                        icon="silverware-fork-knife"
                        color={props.main.theme ? "#C867FF" : "#00CAB1"}
                        size={30}
                        style={styles.searchButton}
                        onPress={() => getNutrition()}
                    />
                </Surface>
                {!nutrition ?<TouchableWithoutFeedback onPress={Keyboard.dismiss}><Text style={{color:"red",fontWeight:"bold",fontSize:18,marginTop:20,flex:1}}>No Matches.</Text></TouchableWithoutFeedback> :
                 <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                       <Surface style={{width:"100%",marginTop:15,shadowOpacity:0}}>
                    <Surface style={{padding: 5,borderRadius:5,shadowOpacity:0}}>
                        <Text style={{alignSelf:"center",fontWeight:"bold",fontSize:25}}>{nutrition.label}</Text>
                        <NumericInput 
                            value={grams} 
                            onChange={value => setGrams(value)} 
                            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                            totalWidth={200} 
                            totalHeight={50} 
                            iconSize={25}
                            step={1}
                            containerStyle={{marginVertical:20,alignSelf:"center"}}
                            minValue={1}
                            maxValue={1000}
                            valueType='real'
                            rounded 
                            textColor={props.main.theme ? "#C867FF" : "#00CAB1"}
                            iconStyle={{ color: 'white' }} 
                            rightButtonBackgroundColor={props.main.theme ? "#C867FF" : "#00CAB1"} 
                            leftButtonBackgroundColor={props.main.theme ? "#C867FF" : "#00CAB1"}/>
                        <Card.Cover style={{borderColor:"lightgrey",borderWidth:2,borderRadius:5,borderBottomLeftRadius:0,borderBottomRightRadius:0}} source={{ uri: nutrition.image }} />
                        <Card.Actions style={styles.cardAction}>
                            <Surface style={{shadowOpacity:0}}>
                                <Button labelStyle={{fontSize:13,color:"white"}} onPress={()=> addNewFood({
                                    name: `${nutrition.label} - ${grams}g`,
                                    calories: ((nutrition.nutrients.ENERC_KCAL/100) * grams).toFixed(0),
                                    protein: ((nutrition.nutrients.PROCNT/100) * grams).toFixed(2),
                                    carbs: ((nutrition.nutrients.CHOCDF/100) * grams).toFixed(2),
                                    fat: ((nutrition.nutrients.FAT/100) * grams).toFixed(2),
                                    id: uuid.v4()
                                })} style={{backgroundColor:props.main.theme ? "#C867FF" : "#00CAB1",marginHorizontal:10}} mode="contained">ADD to Meal</Button>
                                <Button onPress={()=> addMacro({
                                    name: `${nutrition.label} - ${grams}g`,
                                    calories: ((nutrition.nutrients.ENERC_KCAL/100) * grams).toFixed(0),
                                    protein: ((nutrition.nutrients.PROCNT/100) * grams).toFixed(2),
                                    carbs: ((nutrition.nutrients.CHOCDF/100) * grams).toFixed(2),
                                    fat: ((nutrition.nutrients.FAT/100) * grams).toFixed(2),
                                    id: uuid.v4()
                                })} labelStyle={{fontSize:13,color:"white"}} style={{backgroundColor:props.main.theme ? "#C867FF" : "#00CAB1",marginHorizontal:10,marginVertical:10}} mode="contained">Add to Macros</Button>
                            </Surface>
                            <Surface style={{flexDirection:"column",marginBottom:10,shadowOpacity:0}}>
                                <Surface style={{flexDirection:"row",alignItems:"center",margin:12,shadowOpacity:0}}>
                                    <FontAwesome5 name="fire" size={18} color={props.main.theme ? "#C867FF" : "#00CAB1"} />
                                    <Text style={{paddingHorizontal:5,fontWeight:'bold'}}>{((nutrition.nutrients.ENERC_KCAL/100) * grams).toFixed(0)}</Text>
                                </Surface>
                                <Surface style={{flexDirection:"row",alignItems:"center",margin:12,shadowOpacity:0}}>
                                    <FontAwesome5 name="egg" size={18} color={props.main.theme ? "#C867FF" : "#00CAB1"} />
                                    <Text style={{paddingHorizontal:5,fontWeight:'bold'}}>{((nutrition.nutrients.PROCNT/100) * grams).toFixed(2)}</Text>
                                </Surface>
                            </Surface>
                            <Surface style={{flexDirection:"column",marginBottom:10,shadowOpacity:0}}>
                                <Surface style={{flexDirection:"row",alignItems:"center",margin:12,shadowOpacity:0}}>
                                    <FontAwesome5 name="bread-slice" size={18} color={props.main.theme ? "#C867FF" : "#00CAB1"} />
                                    <Text style={{paddingHorizontal:5,fontWeight:'bold'}}>{((nutrition.nutrients.CHOCDF/100) * grams).toFixed(2)}</Text>
                                </Surface>
                                <Surface style={{flexDirection:"row",alignItems:"center",margin:12,shadowOpacity:0}}>
                                    <FontAwesome5 name="bacon" size={18} color={props.main.theme ? "#C867FF" : "#00CAB1"} />
                                    <Text style={{paddingHorizontal:5,fontWeight:'bold'}}>{((nutrition.nutrients.FAT/100) * grams).toFixed(2)}</Text>
                                </Surface>
                            </Surface>
                        </Card.Actions>
                    </Surface>
                    <Snackbar
                               duration={1300}
                                visible={visible}
                                style={{backgroundColor:"black",zIndex:6}}
                                onDismiss={onDismissSnackBar}
                                theme={{colors:{accent:props.main.theme ? "#C867FF" : "#00CAB1",surface:props.main.theme ? "#C867FF" : "#00CAB1"}}}>
                                Added to {type}.
                            </Snackbar>
                    </Surface>
                    
                 </TouchableWithoutFeedback>}
            </Surface>
        </Surface>
    )
}
const mapStateToProps = state => {
    return {
        main: state.main
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        addFood: (food)=> dispatch(ACTIONS.addFood(food)),
        saveParam: (param)=> dispatch(ACTIONS.saveParam(param))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Food)
