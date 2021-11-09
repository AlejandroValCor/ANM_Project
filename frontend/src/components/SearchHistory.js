import React from "react";
import LoadingWheel from './Loading';
import '../css/SearchHistory.css';

class SearchHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {SearchHistoryData: ['No search history']}
  }

  async componentDidMount() {
    const data = await fetch(`/searchHistory`);
    const searchHistory = await data.json();
    this.setState({SearchHistoryData: searchHistory});
  }

  async componentDidUpdate() {
    const data = await fetch(`/searchHistory`);
    const searchHistory = await data.json();

    if(searchHistory.error) {
      alert("Unknown error.");
    }
    else{
      this.setState({SearchHistoryData: searchHistory});
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
            Earthquakes location search history
          </h1>
        </div>
        {this.state.SearchHistoryData[0] === 'No search history' &&
          <LoadingWheel/>
        }

        {this.state.SearchHistoryData.length === 0 &&
          <table id='searchHistoryTable'>
            <tbody>
              <tr key={1} className='header'>
                <th>Location</th>
                <th>Date</th>
              </tr>
              <tr key={2}>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        }

        {(this.state.SearchHistoryData[0] !== 'No search history' && this.state.SearchHistoryData[0] !== undefined) &&
          <table id='searchHistoryTable'>
            <tbody>
              <tr key={1} className='header'>
                <th>Location</th>
                <th>Date</th>
              </tr>
              {
                this.state.SearchHistoryData.map(consult => (
                    <tr key={consult.date}>
                      <td>{consult.label}</td>
                      <td>{consult.date}</td>
                    </tr>
                ))
              }
            </tbody>
          </table>
        }
      </section>
    );
  }
}

export default SearchHistory;