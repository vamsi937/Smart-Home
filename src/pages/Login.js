import React , { Component } from "react";
import {Textfield,Button,Grid,Cell,Dialog,DialogContent,DialogActions} from 'react-mdl';
import {connect} from 'react-redux';
import {Redirect,Link} from 'react-router-dom';

import {login} from "../store/actions/authActions";

class Login extends Component{

state={
    email : "",
    password : "",
    msg:"",
    openDialog:false
}


login=(e)=>{
    e.preventDefault();
    const {email,password}=this.state;
    if(!email.length || !password.length){
        this.setState({msg:"Please enter all the fields"});
        this.handleOpenDialog();
    }else{
        const {email,password}=this.state;
        const loginobj={
            email,
            password
        }
        this.props.login(loginobj);
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
                    <Button raised ripple className="button" onClick={this.login}>Login</Button>
                    </Cell>
                </Grid>
                <p style={{textAlign:'center'}}>Don't have an account ? <Link to="/signup">Signup</Link></p>
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

export default connect(mapStateToProps,{login})(Login);