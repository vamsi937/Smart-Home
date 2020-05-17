import React,{Component} from 'react';
import {Tabs,Tab,Grid,Cell,Button} from 'react-mdl';

// Simple header with scrollable tabs
class RoomsForm extends Component {
    state={
        activeTab:0,
        living:{
            light:true,
            fan:true,
            cfl:true
        },
        dining:{
            light:true,
            fan:true,
            cfl:true
        },
        bedroom:{
            light:true,
            fan:true,
            cfl:true
        }
    }

    changeSelection=(roomName,applianceName,selectionOption)=>{
        let presentRoomName={...this.state[roomName]};
        presentRoomName[applianceName]=selectionOption;
        if(roomName==='living'){
            this.setState(()=>{
                return {living:presentRoomName}
            })    
        }else if(roomName==='dining'){
            this.setState(()=>{
                return {dining:presentRoomName}
            })
        }else{
            this.setState(()=>{
                return {bedroom:presentRoomName}
            })
        }
    }

    changeSelectionState=(roomName,applianceName)=>{
        const selectionOption=this.state[roomName][applianceName];
        let presentRoom={...this.state[roomName]};
        presentRoom[applianceName]=!selectionOption;
        if(roomName==='living'){
            this.setState(()=>{
                return {living:presentRoom}
            })    
        }else if(roomName==='dining'){
            this.setState(()=>{
                return {dining:presentRoom}
            })
        }else{
            this.setState(()=>{
                return {bedroom:presentRoom}
            })
        }
    }

    onFormSubmit=(e)=>{
        e.preventDefault();
        let applianceInfo={...this.state};
        delete applianceInfo[`activeTab`];
        // console.log(applianceInfo);
        this.props.onSubmit(applianceInfo,this.props.familyPin);
    }

    printText=(selected)=>{
        if(selected){
            return (
                <>
                You will have this
                </>
            )
        }else{
            return (
                <>
                You won't have this
                </>
            )
        }
    }

    toggleCategories=()=>{
        if(this.state.activeTab===0){
            return (
                <>
                    <h3 style={{fontFamily:'Anton',textAlign:'center'}}>Appliances of the living room</h3>
                    <div className="appliance">
                        <Grid>
                            <Cell col={5}>
                            <h5>Light</h5>
                            </Cell>
                            <Cell col={7}>
                                <Button raised accent ripple  onClick={()=>this.changeSelectionState('living','light')}>{this.printText(this.state.living.light)}</Button>                    
                            </Cell>
                        </Grid>
                    </div>
                    <div className="appliance">
                        <Grid>
                            <Cell col={5}>
                                <h5>Fan</h5>
                            </Cell>
                            <Cell col={7}>
                            <Button raised accent ripple  onClick={()=>this.changeSelectionState('living','fan')}>{this.printText(this.state.living.fan)}</Button>                    
                            </Cell>
                        </Grid>
                    </div>
                    <div className="appliance">
                        <Grid>
                            <Cell col={5}>
                                <h5>CFL Bulb</h5>
                            </Cell>
                            <Cell col={7}>
                                <Button raised accent ripple  onClick={()=>this.changeSelectionState('living','cfl')}>{this.printText(this.state.living.cfl)}</Button>                    
                            </Cell>
                        </Grid>
                    </div>
                    {/* const {selected}=this.state.living; */}
                </>
            )
        }else if(this.state.activeTab===1){
            return (
                <>
                    <h3 style={{fontFamily:'Anton',textAlign:'center'}}>Appliances of the Dining Hall</h3>
                    <div className="appliance">
                        <Grid>
                            <Cell col={5}>
                            <h5>Light</h5>
                            </Cell>
                            <Cell col={7}>
                                <Button raised accent ripple  onClick={()=>this.changeSelectionState('dining','light')}>{this.printText(this.state.dining.light)}</Button>                    
                            </Cell>
                        </Grid>
                    </div>
                    <div className="appliance">
                        <Grid>
                            <Cell col={5}>
                                <h5>Fan</h5>
                            </Cell>
                            <Cell col={7}>
                            <Button raised accent ripple  onClick={()=>this.changeSelectionState('dining','fan')}>{this.printText(this.state.dining.fan)}</Button>                    
                            </Cell>
                        </Grid>
                    </div>
                    <div className="appliance">
                        <Grid>
                            <Cell col={5}>
                                <h5>CFL Bulb</h5>
                            </Cell>
                            <Cell col={7}>
                                <Button raised accent ripple  onClick={()=>this.changeSelectionState('dining','cfl')}>{this.printText(this.state.dining.cfl)}</Button>                    
                            </Cell>
                        </Grid>
                    </div>
                </>
            )
        }else{
            return(
                <>
                <h3 style={{fontFamily:'Anton',textAlign:'center'}}>Appliances of the bedroom</h3>
                    <div className="appliance">
                        <Grid>
                            <Cell col={5}>
                            <h5>Light</h5>
                            </Cell>
                            <Cell col={7}>
                                <Button raised accent ripple  onClick={()=>this.changeSelectionState('bedroom','light')}>{this.printText(this.state.bedroom.light)}</Button>                    
                            </Cell>
                        </Grid>
                    </div>
                    <div className="appliance">
                        <Grid>
                            <Cell col={5}>
                                <h5>Fan</h5>
                            </Cell>
                            <Cell col={7}>
                            <Button raised accent ripple  onClick={()=>this.changeSelectionState('bedroom','fan')}>{this.printText(this.state.bedroom.fan)}</Button>                    
                            </Cell>
                        </Grid>
                    </div>
                    <div className="appliance">
                        <Grid>
                            <Cell col={5}>
                                <h5>CFL Bulb</h5>
                            </Cell>
                            <Cell col={7}>
                                <Button raised accent ripple  onClick={()=>this.changeSelectionState('bedroom','cfl')}>{this.printText(this.state.bedroom.cfl)}</Button>                    
                            </Cell>
                        </Grid>
                    </div>
                    <br/>
                    <Button raised accent ripple onClick={this.onFormSubmit}>Submit</Button>

                </>
            )
        }
    }

    render() {
        return (
            <div className="demo-tabs">
                <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                    <Tab>Living Room</Tab>
                    <Tab>Dining Room</Tab>
                    <Tab>Bed Room</Tab>
                </Tabs>
                <section>
                    <Grid>
                        <Cell col={12}>
                            {this.toggleCategories()}
                        </Cell>
                    </Grid>
                </section>
            </div>    
        );
    }
}

export default RoomsForm;