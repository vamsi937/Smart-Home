import React,{Component}  from "react";
import _ from "lodash";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Grid,Cell} from 'react-mdl';

import {addRooms,changeRoomControls} from '../store/actions/roomActions';
import RoomsForm from '../components/RoomsForm';
import RoomsControls from '../components/RoomsControls';

class Home extends Component{

    onFormSubmit=(roomsInfo,familyPin)=>{
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
            newObj[keys[i]]=updatedValues[i];
        }
        if(Object.keys(newObj.living).length===0 || Object.keys(newObj.dining).length===0 || Object.keys(newObj.bedroom).length===0){
           alert('Please select atleast one appliance from each room'); 
        }else{
            // console.log('success');            
            this.props.addRooms(roomsInfo,familyPin);
        }
    }

    onControlChange=(roomName,roomControls,roomTimings,applianceName,familyPin)=>{
        this.props.changeRoomControls(roomName,roomControls,roomTimings,applianceName,familyPin);
    }

    conditionForRooms=(family,familyID,username)=>{
        if(this.props.auth && this.props.users && this.props.families){
            if(family.rooms){
                let userDetails=this.props.users[this.props.auth.uid];
                if(family.rooms.length===0 && userDetails.type==='admin'){
                    return (
                        <div>
                            <h3 style={{color:'white',textAlign:'center'}}>Select your appliances soon!!</h3>
                            <RoomsForm familyPin={family.family} onSubmit={this.onFormSubmit} />
                        </div>
                    )
                }else if(family.rooms.length===0 && userDetails.type==='member'){
                    return (
                        <div style={{margin:'5em 2em 2em 2em'}}>
                            <h4 style={{fontFamily:'Oxygen',fontWeight:'bold',color:'white'}}>
                                We are sorry to inform you that your admin has not yet selected the appliances of the rooms.
                            </h4>
                        </div>
                    )
                }else{
                    if(this.props.rooms){
                        return (
                            <div>
                                <Grid>
                                    <Cell col={1}></Cell>
                                    <Cell col={6}>
                                        <RoomsControls familyPin={family.family} updateRoom={this.onControlChange} rooms={this.props.rooms} />
                                    </Cell>
                                    <Cell col={5}>
                                        <div className="welcome_greet">
                                            <p>Hello!!  {username}. Your familyID is {familyID}</p>
                                        </div>
                                    </Cell>
                                </Grid>
                            </div>
                        )    
                    }else{
                        return (
                            <div>Loading rooms....</div>
                        )
                    }
                }
            }    
        }else{
            return (
                <div></div>
            );
        }
    }

    
    render(){
        if(!this.props.auth.uid){
            return <Redirect to="/login" />;
        }
        let familyID=``;
        let family=[];
        let username=``;
        const {users,families,auth}=this.props;
        if(users && families && auth){
            if(users[auth.uid]){
                username=users[auth.uid].username;
                familyID=users[auth.uid].family;
                family=families[familyID];    
            }
        }
        return(
            <div className="homePage">
                {this.conditionForRooms(family,familyID,username)}
            </div>
        )    
    }

}

const mapStateToProps=(state)=>{
    return {
        auth:state.firebase.auth,
        users:state.firestore.data.users,
        families:state.firestore.data.families,
        rooms:state.firestore.data.rooms
    }
}

export default compose(
    connect(mapStateToProps,{addRooms,changeRoomControls}),
    firestoreConnect([
        {collection:'families'},
        {collection:'users'},
        {collection:'rooms'}
    ])
)(Home);