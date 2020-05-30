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

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.initData()
    }
  }

  render() {
    return (
      <div id="container">
        <div className="searchbar">
          <div className="form-row">
            <div className="col-md-6 mb-3">
              {/* <label>Search tag here </label> */}
              <input type="text" className="form-control" id="inputTag"  placeholder="Search tag here" 
                value={this.state.searchKey} 
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <div className="col-md-3 mb-3">
              <button type="submit" className="btn btn-primary" onClick={this.initData}>Search</button>
            </div>
          </div>
        </div>

        {this.state.data.map(x => 
          <div className="photocard">
            <div className="border border-primary">
              <img className="photoprops" src={x.link} key={x.title} alt="test"/>
              <div className="card-body">
              <h5 className="card-title">Title : {x.title}</h5>
              <p className="card-text">Date Published : {x.datePublished}</p>
              <br/>
              <p className="card-text">Tags : {x.tags}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default GetPictures;
