import React from "react";
import LoadingWheel from './Loading';

class LargestEarthquakes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {largestEarthquakesData: []}
  }

  async componentDidMount() {
    const data = await fetch(`/largestEarthquakes`);
    const largestEarthquakes = await data.json();

    if(largestEarthquakes.error){
      alert("Unknown error.");
    }
    else{
      this.setState({largestEarthquakesData: largestEarthquakes});
    }
  }

  async componentDidUpdate() {
    const data = await fetch(`/largestEarthquakes`);
    const largestEarthquakes = await data.json();
    
    if(largestEarthquakes.error) {
      alert("Unknown error.");
    }
    else{
      this.setState({largestEarthquakesData: largestEarthquakes});
    }
  }

  componentWillUnmount() {
    this.setState = () =>{
        return;
    };
  }

  render() {
    return(
      <section>
        <div style={{ width: "80vw" }} className="container-fluid">
          <h1>
            Top 10 largest earthquakes in the world for the last 12 months
          </h1>
        </div>
        {this.state.largestEarthquakesData.length === 0 &&
          <LoadingWheel/>
        }

        {this.state.largestEarthquakesData.length !== 0 &&
          this.state.largestEarthquakesData.map(consult => (
            <li key={consult.datetime} className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h5 style={{color: "black", textAlign: 'left' }}>{consult.datetime}</h5>
                <h6 style={{color: "grey", textAlign: 'left' }}>Latitude: {consult.lat}</h6>
                <h6 style={{color: "grey", textAlign: 'left' }}>Longitude: {consult.lng}</h6>
              </div>
              <span style={{color: "red", position: 'absolute', left: '95%', top: '50%', transform: 'translate(-50%, -50%)'}}>{consult.magnitude}</span>
            </li>
          ))
        }
      </section>
    );
  }
}

export default LargestEarthquakes;