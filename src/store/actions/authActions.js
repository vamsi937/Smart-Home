const welcomeSpeech=(username,occassion)=>{
    let message='';
    if(occassion==='signout'){
        message="Don't stay away from us longer. It is wiser to control your appliances on the phone."
    }
    else{
        message=``;
        const presentHour=new Date().getHours();
        if(presentHour>=6 && presentHour<12) message=`Good Morning`;
        else if(presentHour>=12 && presentHour<17) message=`Good Afternoon`;
        else if(presentHour>=17 && presentHour<20) message=`Good Evening`;
        else message=`Hello`;
        
        message+=` ${username}. Welcome to Smart Home Solutions. Control your home apppliances at your finger-tips.`    
    }
    var utterance = new SpeechSynthesisUtterance(message);
    var synthesis = window.speechSynthesis;
    var voice = synthesis.getVoices().filter(function(voice) {
      return voice.uri === 'Google UK English Female';
    })[0];

    utterance.voice = voice;
    utterance.pitch = 1.0;
    utterance.rate = 1.25;
    utterance.volume = 2.0;
    synthesis.speak(utterance);
}

export const signup=(newUser)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase();
        const firestore=getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp)=>{
            return firestore.collection('users').doc(resp.user.uid).set({
                username:newUser.username, 
                email:newUser.email,
                family:newUser.familyPin,
                type:'admin'
            })
        })
        .then(()=>{
            return firestore.collection('families').doc(newUser.familyPin).set({
                family:newUser.familyPin,
                rooms:[],
                users:[newUser.username]
            })
        })
        .then(()=>{
            welcomeSpeech(newUser.username,'sign up as admin');
            dispatch({type:'SIGNUP_SUCCESS'})
        }).catch((err)=>{
            dispatch({type:'SIGNUP_ERROR',err})
        })
    }
}

export const signupAsMember=(newMember)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase();
        const firestore=getFirestore();
        firestore.collection('families').doc(newMember.familyPin)
        .get()
        .then(function(doc){
            if(doc.exists){
                firebase.auth().createUserWithEmailAndPassword(
                    newMember.email,
                    newMember.password
                ).then((resp)=>{
                    return firestore.collection('users').doc(resp.user.uid).set({
                        username:newMember.username,
                        email:newMember.email,
                        family:newMember.familyPin,
                        type:'member'
                    })
                })
                .then(()=>{
                    firestore.collection('families').doc(newMember.familyPin)
                    .get()
                    .then(function(doc){
                        if(doc.exists){
                            let usersList=doc.data().users;
                            if(usersList.length>='4'){
                               return dispatch({type:'SIGNUP_ERROR',err:{message:`Already 4 members have been using this family PIN. `}})
                            }else{
                                usersList.push(newMember.username,'signup as member');
                                firestore.collection('families').doc(newMember.familyPin)
                                .update({users:usersList})
                                welcomeSpeech(newMember.username);
                                dispatch({type:'SIGNUP_SUCCESS'});
                            }
                        }
                    })
                })
                .catch((cerr)=>{
                    console.log(cerr);
                    dispatch({type:'SIGNUP_ERROR',err:cerr})
                })
            }else{
                console.log('the family pin is invalid');
                dispatch({type:'SIGNUP_ERROR',err:{message:`The family PIN is invalid`}});
            }
        })
        .catch((err)=>{
            // console.log(err);
            dispatch({type:'SIGNUP_ERROR',err})
        })
    }
}

export const login=(credentials)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase();
        const firestore=getFirestore();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((resp)=>{
            firestore.collection('users').doc(resp.user.uid)
            .get()
            .then(function(doc){
                if(doc.exists){
                    const username=doc.data().username;
                    welcomeSpeech(username,'login');
                    dispatch({type:'LOGIN_SUCCESS'});
                }
            })
        }).catch((err)=>{
            console.log(err);
            dispatch({type:'LOGIN_ERROR',err});
        })
    }
}

export const signOut=()=>{
    return (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        firebase.auth().signOut().then(()=>{
            welcomeSpeech(null,'signout');
            dispatch({type:'SIGNOUT_SUCCESS'});
        })
    }
}