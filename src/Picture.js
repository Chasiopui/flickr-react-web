import React from 'react';
import ReactPaginate from 'react-paginate';
// import logo from './logo.svg';
import crud from './services/crudService';
import './App.css';

class GetPictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
        data: [],
        offset: 0,
        perPage: 4,
        currentPage: 0
    };
    this.handlePageClick = this
        .handlePageClick
        .bind(this);
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

    const slice = this.state.data.slice(this.state.offset, this.state.offset + this.state.perPage)
    const postData = slice.map(x => <React.Fragment>
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
    </React.Fragment>)

    this.setState({
      pageCount: Math.ceil(this.state.data.length / this.state.perPage),
      postData
    })
    
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.initData()
    });

};

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
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />

        <div className="searchbar">
          <div className="form-row">
            <div className="col-md-6 mb-3">
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

        {this.state.postData}

        {/* {this.state.data.map(x => 
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
        )} */}
      </div>
    )
  }
}
export default GetPictures;
