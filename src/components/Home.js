import React, {Component} from "react";
import "../App.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      country: '',
      weather:0,
      temp:0,
      maxtemp:0,
      mintemp:0,
      humidity:0,
      pressure:0,
      description:'',
      windspeed:0,
      time:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.getWeather=this.getWeather.bind(this);
    this.getData=this.getData.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});}

  handleSubmit(e){
    e.preventDefault();
    console.log('hi');
    const {city,country}=this.state;
    window.location.href=`/info/${city}/${country}`;
  }

  getWeather= async(e)=>{
    e.preventDefault();
    this.setState({
      city:e.target.elements.city.value,
      country:e.target.elements.country.value,
      weather:1
    })
    const apicall=await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},${this.state.country}&appid=1db31d64a574b28b83f890456cee97ce`);
    const data= await apicall.json();
    console.log(data);
    if(data.message==='city not found'){
      this.setState({
        city:'',
        country:'',
        weather:0
      })
    }
  }

  async getData(number){
    const apicall=await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},${this.state.country}&appid=1db31d64a574b28b83f890456cee97ce`);
    const data= await apicall.json();
    this.setState({
      temp: data.list[number].main.temp,
      maxtemp: data.list[number].main.temp_max,
      mintemp: data.list[number].main.temp_min,
      humidity: data.list[number].main.humidity,
      pressure:data.list[number].main.pressure,
      description:data.list[number].weather[0].description,
      windspeed:data.list[number].wind.speed,
      time:data.list[number].dt_txt
    })
    console.log(this.state.time);
  }

  render() {
    var days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
    var today=new Date();
    var day=today.getDay();
    return (
      <div className="App">
        <header className="App-header">
          <h1>Weather App</h1>
        </header>
            <form onSubmit={this.getWeather} id="form">
              <label htmlFor="city">City</label>
              <input type="text" name="city" value={this.state.city} placeholder="Enter city" onChange={this.handleChange}/>
              <label htmlFor="country">Country</label>
              <input type="text" name="country" value={this.state.country} placeholder="Enter country" onChange={this.handleChange}/>
              <button type="submit" className="formbutton">Get Weather</button>
            </form>
            {this.state.weather===1 && (
              <div className="buttons">
              <button className="button" onClick={()=>this.getData(0)}>{days[day]}</button>
              <button className="button" onClick={()=>this.getData(8)}>{days[day+1]}</button>
              <button className="button" onClick={()=>this.getData(16)}>{days[day+2]}</button>
              <button className="button" onClick={()=>this.getData(24)}>{days[day+3]}</button>
              <button className="button" onClick={()=>this.getData(32)}>{days[day+4]}</button>
              </div>
            )}
          {this.state.temp!==0 && (<div className="info"><div className="tablediv">
            <table id="table">
              <tbody>
              <caption style={{whiteSpace: "nowrap", overflow:"hidden"}}>*this data is for {this.state.time}. For more accurate data, click on More Information.</caption>
              <tr><th>Parameter</th><th>Value</th></tr>
              <tr><td>Temperature</td><td>{this.state.temp}</td></tr>
              <tr><td>Maximum Temperature</td><td>{this.state.maxtemp}</td></tr>
              <tr><td>Minimum Temperature</td><td>{this.state.mintemp}</td></tr>
              <tr><td>Humidity</td><td>{this.state.humidity}</td></tr>
              <tr><td>Pressure</td><td>{this.state.pressure}</td></tr>
              <tr><td>Wind Speed</td><td>{this.state.windspeed}</td></tr>
              <tr><td>Description</td><td>{this.state.description}</td></tr>
              </tbody>
            </table>
          </div>
            {/* <p className="belowtable">*this data is for {this.state.time}</p> */}
            <button className="button" onClick={this.handleSubmit}>More Information</button>
          </div>)}
      </div>
    );
  }
}

export default Home;