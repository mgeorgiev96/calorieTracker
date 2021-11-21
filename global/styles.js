import {StyleSheet,StatusBar} from "react-native"


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity:0
      },
      navbar:{
        borderTopWidth: 1,
        borderBottomWidth:1,
        borderColor: 'lightgrey'
      },
      mainLoginContainer:{
        flex:1,
      }
      ,
      formContainer:{
        flex:1,
        width: '80%',
        justifyContent:'center',
        marginTop:0,
        marginBottom:0,
        marginLeft:'auto',
        marginRight:"auto"
      },
      navbarContainer:{
        paddingTop:StatusBar.currentHeight,
      },
      switchButton:{
        zIndex:3,
        flex:1,
        flexDirection:"row",
        alignItems:"center"
      },
      navigatorContainer:{
        position: "relative",
        borderColor: "black",
        borderWidth: 5,
      },
      homeLogo:{
        padding: 50,
        borderRadius: 150,
        marginBottom:40
      },
      dateIndicator:{
        alignSelf:"center",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        alignContent:"center",
        width:'100%',
        paddingVertical: 10,
        paddingHorizontal:40,
        shadowOpacity:0,
        borderBottomWidth:1
      },
      graphContainer:{
        width: '100%',
        justifyContent:"center",
        alignItems:"center",
        shadowOpacity:0
      },
      mainGraphContainer:{
        paddingTop: 45,
        flex: 1
      },
      innerGraphContainer:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        shadowOpacity:0,
      },
      tabContainer:{
        width:"100%",
        justifyContent:"space-between",
        flexDirection:"row",
        shadowOpacity:0
      },
      innerTabContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        width: "100%",
        padding:20,
        borderBottomWidth:1,
        alignItems:"center",
        shadowOpacity:0
      },
      personalContainer:{
        flex:1,
        alignItems:"center",
        shadowOpacity:0
      },
      searchContainer:{
        width:"99%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:'center',
        shadowOpacity:0
      },
      searchButton:{
        padding: 5,
      },
      searchContainerMain:{
        flex:1,
        width:"99%",
        justifyContent:"flex-start",
        alignItems:"center",
      },
      cardAction:{
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        paddingHorizontal:2,
        paddingVertical:15,
        borderWidth:2,
        borderColor:"lightgrey",
        borderBottomEndRadius:5,
        borderBottomLeftRadius:5,
        borderTopWidth: 0
      },
      addMeal:{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
        paddingVertical: 8,
        paddingHorizontal:12,
        borderRadius: 5,
        marginVertical: 20
      },
      mealName:{
        padding:5,
        borderRadius: 5,
        borderColor:"lightgrey",
        borderWidth:2
      },
      mealItem:{
        borderBottomWidth:1,
        padding:10,
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-between",
        shadowOpacity:0
      },
      modalText:{
        alignSelf:"center",
        fontSize:20
      }
})