import { Component } from 'react';

class AboutThisRhapsody extends Component {
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
          fetch('http://localhost:1801/aboutThisRhapsody')
          .then(response => response.json())
          .then((data) => {
               this.setState({serverData: data});
          })
          .catch(e => console.log(e))
     }

     render() {
          return (
               <div>
                    <h1>About This Rhapsody</h1>
               
                    <h3>Configuration</h3>
                    <b>API Interactions Port</b>: {typeof this.state.serverData === "object" ? this.state.serverData.config.apiPort : "Fetching data..."}<br></br>
                    <b>Default Embed Color</b>: {typeof this.state.serverData === "object" ? this.state.serverData.config.defaultEmbedColor : "Fetching data..."}<br></br>
                    <b>Bot Prefix</b>: {typeof this.state.serverData === "object" ? "\"" + this.state.serverData.config.prefix + "\"" : "Fetching data..."}<br></br>

                    <h3>Package</h3>
                    <b>Version</b>: {typeof this.state.serverData === "object" ? this.state.serverData.package.version : "Fetching data..."}<br></br>
                    <b>Full Version</b>: {typeof this.state.serverData === "object" ? this.state.serverData.package.fullVersion : "Fetching data..."}<br></br>
                    <b>Description</b>: {typeof this.state.serverData === "object" ? this.state.serverData.package.description : "Fetching data..."}<br></br>
                    <b>Author</b>: {typeof this.state.serverData === "object" ? this.state.serverData.package.author : "Fetching data..."}<br></br>
                    
                    <br></br><i>Copyright (c) 2022 Sumukh Prasad and Anubhav Shyjesh (YADG)</i>
               </div>
          );
     };
}


export default AboutThisRhapsody;