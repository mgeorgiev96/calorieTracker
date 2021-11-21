import React from 'react'
import {Text,Surface } from 'react-native-paper'
import {TouchableOpacity} from 'react-native'
import {styles} from '../global/styles'
import AppLoading from 'expo-app-loading';
import { useFonts, Ruda_600SemiBold,Ruda_500Medium } from '@expo-google-fonts/ruda';
import { FontAwesome5 } from '@expo/vector-icons';
import {connect} from 'react-redux'
import EditPersonal from '../components/EditPersonal';

function Personal(props) {
    let [fontsLoaded] = useFonts({
        Ruda_600SemiBold,
        Ruda_500Medium
      });

      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
        <Surface style={styles.personalContainer}>
                    <Text style={{fontSize:25,width:"100%",textAlign:"center",paddingVertical:30,fontFamily:"Ruda_600SemiBold"}}>GOAL - {props.main.params.goalWeight} kg</Text>
                    <Surface style={{flex:1,shadowOpacity:0,alignItems:'center'}}>
                        <Surface style={styles.tabContainer}>
                            <Surface style={{...styles.innerTabContainer,borderTopWidth:1,borderColor:props.main.theme ? "grey" : "lightgrey",shadowOpacity:0}}>
                                <Surface style={{flexDirection:"row",alignItems:"center",shadowOpacity:0}}><EditPersonal type="weight" icon="weight" data="weight-number"/>
                                     <Text style={{marginLeft:10,fontFamily:"Ruda_600SemiBold"}}>CURRENT</Text>
                                </Surface>
                                <Text style={{fontFamily:"Ruda_600SemiBold"}}>{props.main.params.weight} kg</Text>
                            </Surface>
                        </Surface>
                        <Surface style={styles.tabContainer}>
                            <Surface style={{...styles.innerTabContainer,borderColor:props.main.theme ? "grey" : "lightgrey"}}>
                                <Surface style={{flexDirection:"row",alignItems:"center",shadowOpacity:0}}><TouchableOpacity><EditPersonal type="age" icon="calendar-alt"  data="number"/></TouchableOpacity>
                                     <Text style={{marginLeft:10,fontFamily:"Ruda_600SemiBold"}}>AGE</Text>
                                </Surface>
                                <Text style={{fontFamily:"Ruda_600SemiBold"}}>{props.main.params.age}</Text>
                            </Surface>
                        </Surface>
                        <Surface style={styles.tabContainer}>
                            <Surface style={{...styles.innerTabContainer,borderColor:props.main.theme ? "grey" : "lightgrey"}}>
                                <Surface style={{flexDirection:"row",alignItems:"center",shadowOpacity:0}}><TouchableOpacity  style={{shadowOpacity:0}}><EditPersonal type="gender" icon="user-alt"  data="string"/></TouchableOpacity>
                                     <Text style={{marginLeft:10,fontFamily:"Ruda_600SemiBold"}}>GENDER</Text>
                                </Surface>
                                <Text style={{fontFamily:"Ruda_600SemiBold"}}>{props.main.params.gender}</Text>
                            </Surface>
                        </Surface>
                        <Surface style={styles.tabContainer}>
                            <Surface style={{...styles.innerTabContainer,borderColor:props.main.theme ? "grey" : "lightgrey"}}>
                                <Surface style={{flexDirection:"row",alignItems:"center",shadowOpacity:0}}><TouchableOpacity><EditPersonal type="height" icon="arrow-up"  data="number"/></TouchableOpacity>
                                     <Text style={{marginLeft:10,fontFamily:"Ruda_600SemiBold"}}>HEIGHT</Text>
                                </Surface>
                                <Text style={{fontFamily:"Ruda_600SemiBold"}}>{props.main.params.height} cm</Text>
                            </Surface>
                        </Surface>
                        <Surface style={styles.tabContainer}>
                            <Surface style={{...styles.innerTabContainer,borderColor:props.main.theme ? "grey" : "lightgrey"}}>
                                <Surface style={{flexDirection:"row",alignItems:"center",shadowOpacity:0}}><TouchableOpacity><EditPersonal type="calories" icon="fire"  data="number"/></TouchableOpacity>
                                     <Text style={{marginLeft:10,fontFamily:"Ruda_600SemiBold"}}>CALORIES</Text>
                                </Surface>
                                <Text style={{fontFamily:"Ruda_600SemiBold"}}>{props.main.params.calories}</Text>
                            </Surface>
                        </Surface>
                        <Surface style={styles.tabContainer}>
                            <Surface style={{...styles.innerTabContainer,borderColor:props.main.theme ? "grey" : "lightgrey"}}>
                                <Surface style={{flexDirection:"row",alignItems:"center",shadowOpacity:0}}><TouchableOpacity><EditPersonal type="protein" icon="egg"  data="number"/></TouchableOpacity>
                                     <Text style={{marginLeft:10,fontFamily:"Ruda_600SemiBold"}}>PROTEIN</Text>
                                </Surface>
                                <Text style={{fontFamily:"Ruda_600SemiBold"}}>{props.main.params.protein} g</Text>
                            </Surface>
                        </Surface>
                        <Surface style={styles.tabContainer}>
                            <Surface style={{...styles.innerTabContainer,borderColor:props.main.theme ? "grey" : "lightgrey"}}>
                                <Surface style={{flexDirection:"row",alignItems:"center",shadowOpacity:0}}><TouchableOpacity><EditPersonal type="carbs" icon="bread-slice"  data="number"/></TouchableOpacity>
                                     <Text style={{marginLeft:10,fontFamily:"Ruda_600SemiBold"}}>CARBS</Text>
                                </Surface>
                                <Text style={{fontFamily:"Ruda_600SemiBold"}}>{props.main.params.carbs} g</Text>
                            </Surface>
                        </Surface>
                        <Surface style={styles.tabContainer}>
                            <Surface style={{...styles.innerTabContainer,borderColor:props.main.theme ? "grey" : "lightgrey"}}>
                                <Surface style={{flexDirection:"row",alignItems:"center",shadowOpacity:0}}>
                                    <TouchableOpacity><EditPersonal type="fat" icon="bacon" data="number"/></TouchableOpacity>
                                     <Text style={{marginLeft:10,fontFamily:"Ruda_600SemiBold"}}>FAT</Text>
                                </Surface>
                                <Text style={{fontFamily:"Ruda_600SemiBold"}}>{props.main.params.fat} g</Text>
                            </Surface>
                        </Surface>
                    </Surface>
                </Surface>
        );
      }
}


const mapStateToProps = state => {
    return {
        main: state.main
    }
}

export default connect(mapStateToProps)(Personal)
