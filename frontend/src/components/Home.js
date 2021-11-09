import React from "react";
import Map from './Map';
import EarthquakeForm from './EarthquakeForm'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {earthquakeData: {
            "label": "CDMX, Mexico",
            "latitude": 19.43456671929005,
            "longitude": -99.13307955861596,
            "recentEarthquakes": []
        }};
    
        this.onFormSubmit = this.onFormSubmit.bind(this);
      }

    async onFormSubmit(address) {
        const data = await fetch(`/earthquakes?address=${address}`);
        const earthquakes = await data.json();
        if(earthquakes.error){
            alert("Location not found.");
        }
        else{
            this.setState({earthquakeData: earthquakes});
        }
    }

    render(){
        return(
            <section>
                <div style={{ width: "80vw" }} className="container-fluid">
                    <h1>
                        Recent earthquakes application
                    </h1>
                    <EarthquakeForm aling={'center'} onSubmit={this.onFormSubmit}/>
                    <Map
                        aling={'center'}
                        loadingElement= {<p>Cargando</p>}
                        earthquakeData={this.state.earthquakeData}
                    />
                </div>
            </section>
        );
    }
}

export default Home;