import React , { Component } from "react";
import {Textfield,Button,Grid,Cell,Dialog,DialogContent,DialogActions} from 'react-mdl';
import {connect} from 'react-redux';
import {Redirect,Link} from 'react-router-dom';

import {signup} from "../store/actions/authActions";

class Signup extends Component{

state={
    username:"",
    email : "",
    password : "",
    familyPin:"",
    msg:"",
    openDialog:false
}


signup=(e)=>{
    e.preventDefault();
    const {email,password,familyPin}=this.state;
    if(!email.length || !password.length || !familyPin.length){
        this.setState({msg:"Please enter all the fields"});
        this.handleOpenDialog();
    }else{
        const {username,email,password,familyPin}=this.state;
        const signupobj={
            username,
            email,
            password,
            familyPin
        }
        this.props.signup(signupobj);
    }
}

setMessage=()=>{
    this.handleOpenDialog();
}

handleChange=(e)=>{
    this.setState({
        [e.target.name] : e.target.value
    })
}
handleOpenDialog=()=>{
    this.setState({
      openDialog: true
    });
}

handleCloseDialog=()=>{
    this.setState({
        openDialog: false
    });
}

showError=(msg)=>{
    alert(msg);
    this.setState({msg});
    return;
}

render()
{
    const {auth,authError}=this.props;
    if(auth.uid){
        return <Redirect to ="/" />
    }
    return(
        <div className="loginForm">
            <form>
                <Grid>
                    <Cell col={4}>
                        <img 
                            src="https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_home_48px-512.png" 
                            alt="home" 
                       />
                    </Cell>
                    <Cell col={8} className="input-fields">
                        <Textfield
                            className="text-field"
                            type="text"
                            name="username"
                            label="Username"
                            onChange={this.handleChange}
                            value={this.state.username}
                            style={{width: '200px'}}
                            floatingLabel
                        />
                        <br/>
                        <Textfield
                            className="text-field"

                            type="email"
                            name="email"
                            label="Email"
                            onChange={this.handleChange}
                            value={this.state.email}
                            style={{width: '200px'}}
                            floatingLabel
                        />
                        <br/>
                        <Textfield
                            className="text-field"
                            type="password"
                            name="password"
                            label="Password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            style={{width: '200px'}}
                            floatingLabel
                        />
                        <br/>
                        <Textfield
                            className="text-field"
                            type="number"
                            name="familyPin"
                            label="Set Family Pin"
                            onChange={this.handleChange}
                            value={this.state.familyPin}
                            style={{width: '200px'}}
                            floatingLabel
                        />
                        <br/>
                        <Button className="button" ripple onClick={this.signup}>Signup</Button>
                    </Cell>
                </Grid>
                <p style={{textAlign:'center'}}>Already have an account ? <Link to="/login">Login</Link></p>
                <p style={{textAlign:'center'}}>Don't have a plan? <Link to="/signup/member">Join as Member</Link></p>
                <div className="red-text center">
                    {authError?<p className="msg">{authError}</p>:null}
                </div>
            </form>
            <Dialog open={this.state.openDialog}>
                <DialogContent>{this.state.msg}</DialogContent>
                <DialogActions>
                    <Button accent type='button' onClick={this.handleCloseDialog}>x</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
}

const mapStateToProps=(state)=>{
    return {
        authError:state.auth.authError,
        auth:state.firebase.auth
    }
}

export default connect(mapStateToProps,{signup})(Signup);