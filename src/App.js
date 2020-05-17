import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Layout,Navigation,Drawer,Content,Footer,FooterLinkList,FooterSection,Grid,Cell} from 'react-mdl';
import {connect} from 'react-redux';
import {signOut as logOut} from './store/actions/authActions';

import Main from './components/Main';
import './App.css';
import fire from './config/fire';
class App extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      user : {}
    }
  }
  componentDidMount()
  {
    this.authListener();
  }
  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user})
      }
      else{
        this.setState({user : null})
      }
    })
  }

  hideToggle=()=>{
    let selectorId=document.querySelector('.mdl-layout');
    selectorId.MaterialLayout.toggleDrawer();
  }

  logout=()=>{
    this.props.logOut();
  }

  printLinks=()=>{
    if(this.state.user===null){
      return (
        <>
          <Link className="nav-links" to="/login" onClick={()=>this.hideToggle()}>Login</Link>
          <Link className="nav-links" to="/signup" onClick={()=>this.hideToggle()}>Signup</Link>
          <Link className="nav-links" to="/signup/member" onClick={()=>this.hideToggle()}>Signup As Member</Link>
        </>
      )
    }else{
      return (
        <>
        <Link className="nav-links" to="/" onClick={()=>this.hideToggle()}>SmartHome</Link>
        <Link className="nav-links" to="/home" onClick={()=>this.hideToggle()}>Controls</Link>
        <Link className="nav-links" to="/usage" onClick={()=>this.hideToggle()}>Usage</Link>
        <Link className="nav-links" to="/login" onClick={()=>{
          this.logout();
          this.hideToggle()}}>Logout</Link>
        </>
      )
    }
  }

  render(){
    return (
      <div className="demo-big-content">
        <Layout>
            <Drawer className="drawer d-lg-none" title={<Link to="/" style={{textDecoration:'none',color:'black'}} onClick={()=>this.hideToggle()}><img src="icon.jpg" alt="icon" style={{height:'auto',width:'80%',margin:'auto'}} /></Link>}>
                <Navigation>
                  {this.printLinks()}
                </Navigation>
            </Drawer>
            <Content>
                <div className="page-content" />
                <Main  />
                <Footer size="mini">
                    <FooterSection>
                        {/* <FooterLinkList>
                            <a href="#">Help</a>
                            <a href="#">Privacy & Terms</a>
                        </FooterLinkList> */}
                            <p style={{width:'100vw',textAlign:'center',color:'white',margin:'auto',display:'flex',justifyContent:'center'}}>Developed with <i className="fas fa-heart" style={{margin:'2px',color:'pink'}}></i>  by Vamsi.</p>
                    </FooterSection>
                </Footer>
            </Content>
        </Layout>
        
      </div>
    );  
    }
}

export default connect(null,{logOut})(App);