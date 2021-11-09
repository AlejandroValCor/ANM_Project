import React from "react";
import {Spinner} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Loading.css'

class LoadingWheel extends React.Component {
  render() {
    return(
    <div className='divExterior'>
        <div className='divInterior'>
            <Spinner color='success'/>
        </div>
    </div>
    );
  }
}

export default LoadingWheel;