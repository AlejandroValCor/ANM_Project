import React from 'react';
import {GoogleMap, LoadScript, Marker, InfoWindow, Polygon} from '@react-google-maps/api';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedEarthquake: null};
    }

    render() {
        const paths = [
            { lat: this.props.earthquakeData.north, lng: this.props.earthquakeData.west },
            { lat: this.props.earthquakeData.south, lng: this.props.earthquakeData.west },
            { lat: this.props.earthquakeData.south, lng: this.props.earthquakeData.east },
            { lat: this.props.earthquakeData.north, lng: this.props.earthquakeData.east },
            { lat: this.props.earthquakeData.north, lng: this.props.earthquakeData.west }
          ]
          
          const options = {
            fillColor: "blue",
            fillOpacity: 0.1,
            strokeColor: "red",
            strokeOpacity: 1,
            strokeWeight: 2,
            clickable: false,
            draggable: true,
            editable: false,
            geodesic: false,
            zIndex: 1
          }

        return(
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLEMAPSAPIKEY}
            >
                <GoogleMap
                    mapContainerStyle={{ height: "45vw", width: "80vw" }}
                    zoom={9}
                    center={{lat: this.props.earthquakeData.latitude, lng: this.props.earthquakeData.longitude}}>

                    {this.props.earthquakeData.recentEarthquakes.map((earthquake) => (
                        <Marker
                        key={earthquake.eqid}
                        position={{
                            lat: earthquake.lat,
                            lng: earthquake.lng}}
                        onClick={() => {
                            this.setState({selectedEarthquake: earthquake});
                        }}
                        icon={{
                            url: '/Earthquake_Image.png',
                            scaledSize: new window.google.maps.Size(40, 40)
                        }}
                        />   
                    ))}
        
                    {this.state.selectedEarthquake && (
                        <InfoWindow 
                        position={{
                            lat: this.state.selectedEarthquake.lat,
                            lng: this.state.selectedEarthquake.lng}}
                            
                        onCloseClick={() => {
                            this.setState({selectedEarthquake: null});
                        }}
                        >
                            <div>
                                <h1 style={{color: 'black', fontSize: 14}}>Earthquake details:</h1>
                                <p style={{color: 'black', fontSize: 14, textAlign: 'left'}}>
                                    Date: {this.state.selectedEarthquake.datetime}<br />
                                    Depth: {this.state.selectedEarthquake.depth}<br />
                                    Source: {this.state.selectedEarthquake.src}<br />
                                    EQID: {this.state.selectedEarthquake.eqid}<br />
                                    Magnitude: {this.state.selectedEarthquake.magnitude}
                                </p>
                            </div>
                        </InfoWindow>
                    )}

                    {this.props.earthquakeData.north && (
                        <Polygon
                            paths={paths}
                            options={options}
                        />
                    )}
                </GoogleMap>
            </LoadScript>
        );
    }
}

export default Map