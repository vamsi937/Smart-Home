import React, { Component } from 'react'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Grid,Cell} from 'react-mdl';
import Usage from '../components/Usage';

class UsageReport extends Component {

    convertObjectToArray=(reqObject)=>{
        let keys=Object.keys(reqObject);
        let values=Object.values(reqObject);
        let requiredArr=[];
        for(var i=0;i<keys.length;i++){
            requiredArr[i]={};
            requiredArr[i][keys[i]]=values[i];
        }
        return requiredArr;
    }

    returnApplianceUsage=(requiredApplianceArr,startTime)=>{
        let appUsageStartTime=new Date(JSON.parse(startTime));
        let presentTime=new Date();
        let totalTimeFromAppUsage=presentTime-appUsageStartTime;
        return requiredApplianceArr.map(applianceInfo=>{
            let applianceName=Object.keys(applianceInfo)[0];
            let applianceTimingInfo=Object.values(applianceInfo)[0];
            if(new Date(JSON.parse(applianceTimingInfo.endTiming))>new Date(JSON.parse(applianceTimingInfo.startTiming)) || applianceTimingInfo.startTiming===null){
                let timeOfUsage=applianceTimingInfo.timeUsed;
                let percentageUsed=1*((timeOfUsage/totalTimeFromAppUsage)*100).toFixed(2);
                let percentageUnUsed=100-percentageUsed;
                return (
                    <Cell col={4} key={applianceName}>
                        <div>
                            <Usage applianceName={applianceName} time={(timeOfUsage/60000).toFixed(2)} used={percentageUsed} unUsed={percentageUnUsed} />
                        </div>
                    </Cell>
                )
            }else{
                let startTime=new Date(JSON.parse(applianceTimingInfo.startTiming));
                let differenceOfTime=presentTime-startTime;
                let timeOfUsage=applianceTimingInfo.timeUsed+differenceOfTime;
                let percentageUsed=((timeOfUsage/totalTimeFromAppUsage)*100).toFixed(2);
                let percentageUnUsed=100-percentageUsed;
                return (
                    <Cell col={4} key={applianceName}>
                        <div>
                            <Usage applianceName={applianceName} time={(timeOfUsage/60000).toFixed(2)} used={percentageUsed} unUsed={percentageUnUsed} />
                        </div>
                    </Cell>
                )
            }
        })
    }

    showTimeUsed=(timings,startTime)=>{
        let roomName=Object.keys(timings)[0];
        let appliancesList=Object.values(timings)[0];
        let requiredApplianceArr=this.convertObjectToArray(appliancesList);
        return (
            <div key={roomName} className="rooms">
                <h3 style={{color:'black',textAlign:'center',fontFamily:'Anto',textTransform:'capitalize'}}>{roomName} Room</h3>
                <Grid>
                    {this.returnApplianceUsage(requiredApplianceArr,startTime)}
                </Grid>
            </div>
        )
    }
    printUsage=()=>{
        let familyID=``;
        const {users,auth,rooms}=this.props;
        if(users && auth && rooms){
            if(users[auth.uid]){
                familyID=users[auth.uid].family;
                const {timings,startTime}=rooms[familyID];
                let requiredArr=this.convertObjectToArray(timings);
                // return <div>Loaded...</div>
                return requiredArr.map(roomTiming=>{
                    return this.showTimeUsed(roomTiming,startTime);
                })
            }
        }else{
            return (
                <div>
                    <p style={{color:'black',fontFamily:'Oxygen',textAlign:'center'}}>No rooms have been selected.</p>
                </div>
            )
        }
    }
    render() {
        if(!this.props.auth.uid){
            return <Redirect to="/login" />;
        }
        
        // console.log(this.props);
        return (
            <div className="usageReport">
                <h3 style={{textAlign:'center',fontFamily:'Oxygen',fontWeight:'bolder',color:'black',textTransform:'uppercase'}}>Usage Report </h3>
                {this.printUsage()}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        auth:state.firebase.auth,
        users:state.firestore.data.users,
        rooms:state.firestore.data.rooms};
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'users'},
        {collection:'rooms'}
    ])
)(UsageReport);