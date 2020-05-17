import React, { Component } from 'react'

import {Grid,Cell} from 'react-mdl';

import Article from '../components/Article';
import WeatherReport from '../components/weatherReport';

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <Grid>
                    <Cell col={5}>
                        <Article />
                    </Cell>
                    <Cell col={7}>
                     <WeatherReport />
                    </Cell>
                </Grid>
            </div>
        )
    }
}

export default Dashboard;
