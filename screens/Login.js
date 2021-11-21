import React,{useEffect,useState} from 'react'
import {TouchableWithoutFeedback, Keyboard,StatusBar,View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Formik} from 'formik'
import { TextInput ,Button, Text,ActivityIndicator,Surface } from 'react-native-paper';
import { styles } from '../global/styles'
import * as Yup from 'yup'
import {connect} from 'react-redux'
import * as ACTIONS from '../global/store/actions'
import moment from 'moment'


const usernameSchema = Yup.object({
    username:Yup.string().min(6).max(25)
})

console.disableYellowBox = true

function Login(props) {
    const [errorSubmit,setErrorSubmit] = useState(false)
    const [errorMsg,setErrorMsg] = useState("")
    const [authenticate,setAuthenticate] = useState(true)
    const [getUser,setUser] = useState(false)
    const setSession = async (username)=>{
        await AsyncStorage.setItem("session",username)
        setUser(!getUser)
    }

    useEffect(async ()=>{
        const session = await AsyncStorage.getItem("session")
        if(session === null){
            const sampleData = {
                calories: 2500,
                protein: 190,
                carbs: 330,
                fat: 45,
                height: 180,
                gender: "Male",
                weight: 90,
                goalWeight: 85,
                age: 25,
                currentProtein:0,
                currentCarbs:0,
                currentFat:0,
                currentCalories:0,
                currentDate: moment(new Date()).format("L"),
                meals: []
                
            }
            await AsyncStorage.setItem("data",JSON.stringify(sampleData))
            props.setSessionData(session)
            props.saveParam(sampleData)
            setAuthenticate(false)
       }
       else{
        props.setSessionData(session)
        const data = await AsyncStorage.getItem("data")
        let parsedData = JSON.parse(data)
        let dateToday = moment(new Date()).format("L")
        if(parsedData.currentDate !==  dateToday){
            parsedData.currentDate = dateToday
            parsedData.currentProtein=0
            parsedData.currentCarbs=0
            parsedData.currentFat=0
            parsedData.currentCalories=0
            await AsyncStorage.setItem("data",JSON.stringify(parsedData))
        }
        props.saveParam(parsedData)
        setAuthenticate(false)
       }
    },[getUser])

    return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {authenticate ?  <Surface style={{...styles.container,justifyContent:"center"}}>
                <ActivityIndicator  size={100} color={props.main.theme ? "#C867FF" : "#00CAB1"} />
            </Surface> :
            <Surface style={{flex: 1,paddingTop: StatusBar.currentHeight,justifyContent:'center',alignItems:"center"}}>
            <Formik
            style={styles.mainLoginContainer}
            validationSchema={usernameSchema}
            initialValues={{username:"",password:""}}
            onSubmit={(values)=>{
                setSession(values.username)
            }}>
                        {(formik) => (
                        <View style={styles.formContainer}>
                            <TextInput
                            onTextInput={()=>setErrorSubmit(false)}
                            onChangeText={formik.handleChange('username')}
                            onBlur={formik.handleBlur('username')}
                            value={formik.values.username}
                            placeholder="Username..."
                            leftIcon={{ type: 'font-awesome-5', name: 'user'}}
                            />
                            {formik.errors.username && formik.touched.username ? <Text style={{color:"red"}}>{formik.errors.username}</Text>:null}
                            <Button color={props.main.theme ? "#C867FF" : "#00CAB1"} labelStyle={{color:"white"}} onPress={formik.handleSubmit} mode="contained">
                                LOGIN
                            </Button>
                        </View>
                        )}
            </Formik>
        </Surface>}
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = state =>{
    return {
        main: state.main
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        setSessionData: session => dispatch(ACTIONS.setSessionData(session)),
        saveParam: params => dispatch(ACTIONS.saveParam(params))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)