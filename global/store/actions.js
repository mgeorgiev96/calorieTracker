import * as ACTION_TYPES from './action_types'


export const setTheme = ()=>{
    return {
        type: ACTION_TYPES.THEME
    }
}

export const setSessionData = (session)=>{
    return {
        type: ACTION_TYPES.SET_SESSION,
        payload: session
    }
}

export const addFood = (food)=>{
    return {
        type: ACTION_TYPES.ADD_FOOD,
        payload:food
    }
}

export const addMeal = (meal)=>{
    return {
        type: ACTION_TYPES.ADD_MEAL,
        payload: meal
    }
}

export const removeMeal = (id)=>{
    return {
        type: ACTION_TYPES.REMOVE_MEAL,
        payload: id
    }
}

export const removeIngr = (id)=>{
    return{
        type: ACTION_TYPES.REMOVE_INGREDIENT,
        payload: id
    }
}

export const saveParam = (param)=>{
    return {
        type: ACTION_TYPES.SAVE_PARAM,
        payload: param
    }
}
export const incrementDay = ()=>{
    return {
        type: ACTION_TYPES.INCREMENT_DAY
    }
}
export const decrementDay = ()=>{
    return {
        type: ACTION_TYPES.DECREMENT_DAY
    }
}


export const updateGraph = (graph)=>{
    return {
        type: ACTION_TYPES.UPDATE_GRAPH,
        payload: graph
    }
}

export const addGraph = (item)=>{
    return {
        type: ACTION_TYPES.ADD_GRAPH,
        payload: item
    }
}