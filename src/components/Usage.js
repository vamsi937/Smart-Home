/* App.js */
import React,{Component} from 'react';
// var Component = React.Component;
import CanvasJSReact from './canvasjs.react';
// var CanvasJSReact = require('./canvasjs.react');
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Usage extends Component {
	
	render() {
		// console.log(this.props);
		const {applianceName,used,unUsed,time}=this.props;
		const options = {
			animationEnabled: true,
			title: {
				text: `${applianceName.toUpperCase()}`
			},
			subtitles: [{
				text: `${used}%`,
				verticalAlign: "center",
				fontSize: 20,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				toolTipContent: `<b>Amount Used</b>: ${time} mins`,
				indexLabel: "{name}-{y}",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ name: "Used", y: `${used}` },
					{ name: "Unused", y: `${unUsed}` }
				]
			}]
        }
		return (
		<div className="chart">
            <CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
		</div>
		);
	}
}

export default Usage;                   