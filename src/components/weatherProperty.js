import React, { Component } from 'react'
import {Card,CardText,CardTitle,Grid,Cell} from 'react-mdl';

class weatherProperty extends Component {
    showImage=()=>{
        if(this.props.name!=="Description"){
            return (
                <img 
                src={this.props.iconName}
                alt={this.props.name}
                style={{height:'60px'}}
            />
            );
        }else{
            let temperature=parseInt(this.props.iconName);
            let imageSrc='';
            if(temperature>=40){
                imageSrc=`hotWeather.jpg`;
            }else if(temperature<40 && temperature>=25){
                imageSrc=`springWeather.jpg`;
            }else{
                imageSrc=`coldWeather.jpg`;
            }
            return (
                <img 
                src={imageSrc}
                alt={this.props.name}
                style={{width:'100%'}}
            />
            );
        }
    }
    render() {
        return (
            <div className="weather_property">
                <Card shadow={0} style={{width: 'auto', paddingTop:'10px', background: 'rgba(255,255,255)',position:'relative'}}>
                    <CardTitle style={{height:'60px'}}>
                        <p className="property_heading">{this.props.name}</p>
                    </CardTitle>
                    <CardText style={{alignItems: 'flex-start', color: 'black'}}>
                        {/* <h3><ul>{this.props.name}</ul></h3> */}
                        <Grid>
                            <Cell col={8}>
                                <p style={{marginTop: '0',fontSize:'10px',fontWeight:'bold'}}>
                                    {`${this.props.heading} ${this.props.units}`}
                                </p>
                            </Cell>
                            <Cell col={4}>
                                {this.showImage()}
                            </Cell>
                        </Grid>
                    </CardText>
                </Card>
            </div>
        )
    }
}

export default weatherProperty;
