import React,{useEffect,useState} from 'react'
import { Surface, Text } from 'react-native-paper'
import {Dimensions,TouchableOpacity} from "react-native"
import {styles} from '../global/styles'
import { VictoryBar, VictoryChart, VictoryTheme,VictoryAxis } from "victory-native";
import {connect} from 'react-redux'
import { FontAwesome5 } from '@expo/vector-icons';
import { Pedometer } from 'expo-sensors';
import * as ACTIONS from '../global/store/actions'


function Trends(props) {
    const [graph,setGraph] = useState([])
    const data = [
        { year: 'Mon', earnings: 8992 },
        { year: 'Tue', earnings: 7291 },
        { year: 'Wed', earnings: 9932 },
        { year: 'Thr', earnings: 5992 },
        { year: 'Fri', earnings: 8692 },
        { year: 'Sat', earnings: 7792 },
        { year: 'Sun', earnings: 6932 },
       ];
       let start = new Date() 
       let end  = new Date()

       start.setDate(start.getDate() - 1);
       end.setDate(end.getDate() - 1);

       start.setHours(0,0,0,0)
       end.setHours(23,59,59,999)




       useEffect(async () => {
           if(props.main.graph.length < 7){
            await Pedometer.getStepCountAsync(start, end).then(
                result => {
                    props.addGraph({day: 'Mon', earnings: result.steps})
                },
                error => {
                  this.setState({
                    pastStepCount: 'Could not get stepCount: ' + error,
                  });
                }
              );
              start = new Date() 
              end  = new Date()
              start.setDate(start.getDate() - 2);
              end.setDate(end.getDate() - 2);
       
              start.setHours(0,0,0,0)
              end.setHours(23,59,59,999)
    
              await Pedometer.getStepCountAsync(start, end).then(
                result => {
                    props.addGraph({day: 'Tue', earnings: result.steps})
                },
                error => {
                  this.setState({
                    pastStepCount: 'Could not get stepCount: ' + error,
                  });
                }
              );
              start = new Date() 
              end  = new Date()
              start.setDate(start.getDate() - 3);
              end.setDate(end.getDate() - 3);
       
              start.setHours(0,0,0,0)
              end.setHours(23,59,59,999)
    
              await Pedometer.getStepCountAsync(start, end).then(
                result => {
                    props.addGraph({day: 'Wed', earnings: result.steps})
                },
                error => {
                  this.setState({
                    pastStepCount: 'Could not get stepCount: ' + error,
                  });
                }
              );
              start = new Date() 
              end  = new Date()
              start.setDate(start.getDate() - 4);
              end.setDate(end.getDate() - 4);
       
              start.setHours(0,0,0,0)
              end.setHours(23,59,59,999)
    
              await Pedometer.getStepCountAsync(start, end).then(
                result => {
                    props.addGraph({day: 'Thr', earnings: result.steps})
                },
                error => {
                  this.setState({
                    pastStepCount: 'Could not get stepCount: ' + error,
                  });
                }
              );
              start = new Date() 
              end  = new Date()
              start.setDate(start.getDate() - 5);
              end.setDate(end.getDate() - 5);
       
              start.setHours(0,0,0,0)
              end.setHours(23,59,59,999)
    
             await Pedometer.getStepCountAsync(start, end).then(
                result => {
                    props.addGraph({day: 'Fri', earnings: result.steps})
                },
                error => {
                  this.setState({
                    pastStepCount: 'Could not get stepCount: ' + error,
                  });
                }
              );
              start = new Date() 
              end  = new Date()
              start.setDate(start.getDate() - 6);
              end.setDate(end.getDate() - 6);
       
              start.setHours(0,0,0,0)
              end.setHours(23,59,59,999)
    
              await Pedometer.getStepCountAsync(start, end).then(
                result => {
                    props.addGraph({day: 'Sat', earnings: result.steps})
                },
                error => {
                  this.setState({
                    pastStepCount: 'Could not get stepCount: ' + error,
                  });
                }
              );
              start = new Date() 
              end  = new Date()
              start.setDate(start.getDate() - 7);
              end.setDate(end.getDate() - 7);
       
              start.setHours(0,0,0,0)
              end.setHours(23,59,59,999)
    
              await Pedometer.getStepCountAsync(start, end).then(
                result => {
                    props.addGraph({day: 'Sun', earnings: result.steps})
                },
                error => {
                  this.setState({
                    pastStepCount: 'Could not get stepCount: ' + error,
                  });
                }
              );
           }
       }, [])
    return (
        <Surface style={{...styles.container,justifyContent:"flex-end"}}>
            <Surface style={{...styles.dateIndicator,borderColor:props.main.theme ? "grey" : "lightgrey"}}>
                <TouchableOpacity><FontAwesome5 name="chevron-left" size={35} color={props.main.theme ? "#C867FF" : "#00CAB1"}/></TouchableOpacity>
                    <Text style={{fontWeight:"bold",fontSize:30,color:props.main.theme? "white" : "black"}}>
                    WEEKLY
                    </Text>
                <TouchableOpacity><FontAwesome5 name="chevron-right" size={35} color={props.main.theme ? "#C867FF" : "#00CAB1"} /></TouchableOpacity>
            
            </Surface>
            <Surface style={{...styles.container,justifyContent:"flex-end"}}>
                    <VictoryChart  width={Dimensions.get("window").width + 30}
                    height={Dimensions.get("window").height / 1.5}
                    theme={VictoryTheme.material}

                    >
                        <VictoryAxis style={{ 
                            axis: {stroke: "transparent"}, 
                            ticks: {stroke: "transparent"},
                            tickLabels: { fill:"transparent"} 
                        }} />
                    <VictoryBar
                        barRatio={0.5}
                        animate={{ easing: 'exp' }}
                        style={{ data: { fill: props.main.theme ? "#C867FF" : "#00CAB1"},labels:{fill:props.main.theme ? "white" : "black"} }}
                        alignment="start"
                        data={props.main.graph} x="double" y="earnings"
                        labels={({ datum }) => `${datum.earnings}`}

                    />
                    </VictoryChart>
            </Surface>
        </Surface>
    )
}

const mapStateToProps = state =>{
    return {
        main: state.main
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        addGraph: (item) => dispatch(ACTIONS.addGraph(item))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Trends)
