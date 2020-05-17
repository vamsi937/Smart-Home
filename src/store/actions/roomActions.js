import _ from 'lodash';

function generateNewObj(newObj,valueOfProperty){
    let objKeys=Object.keys(newObj);
    let objValues=Object.values(newObj);
    let newTimingValues=[];
    for(var j=0;j<objValues.length;j++){
        let obj=objValues[j];
        let newObject={};
        let key=Object.keys(obj);
        let value=Object.values(obj);
        for(var i=0;i<value.length;i++){
            if(value[i]===true){
                value[i]=valueOfProperty
            }
            newObject[key[i]]=value[i];
        }
        newTimingValues[j]=newObject;
    }
    let newTimingObj={};
    for(var k=0;k<newTimingValues.length;k++){
        newTimingObj[objKeys[k]]=newTimingValues[k];
    }
    return newTimingObj;
}

export const addRooms=(roomsInfo,familyPin)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        firestore.collection('families').doc(familyPin)
        .get()
        .then(function(doc){
            if(doc.exists){
                const newInfoArr=_.map(_.toPairs(roomsInfo), d => _.fromPairs([d]));
                return firestore.collection('families').doc(familyPin)
                .update({rooms:newInfoArr})
            }
        })
        .then(()=>{
            let keys=Object.keys(roomsInfo);
            let values=Object.values(roomsInfo);
            let newValues=[...values];
            let updatedValues=[];
            newValues.forEach(obj=>{
                let filtered=_.pickBy(obj);
                updatedValues.push(filtered);
            })
            let newObj={};
            for(let i=0;i<keys.length;i++){
                newObj[keys[i]]={...updatedValues[i]};
            }
            let newFalseObj=generateNewObj(newObj,false)
            let newTimingObj=generateNewObj(newObj,{startTiming:null,endTiming:null,timeUsed:0});
            // console.log(newTimingObj);
            firestore.collection('rooms').doc(familyPin).set({
                controls:newFalseObj,
                timings:newTimingObj,
                startTime:JSON.stringify(new Date())                
            });
            dispatch({type:'ADDROOM_SUCCESS',rooms:newObj});
        })
        .catch((err)=>{
            dispatch({type:'ADDROOM_ERROR',err})
        })
    }
}

export const changeRoomControls=(roomName,roomControls,roomTimings,applianceName,familyPin)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        firestore.collection('rooms').doc(familyPin)
        .get()
        .then(function(doc){
            if(doc.exists){
                if(roomName==='living'){
                    firestore.collection('rooms').doc(familyPin)
                    .get()
                    .then(doc=>{
                        if(doc.exists){
                            let existingControls=doc.data().controls;
                            let existingTimings=doc.data().timings;
                            existingTimings.living[applianceName]=roomTimings;
                            existingControls.living=roomControls;
                            firestore.collection('rooms').doc(familyPin).update({
                                controls:existingControls,
                                timings:existingTimings
                            })        
                        }
                    })
                }else if(roomName==='dining'){
                    firestore.collection('rooms').doc(familyPin)
                    .get()
                    .then(doc=>{
                        if(doc.exists){
                            let existingControls=doc.data().controls;
                            let existingTimings=doc.data().timings;
                            existingTimings.dining[applianceName]=roomTimings;
                            existingControls.dining=roomControls;
                            firestore.collection('rooms').doc(familyPin).update({
                                controls:existingControls,
                                timings:existingTimings
                            })        
                        }
                    })
                }else{
                    firestore.collection('rooms').doc(familyPin)
                    .get()
                    .then(doc=>{
                        if(doc.exists){
                            let existingControls=doc.data().controls;
                            let existingTimings=doc.data().timings;
                            existingTimings.bedroom[applianceName]=roomTimings;
                            existingControls.bedroom=roomControls;
                            firestore.collection('rooms').doc(familyPin).update({
                                controls:existingControls,
                                timings:existingTimings
                            })        
                        }
                    })
                }
            }
        })
        .catch((err)=>{
            dispatch({type:'UPDATEROOM_ERROR',err})
        })
    }
}