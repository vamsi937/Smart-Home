import React, { Component } from 'react';
import {Tabs,Tab,Grid,Cell,Button} from 'react-mdl';
class RoomsControls extends Component {
    state={
        activeTab:0,
        controls:this.props.rooms[this.props.familyPin].controls,
        timings:this.props.rooms[this.props.familyPin].timings 
    };

    printTabNames=()=>{
        // console.log(this.props.rooms[this.props.familyPin]);
        let rooms=Object.keys(this.props.rooms[this.props.familyPin].controls);
        return rooms.map(room=>{
            return <Tab key={room}>{`${room.toUpperCase()} ROOM`}</Tab>
        })
    }

    changeApplianceState=(roomName,applianceName)=>{
        const applianceState=this.state.controls[roomName][applianceName];
        let presentApplianceTimings=this.props.rooms[this.props.familyPin].timings[`${roomName}`][applianceName];
        let otherReference={...presentApplianceTimings};
        let existingTimings={...this.state.timings[roomName]};
        //if going from off to on--applianceState is false
        if(!applianceState){
            otherReference.startTiming=JSON.stringify(new Date());
            existingTimings[applianceName]=otherReference;
        }
        // if going from on to off--applianceState is true
        else if(applianceState){
            let presentTiming=new Date();
            otherReference.endTiming=JSON.stringify(presentTiming);
            let startTiming=new Date(JSON.parse(otherReference.startTiming));
            let endTiming=new Date(presentTiming);
            let differenceOfTime=endTiming-startTiming;
            otherReference.timeUsed+=differenceOfTime;
            existingTimings[applianceName]=otherReference;
        }
        let presentRoom={...this.state.controls[roomName]};
        presentRoom[applianceName]=!applianceState;
        if(roomName==='living'){
            let existingControls={...this.state.controls};
            existingControls.living=presentRoom;
            this.setState(()=>{
                return {
                    controls:existingControls,
                    timings:existingTimings
                }
            })    
            this.props.updateRoom('living',presentRoom,otherReference,applianceName,this.props.familyPin);
        }else if(roomName==='dining'){
            let existingControls={...this.state.controls};
            existingControls.dining=presentRoom;
            this.setState(()=>{
                return {
                    controls:existingControls,
                    timings:existingTimings
                }
            })    
            this.props.updateRoom('dining',presentRoom,otherReference,applianceName,this.props.familyPin);
        }else{
            let existingControls={...this.state.controls};
            existingControls.bedroom=presentRoom;
            this.setState(()=>{
                return {
                    controls:existingControls,
                    timings:existingTimings
                }
            })    
            this.props.updateRoom('bedroom',presentRoom,otherReference,applianceName,this.props.familyPin);
        }
    }

    printText=(selected)=>{
        if(selected){
            return (
                <>
                Switch Off
                </>
            )
        }else{
            return (
                <>
                Switch On
                </>
            )
        }
    }

    printImages=(key)=>{
        if(key==='light'){
            return (
            <img
                className="iconImg"
                src={`${key}.png`} 
                alt={`${key}`}
                />
            )
        }else if(key==='fan'){
            return (
                <i className="fas fa-fan iconImg" style={{color:'white'}}></i>
            )
        }else{
            return (
                <i className="fas fa-lightbulb iconImg" style={{color:'white'}}></i>
            )
        }
    }

    showAppliances=(controls,roomName,familyPin)=>{
        // console.log(this.state.timings);
        let keys=Object.keys(controls);
        return keys.map(key=>{
            if(key==='timeUsed'){
                return (<div key={key}></div>);
            }else{
                    if(this.state.controls[`${roomName}`][`${key}`]){
                        return (
                            <div className="appliance off" key={key}> 
                                <Grid>
                                    <Cell col={3}>
                                    <p style={{textTransform:'uppercase',textAlign:'center'}}>{key}</p>
                                    </Cell>
                                    <Cell col={5}>
                                        <Button style={{color:'white',borderRadius:'10px'}} className="button" ripple  onClick={()=>this.changeApplianceState(`${roomName}`,`${key}`)}>{this.printText(this.state.controls[`${roomName}`][`${key}`])}</Button>                    
                                    </Cell>
                                    <Cell col={4}>
                                    {this.printImages(`${key}`)}
                                    </Cell>
                                </Grid>
                            </div>                
                      )    
                    }else{
                        return (
                            <div className="appliance on" key={key}> 
                                <Grid>
                                    <Cell col={3}>
                                    <h5 style={{textTransform:'uppercase',textAlign:'center'}}>{key}</h5>
                                    </Cell>
                                    <Cell col={5}>
                                        <Button style={{background:'#FAC42F',color:'black',borderRadius:'10px'}} ripple  onClick={()=>this.changeApplianceState(`${roomName}`,`${key}`)}>{this.printText(this.state.controls[`${roomName}`][`${key}`])}</Button>                    
                                    </Cell>
                                    <Cell col={4}>
                                    {this.printImages(`${key}`)}
                                    </Cell>
                                </Grid>
                            </div>                
                      ) 
                    }
            }
        })
    }

    showRoomControls=()=>{
        let rooms=Object.keys(this.props.rooms[this.props.familyPin].controls);
        if(this.state.activeTab===0){
            let controls=Object.values(this.props.rooms[this.props.familyPin].controls)[0];
            return (
                <div className={rooms[0]}>
                    {/* <h6>{`${rooms[0].toUpperCase()} ROOM CONTROLS`}</h6> */}
                    {this.showAppliances(controls,rooms[0],this.props.familyPin)}
                </div>
            )
        }else if(this.state.activeTab===1){
            let controls=Object.values(this.props.rooms[this.props.familyPin].controls)[1];
            return (
                <div className={rooms[1]}>
                    {/* <h6>{`${rooms[1].toUpperCase()} ROOM CONTROLS`}</h6> */}
                    {this.showAppliances(controls,rooms[1],this.props.familyPin)}
                </div>
            )
        }else{
            let controls=Object.values(this.props.rooms[this.props.familyPin].controls)[2];
            return (
                <div className={rooms[2]}>
                    {/* <h6>{`${rooms[2].toUpperCase()} ROOM CONTROLS`}</h6> */}
                    {this.showAppliances(controls,rooms[2],this.props.familyPin)}
                </div>
            )
        }
    }

    render() {
        // console.log(this.state);
        return (
            <div className="demo-tabs">
                <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                    {/* <Tab>Living Room</Tab>
                    <Tab>Dining Hall</Tab>
                    <Tab>Bed Room</Tab> */}
                    {this.printTabNames()}
                </Tabs>
                <section>
                    <Grid>
                        <Cell col={12} style={{margin:'0px'}}>
                            {this.showRoomControls()}
                        </Cell>
                    </Grid>
                </section>
            </div>    
        )
    }
}

export default RoomsControls;
