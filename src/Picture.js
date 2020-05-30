import React from 'react';
// import logo from './logo.svg';
import crud from './services/crudService';
import './App.css';

class GetPictures extends React.Component {
  state = {
    searchKey: '',
    data: []
  }

  api = crud('get-picture')

  async componentDidMount() {
    this.initData()
  }

  initData = async () => {
    const payload = {
      searchKey: this.state.searchKey
    }
    const data = await this.api.getFiltered({ params: payload })
    this.setState({ data: data.data })
  }

  handleChange(event) {
    this.setState({searchKey: event.target.value})
  }

  render() {
    return (
      <div id="container">
        <div className="photoprops">
          <div className="form-group">
            <label>Search tag here :</label>
            <input type="text" className="form-control" id="inputTag"  placeholder="Search tag here" 
              value={this.state.searchKey} 
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.initData}>Search</button>
        </div>
        

        {this.state.data.map(x => 
          <div>{x.title}
            <img src={x.link} key={x.title} alt="test"></img>
          </div>
        )}
      </div>
    )
  }
}

// function GetPicture() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/Picture.js</code> and save to reload.
//           Test
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default GetPictures;
