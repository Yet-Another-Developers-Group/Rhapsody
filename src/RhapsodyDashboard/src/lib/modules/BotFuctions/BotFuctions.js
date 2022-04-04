import { Component } from 'react';
class BotFuctions extends Component {
     constructor(props) {
          super(props);
          this.state = {title: '', description: ''};
      
          this.handleTitleChange = this.handleTitleChange.bind(this);
          this.handleDescChange = this.handleDescChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
     }

     handleTitleChange(event) {
          this.setState({title: event.target.value});
     }

     handleDescChange(event) {
          this.setState({description: event.target.value});
          event.target.style.height = 'inherit';
          event.target.style.height = `${event.target.scrollHeight}px`;
     }
     
     handleSubmit(event) {
          fetch(`http://localhost:1801/announce?title=${this.state.title}&description=${this.state.description.replaceAll('\n', '<rhapsodyAPINewlineIndicator>')}`)
          .then(response => response.json())
          .then((data) => {
               alert("Announcement sent with title \""+data.title+"\". Returned data from server was logged to console.");
               console.log(data);
          })
          .catch(e => console.log(e))
          event.preventDefault();
     }
     render() {
          return (
               <div>
                    <h1>Bot Functions</h1>
                    <h3>Announce Message</h3>
                    <form onSubmit={this.handleSubmit}>
                         <label>
                              Title:<br></br>
                              <input style={{width: "500px"}} placeholder="Announcement" type="text" value={this.state.title} onChange={this.handleTitleChange} />
                         </label><br></br>
                         <label>
                              Description:<br></br>
                              <textarea style={{resize: "none", width: "500px"}} hieght="500" placeholder="Some very very important announcement." value={this.state.description} onChange={this.handleDescChange} />
                         </label><br></br>

                         <input type="submit" value="Announce" />                 
                    </form>
               </div>
          );
     };
}


export default BotFuctions;