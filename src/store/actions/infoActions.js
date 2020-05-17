import axios from 'axios';
const API_KEY='EQZ4PEbheOr5-bqkz2eNoe9l77yxTydjzVw3ZDdcNtk';
const ROOT_URL=`https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&`;
// latitude=20.951665800000004&longitude=85.0985236&oneobservation=true&apiKey=EQZ4PEbheOr5-bqkz2eNoe9l77yxTydjzVw3ZDdcNtk

export const fetchReport=(latitude,longitude)=>async dispatch=>{
    const url=`${ROOT_URL}latitude=${latitude}&longitude=${longitude}&oneobservation=true&apiKey=${API_KEY}`;
    const request=await axios.get(url);
    console.log(request.data);
    return {
        type:'FETCH_WEATHER',
        payload:request.data
    }
}

// export const fetchReport=(latitude,longitude)=>async dispatch=>{
//     console.log('In the info actions');
//     const response=await axios.get(`${ROOT_URL}latitude=${latitude}&longitude=${longitude}&oneobservation=true&apiKey=${API_KEY}`);
//     dispatch({type:'FETCH_WEATHER',payload:response})
// }