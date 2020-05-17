import React,{Component} from 'react';

import {Grid,Cell} from 'react-mdl';

import WeatherProperty from './weatherProperty';
import axios from 'axios';

class weatherReport extends Component{

    state={
        temperature:0,
        barometerPressure:0,
        highTemperature:0,
        lowTemperature:0,
        humidity:0,
        description:''
    }
    
    componentDidMount(){
        const API_KEY='EQZ4PEbheOr5-bqkz2eNoe9l77yxTydjzVw3ZDdcNtk';
        const ROOT_URL=`https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&`;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position)=>{
                const {latitude,longitude}=position.coords;
                const url=`${ROOT_URL}latitude=${latitude}&longitude=${longitude}&oneobservation=true&apiKey=${API_KEY}`;
                const response=await axios.get(url);
                const {observations:locations}=response.data;
                const propertyObject=locations.location[0].observation[0];
                const {temperature,barometerPressure,highTemperature,lowTemperature,humidity,description}=propertyObject;
                this.setState({
                    temperature,barometerPressure,highTemperature,lowTemperature,humidity,description
                })
                // console.log(propertyObject);
            });
        } else { 
            alert("Geolocation is not supported by this browser.");
        }
    }

    provideImage=()=>{
       
    }

    showReportCards=()=>{
        if(this.state.temperature!==0){
            // console.log(this.state);
            return (
                <div className="weather_report">
                    <Grid>
                        <Cell col={4}>
                            <WeatherProperty heading={`${this.state.lowTemperature}-${this.state.highTemperature}`} units=" deg C" iconName="temp.png" name="Temperature" />
                        </Cell>
                        <Cell col={4}>
                            <WeatherProperty heading={this.state.humidity} units=" %" iconName="humidity.png" name="Humidity" />
                        </Cell>
                        <Cell col={4}>
                            <WeatherProperty heading={this.state.barometerPressure} units=" hPa" iconName="atmospherePressure.png" name="Atmosphere Pressure" />
                        </Cell>
                    </Grid>
                    <Grid>
                        <Cell col={12}>
                            <WeatherProperty heading={this.state.description} name="Description" units="" iconName={`${this.state.highTemperature}`} />
                        </Cell>
                    </Grid>
                </div>
            )
        }else{
            return (
                <div>
                    Loading weather Info...
                </div>
            )
        }
    }

    render(){
        return (
            <div>
                <h4 className="property_heading" style={{color:'white',fontSize:'30px',textAlign:'center'}}>Weather Report</h4>
                {this.showReportCards()}
            </div>
        )
    }
}

export default weatherReport;