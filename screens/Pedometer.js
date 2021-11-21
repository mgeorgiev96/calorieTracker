
import React from 'react';
import {Text, Surface } from 'react-native-paper';
import {styles} from '../global/styles'
import { Pedometer } from 'expo-sensors';
import {VictoryPie} from 'victory-native'
import {connect} from 'react-redux'
import { Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment'
import { TouchableOpacity } from 'react-native';
import * as ACTIONS from '../global/store/actions'

class App extends React.Component {
  
  state = {
    isPedometerAvailable: 'checking',
    pastStepCount: 0,
    currentStepCount: 0,
    steps: 0
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe()
  }

  changeDate = (type)=>{
    let start = new Date()
    let end = new Date()
    if(type==="i" && this.props.main.day < 0){
      start.setDate(start.getDate() - Math.abs(this.props.main.day + 1) );
      end.setDate(end.getDate() - Math.abs(this.props.main.day + 1) );
      this.props.incrementDay()
    } else if(type==="d"){
      start.setDate(start.getDate() - Math.abs(this.props.main.day - 1) );
      end.setDate(end.getDate() - Math.abs(this.props.main.day - 1) );
      this.props.decrementDay()
    }
    start.setHours(0,0,0,0)
    end.setHours(23,59,59,999)

    start.setUTCDate(end.getDate());
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        
        this.props.updateGraph({
          graph: [{ y:100 - ((result.steps/10000)*100) , x: 10000 - result.steps},
            { y:(result.steps/10000)*100 , x: result.steps}],
          time:((result.steps * 0.75)/60).toFixed(1),
          calories: Math.round(result.steps * 0.04),
          walked:(result.steps * 0.000762).toFixed(2)}
         )
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );
  }
  _subscribe = () => {
      this._subscription = Pedometer.watchStepCount(result => {
        if(this.props.main.day === 0){
          this.changeDate()
        }
        this.setState({
          currentStepCount: result.steps
        });
      });
  
      Pedometer.isAvailableAsync().then(
        result => {
          this.setState({
            isPedometerAvailable: String(result),
          });
        },
        error => {
          this.setState({
            isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
          });
        }
      );
  
      let start = new Date()
      let end = new Date()
  
      start.setDate(start.getDate());
      end.setDate(end.getDate());
  
      start.setHours(0,0,0,0)
      end.setHours(23,59,59,999)
      start.setUTCDate(end.getDate());
      Pedometer.getStepCountAsync(start, end).then(
        result => {
          this.props.updateGraph({
            graph: [{ y:100 - ((result.steps/10000)*100) , x:10000 -  result.steps},
              { y:(result.steps/10000)*100 , x: result.steps}],
           time:((result.steps * 0.75)/60).toFixed(1),
           calories: Math.round(result.steps * 0.04),
           walked:(result.steps * 0.000762).toFixed(2)}
          )
          this.setState({ pastStepCount: result.steps });
        },
        error => {
          this.setState({
            pastStepCount: 'Could not get stepCount: ' + error,
          });
        }
      );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };
  render() {
    return (

      <Surface style={{...styles.container}}>
        <Surface style={{...styles.container,justifyContent:"flex-start",width:"100%"}}>
        <Surface style={{...styles.dateIndicator,borderColor:this.props.main.theme ? "grey" : "lightgrey"}}>
          <TouchableOpacity onPress={()=>this.changeDate("d")}><FontAwesome5 name="chevron-left" size={35} color={this.props.main.theme ? "#C867FF" : "#00CAB1"}/></TouchableOpacity>
            <Text style={{fontWeight:"bold",fontSize:30,color:this.props.main.theme ? "white" : "black"}}>
              {this.props.main.day === 0 ? "TODAY" : moment().subtract(Math.abs(this.props.main.day),'days').format("ll")}
        </Text>
        <TouchableOpacity onPress={()=>this.changeDate("i")}><FontAwesome5 name="chevron-right" size={35} color={this.props.main.theme ? "#C867FF" : "#00CAB1"} /></TouchableOpacity>
          
        </Surface>
        <Text  style={{fontWeight:"bold",fontSize:30,color:this.props.main.theme ? "white" : "black",marginTop:20}}>{this.state.pastStepCount} STEPS</Text>
        <VictoryPie
            data={this.props.main.graphicData}
            width={Dimensions.get("window").width}
            height={350}
            innerRadius={100}
            colorScale={["lightgrey",this.props.main.theme ? "#C867FF" : "#00CAB1"]}
            style={{
            labels: {
            fill: this.props.main.theme ? "white" : "black", fontSize: 15, padding: 7,
            }, }}
            /> 
            <Surface  style={{flex:1,flexDirection:'row',alignItems:"center",justifyContent:"space-evenly",width:"100%",shadowOpacity:0}}>
              <Surface style={{flexDirection:'row',alignItems:"center",shadowOpacity:0}}>
                 <FontAwesome5 name="fire" size={24} color={this.props.main.theme ? "#C867FF" : "#00CAB1"} style={{marginRight:10}}/>
                 <Surface style={{shadowOpacity:0}}>
                   <Text style={{color:this.props.main.theme ? "white" : "black",fontWeight:'bold',textAlign:"center"}}>{this.props.main.burntCalories}</Text>
                   <Text style={{color:this.props.main.theme ? "white" : "black",fontWeight:"bold",textAlign:"center"}}>CAL</Text>
                 </Surface>
              </Surface>
              <Surface style={{flexDirection:'row',alignItems:"center",shadowOpacity:0}}>
                 <FontAwesome5 name="stopwatch" size={24} color={this.props.main.theme ? "#C867FF" : "#00CAB1"} style={{marginRight:10}}/>
                 <Surface style={{shadowOpacity:0}}>
                   <Text style={{color:this.props.main.theme ? "white" : "black",fontWeight:'bold',textAlign:"center"}}>{this.props.main.stepsWalked}</Text>
                   <Text style={{color:this.props.main.theme ? "white" : "black",fontWeight:"bold",textAlign:"center"}}>MIN</Text>
                 </Surface>
              </Surface>
              <Surface style={{flexDirection:'row',alignItems:"center",shadowOpacity:0}}>
                 <FontAwesome5 name="shoe-prints" size={24} color={this.props.main.theme ? "#C867FF" : "#00CAB1"} style={{marginRight:10}}/>
                 <Surface style={{shadowOpacity:0}}>
                   <Text style={{color:this.props.main.theme ? "white" : "black",fontWeight:'bold',textAlign:"center"}}>{this.props.main.kmPassed}</Text>
                   <Text style={{color:this.props.main.theme ? "white" : "black",fontWeight:"bold",textAlign:"center"}}>KM</Text>
                 </Surface>
              </Surface>
            </Surface>
            </Surface>
      </Surface>
    );
  }
}

const mapStateToProps = state =>{
  return {
    main:state.main
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    incrementDay: ()=> dispatch(ACTIONS.incrementDay()),
    decrementDay: ()=> dispatch(ACTIONS.decrementDay()),
    burntCalories: (calories)=> dispatch(ACTIONS.burntCalories(calories)),
    setTime: (time)=> dispatch(ACTIONS.setTime(time)),
    kmWalked: (km)=> dispatch(ACTIONS.kmWalked(km)),
    updateGraph: (graph)=> dispatch(ACTIONS.updateGraph(graph))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)