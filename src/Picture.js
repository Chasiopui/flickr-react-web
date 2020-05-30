import React from 'react';
import logo from './logo.svg';
import crud from './services/crudService';
import './App.css';

class GetPictures extends React.Component {
  state = {
    data: []
  }

  api = crud('get-picture')

  async componentDidMount() {
    this.initData()
  }

  initData = async () => {
    // const payload = {
    // }

    // const {data} = await this.api.getFiltered(payload)
    const {data} = await this.api.getAll()
    // console.log(data)
    this.setState({ data: data })
  }


  render() {
    return (
      <ul>
        {this.state.data}
        1
      </ul>
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
