import React, { Component } from 'react'

class Article extends Component {
    render() {
        return (
            <div className="article">
                
                <img 
                src="smartHome.png"
                alt="smartHome"
                />
                <p style={{textAlign:'center',color:'gray',fontWeight:'bold',fontSize:'20px',letterSpacing:'2px',fontFamily:'Oxygen'}}>Invest in the future of smart-living</p>
                <hr style={{borderTop:'5px solid purple',width:'50%',margin:'auto'}}/>
                <p style={{padding:'5px'}}>
                Smart home solutions are redefining the way we live in our own houses. Smart home leverages the power of IoT to save money, energy, time. On the other hand, it enhances convenience and quality of life.
                </p>
            </div>
        )
    }
}

export default Article
