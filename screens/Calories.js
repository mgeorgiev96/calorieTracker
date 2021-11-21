import React from 'react'
import { Surface, Text } from 'react-native-paper'
import {styles} from '../global/styles'
  import {VictoryPie} from 'victory-native'
  import {connect} from 'react-redux'
  import { FontAwesome5 } from '@expo/vector-icons';



function Food(props) {
  const protein = [
    { y: (100 - (props.main.params.currentProtein/props.main.params.protein)*100), x: props.main.params.protein.toFixed(0)},
    { y: (props.main.params.currentProtein/props.main.params.protein)*100, x: props.main.params.currentProtein.toFixed(0)},
    ]
    const fat = [
      { y: 100 - (props.main.params.currentFat/props.main.params.fat)*100, x: props.main.params.fat.toFixed(0)},
      { y: (props.main.params.currentFat/props.main.params.fat)*100, x: props.main.params.currentFat.toFixed(0)},
      ]
      const carbs = [
        { y: 100 - (props.main.params.currentCarbs/props.main.params.carbs)*100, x: props.main.params.carbs.toFixed(0)},
        { y: (props.main.params.currentCarbs/props.main.params.carbs)*100, x: props.main.params.currentCarbs.toFixed(0)},
        ]
        const calories = [
          { y: 100 - (props.main.params.currentCalories/props.main.params.calories)*100, x: props.main.params.calories.toFixed(0)},
          { y: (props.main.params.currentCalories/props.main.params.calories)*100, x: props.main.params.currentCalories.toFixed(0)},
          ]
    return (
        <Surface style={styles.mainGraphContainer}>
          <Surface style={styles.graphContainer}>
            <Surface style={styles.innerGraphContainer}>
              <Surface style={{alignItems:"center",shadowOpacity:0,width:100}}>
                <FontAwesome5 name="fire" size={24} color={props.main.theme ? "#C867FF" : "#00CAB1"} />
                <Text style={{fontWeight:"bold",marginTop:10}}>CALORIES</Text>
              </Surface>
              <VictoryPie
                  data={calories}
                  width={150}
                  height={150}
                  innerRadius={50}
                  colorScale={["lightgrey",props.main.theme ? "#C867FF" : "#00CAB1"]}
                  style={{
                  labels: { opacity: 0
                  }, }}
                  />
                  <Text style={{fontWeight:"bold",width:90,textAlign:"center"}}>{`${calories[1].x}/${calories[0].x}`}</Text>
            </Surface>
            <Surface style={styles.innerGraphContainer}>
              <Surface style={{alignItems:"center",shadowOpacity:0,width:100}}>
                <FontAwesome5 name="egg" size={24} color={props.main.theme ? "#C867FF" : "#00CAB1"} />
                <Text style={{fontWeight:"bold",marginTop:10,}}>PROTEIN</Text>
              </Surface>
              <VictoryPie
                  data={protein}
                  width={150}
                  height={150}
                  innerRadius={50}
                  colorScale={["lightgrey",props.main.theme ? "#C867FF" : "#00CAB1"]}
                  style={{
                  labels: { opacity: 0
                  }, }}
                  />
                  <Text style={{fontWeight:"bold",width:90,textAlign:"center"}}>{`${protein[1].x}/${protein[0].x}`}</Text>
            </Surface>
            <Surface style={styles.innerGraphContainer}>
              <Surface style={{alignItems:"center",shadowOpacity:0,width:100}}>
                <FontAwesome5 name="bread-slice" size={24} color={props.main.theme ? "#C867FF" : "#00CAB1"} />
                <Text style={{fontWeight:"bold",marginTop:10}}>CARBS</Text>
              </Surface>
              <VictoryPie
                  data={carbs}
                  width={150}
                  height={150}
                  innerRadius={50}
                  colorScale={["lightgrey",props.main.theme ? "#C867FF" : "#00CAB1"]}
                  style={{
                  labels: { opacity: 0
                  }, }}
                  />
                  <Text style={{fontWeight:"bold",width:90,textAlign:"center"}}>{`${carbs[1].x}/${carbs[0].x}`}</Text>
            </Surface>
            <Surface style={{...styles.innerGraphContainer,borderBottomWidth:0}}>
              <Surface style={{alignItems:"center",shadowOpacity:0,width:100}}>
                <FontAwesome5 name="bacon" size={24} color={props.main.theme ? "#C867FF" : "#00CAB1"} />
                <Text style={{fontWeight:"bold",marginTop:10}}>FAT</Text>
              </Surface>
              <VictoryPie
                  data={fat}
                  width={150}
                  height={150}
                  innerRadius={50}
                  colorScale={["lightgrey",props.main.theme ? "#C867FF" : "#00CAB1"]}
                  style={{
                  labels: { opacity: 0
                  }, }}
                  />
                  <Text style={{fontWeight:"bold",width:90,textAlign:"center"}}>{`${fat[1].x}/${fat[0].x}`}</Text>
            </Surface>
                </Surface>
        </Surface>
    )
}
const mapStateToProps = state =>{
  return {
    main: state.main
  }
}

export default connect(mapStateToProps)(Food)
