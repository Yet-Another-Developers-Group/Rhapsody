import { Component } from 'react';
import './Welcome.css';
import logo from '../../images/fullsize-logo.png';
class WelcomeScreen extends Component {
     render() {
          return (
               <div className='welcome-container'>
                    <center>
                         <img width="250" height="250" alt="Rhapsody Logo" src={logo}></img>
                         <h1>Welcome To Rhapsody!</h1>
                         <p>Use this dashboard to check logs, execute bot fucntions and perform diagnostics.</p>
                    </center>
               </div>
          );
     };
}


export default WelcomeScreen;