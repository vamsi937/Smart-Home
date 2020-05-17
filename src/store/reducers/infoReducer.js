// // const initState={
// //     infoError:null
// // };

const infoReducer=(state=[],action)=>{
    switch(action.type){
        case 'FETCH_WEATHER':
            console.log('Hello in the infoReducer');
            console.log(action.payload);
        return [];
        default:
        return state;
    }
}

export default infoReducer;