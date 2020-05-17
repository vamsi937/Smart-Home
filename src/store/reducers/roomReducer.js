const initState={
    roomError:null
};

const roomReducer=(state=initState,action)=>{
    switch(action.type){
        case 'ADDROOM_SUCCESS':
            return {...state,rooms:action.rooms};
        case 'ADDROOM_ERROR':
            return {...state,rooms:[]};
        default:
            return {...state,rooms:[]};

    }
}

export default roomReducer;