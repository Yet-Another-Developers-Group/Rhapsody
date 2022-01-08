import { Component } from 'react';

class AboutServer extends Component {
     constructor(props) {
          super(props);
          this.state = {
               serverData: "Loading..."
          }
     }

     componentDidMount () {
          this.fetchData();
     }

     fetchData() {
          fetch('http://localhost:1801/aboutServer')
          .then(response => response.json())
          .then((data) => {
               this.setState({serverData: data});
          })
          .catch(e => console.log(e))
     }

     render() {
          return (
               <div>
                    <h1>About The Server</h1>
                    <h3>CPU</h3>
                    <b>Manufacturer</b>: {typeof this.state.serverData === "object" ? this.state.serverData.cpu.manufacturer : "Fetching data..."}<br></br>
                    <b>Brand</b>: {typeof this.state.serverData === "object" ? this.state.serverData.cpu.brand : "Fetching data..."}<br></br>
                    <b>Speed</b>: {typeof this.state.serverData === "object" ? this.state.serverData.cpu.speed + "GHz" : "Fetching data..."}<br></br>
                    <b>Total Cores</b>: {typeof this.state.serverData === "object" ? this.state.serverData.cpu.cores : "Fetching data..."}<br></br>
                    <b>Physical Cores</b>: {typeof this.state.serverData === "object" ? this.state.serverData.cpu.physicalCores : "Fetching data..."}<br></br>

                    <h3>Memory</h3>
                    <b>Total Memory</b>: {typeof this.state.serverData === "object" ? this.state.serverData.mem.total/1024/1024/1024 + " GB" : "Fetching data..."}<br></br>

                    <h3>OS</h3>
                    <b>Platform</b>: {typeof this.state.serverData === "object" ? this.state.serverData.os.platform : "Fetching data..."}<br></br>
                    <b>Release</b>: {typeof this.state.serverData === "object" ? this.state.serverData.os.release : "Fetching data..."}<br></br>
                    <b>Architecture</b>: {typeof this.state.serverData === "object" ? this.state.serverData.os.arch : "Fetching data..."}<br></br>

                    <h3>System</h3>
                    <b>Manufacturer</b>: {typeof this.state.serverData === "object" ? this.state.serverData.system.manufacturer : "Fetching data..."}<br></br>
                    <b>Model</b>: {typeof this.state.serverData === "object" ? this.state.serverData.system.model : "Fetching data..."}<br></br>
                    
               </div>
          );
     };
}


export default AboutServer;