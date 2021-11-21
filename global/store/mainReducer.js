import * as ACTION_TYPES from './action_types'


const initialState = {
    session:null,
    user:{},
    theme:false,
    currentMeal: [],
    totalFat: 0,
    totalCarbs: 0,
    totalProtein: 0,
    totalCalories: 0,
    params:{
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        height: 0,
        gender: "Male",
        weight: 0,
        goalWeight: 0,
        age: 0,
        currentProtein:0,
        currentCarbs:0,
        currentFat:0,
        currentCalories:0,
        currentDate: 0,
        meals: []
    },
    day:0,
    start: new Date(),
    end: new Date(),
    burntCalories:0,
    stepsWalked:0,
    kmPassed:0,
    graphicData: [
        {y:1,x:"10000"},
        {y:0,x:"0"}
    ],
    graph: []
}

const mainReducer = (state=initialState,action)=>{
    switch(action.type){
        case ACTION_TYPES.THEME:
            return {
                ...state,
                theme: !state.theme
            }
        case ACTION_TYPES.SET_SESSION:
            return {
                ...state,
                session: action.payload
            }
        case ACTION_TYPES.ADD_FOOD:
            return{
                ...state,
                currentMeal: [...state.currentMeal,action.payload],
                totalCalories: state.totalCalories +  Math.round(action.payload.calories),
                totalCarbs: state.totalCarbs +  Math.round(action.payload.carbs),
                totalProtein: state.totalProtein +  Math.round(action.payload.protein),
                totalFat: state.totalFat + Math.round(action.payload.fat)
            }
        case ACTION_TYPES.ADD_MEAL:
            return {
                ...state,
                params: state.params,
            }
        case ACTION_TYPES.REMOVE_MEAL:
            let p1 = state.params
            p1.meals = [...p1.meals.filter(i=>i.id!==action.payload)]
            return{
                ...state,
                params: p1
            }
        case ACTION_TYPES.REMOVE_INGREDIENT:
            return{
                ...state,
                currentMeal: state.currentMeal.filter(i=>i.id!==action.payload)
            }
        case ACTION_TYPES.SAVE_PARAM:
            return{
                ...state,
                params: action.payload
            }
        case ACTION_TYPES.INCREMENT_DAY:

            if(state.day < 0){
                return{
                    ...state,
                    day: state.day+1,
                } 
            }else return state
        case ACTION_TYPES.DECREMENT_DAY:
            return{
                
                ...state,
                day: state.day-1,
            }
        case ACTION_TYPES.UPDATE_GRAPH:
            return {
                ...state,
                graphicData: action.payload.graph,
                kmPassed: action.payload.walked,
                stepsWalked: action.payload.time,
                burntCalories: action.payload.calories,
            }
        case ACTION_TYPES.ADD_GRAPH:
            return {
                ...state,
                graph: [...state.graph,action.payload]
            }
        default:
            return state
    }
}


export default mainReducer;