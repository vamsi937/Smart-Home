import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider,useSelector} from 'react-redux';
import thunk from 'redux-thunk';
import {reduxFirestore,getFirestore,createFirestoreInstance} from 'redux-firestore';
import {ReactReduxFirebaseProvider,getFirebase,isLoaded} from 'react-redux-firebase';
import {BrowserRouter} from 'react-router-dom';
import fbConfig from './config/fire';
import firebase from 'firebase/app';

import rootReducer from './store/reducers/rootReducer';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

const store=createStore(rootReducer,
  compose(
  applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
  reduxFirestore(fbConfig)
  )  
);

const profileSpecificProps={
  userProfile:'users',
  useFirestoreForProfile:true,
  enableRedirectHandling:false,
  resetBeforeLogin:false
}

const rrfProps={
  firebase,
  config:fbConfig,
  config:profileSpecificProps,
  dispatch:store.dispatch,
  createFirestoreInstance
}

const AuthIsLoaded=({ children })=> {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div style={{position:'fixed',height:'100%',width:'100%',margin:'auto',top:'50%',left:'40%'}}>Loading....</div>;
  return children
}
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
