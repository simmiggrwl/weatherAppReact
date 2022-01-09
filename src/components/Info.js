import React, {Component} from "react";
import "../App.css";

class Info extends Component {
  constructor() {
    super();
    this.state={
        info:[],
    }
    this.getInfo=this.getInfo.bind(this);
  }

  async getInfo(){
    var pathArray = window.location.pathname.split('/');
    var city=pathArray[2];
    var country=pathArray[3];
    const apicall=await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=1db31d64a574b28b83f890456cee97ce`);
    const data= await apicall.json();
    console.log(data.list);
    if(data) {this.setState({info:data.list});}
    console.log("yo");
    console.log(this.state.info);
}

componentDidMount() {
    this.getInfo();
  }

render() {
    const {info}=this.state;
    var pathArray = window.location.pathname.split('/');
    var city=pathArray[2];
    var country=pathArray[3];
    const weatherinfo = info?.map(i => {
        console.log('hi');
        return(<div className="tableinfo">
            <table id="table"><tbody>
            <caption className="infocaption">{i.dt_txt}</caption>
            <tr><th>Parameter</th><th>Value</th></tr>
              <tr><td>Temperature</td><td>{i.main.temp}</td></tr>
              <tr><td>Maximum Temperature</td><td>{i.main.temp_max}</td></tr>
              <tr><td>Minimum Temperature</td><td>{i.main.temp_min}</td></tr>
              <tr><td>Humidity</td><td>{i.main.humidity}</td></tr>
              <tr><td>Pressure</td><td>{i.main.pressure}</td></tr>
              <tr><td>Wind Speed</td><td>{i.wind.speed}</td></tr>
              <tr><td>Description</td><td>{i.weather[0].description}</td></tr>
              </tbody></table></div>
        )
    });
    return (
        <div>
        <header className="App-header">
          <h1 style={{color:"white"}}>5 Day Weather Forecast For {city}, {country}</h1>
        </header>
          {weatherinfo}
      </div>
    );
  }
}

export default Info;