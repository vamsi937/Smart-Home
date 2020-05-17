import authReducer from './authReducer';
import roomReducer from './roomReducer';
import infoReducer from './infoReducer';
import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';

const rootReducer=combineReducers({
    auth:authReducer,
    info:infoReducer,
    rooms:roomReducer,
    firestore:firestoreReducer,
    firebase:firebaseReducer
});

export default rootReducer;