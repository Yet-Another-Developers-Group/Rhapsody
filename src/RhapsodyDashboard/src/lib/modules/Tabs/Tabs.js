import { Component } from 'react';
import './Tabs.css';
import Tab from './Tab/Tab.js';
import TabButton from './TabButton/TabButton';
import WelcomeScreen from '../Welcome/Welcome';
class Tabs extends Component {
     constructor(props) {
          super(props);
          this.state = {
               activeId: "Welcome To Rhapsody",
          };
     }

     toggleActive = id => e => this.setState(({ activeId }) => ({
          activeId: id, // toggle same id off, or set new
     }));
      
     render() {
          const { activeId } = this.state;
          return (
               <div>
                    <div className='tab-buttons-container'>
                         <TabButton isActive={activeId === "Welcome To Rhapsody"} onClick={this.toggleActive("Welcome To Rhapsody")} name={"Welcome To Rhapsody"} key={"Welcome_To_Rhapsody-tab-button"} />
                         {this.props.tabids.map((name) =>
                              <TabButton isActive={activeId === name} onClick={this.toggleActive(name)} name={name} key={name + "-tab-button"} />
                         )}
                    </div>
                    <div className='tabs-container'>
                    <Tab isActive={activeId === "Welcome To Rhapsody"} name={"Welcome To Rhapsody"} key={"Welcome_To_Rhapsody-tab"}><WelcomeScreen /></Tab>
                         {this.props.tabids.map((name) =>
                              <Tab isActive={activeId === name} name={name} key={name.replaceAll(' ', '_') + "-tab"}>{this.props.children.filter(child => child.props.tabid === name)}</Tab>
                         )}
                    </div>
               </div>
          );
     };
}


export default Tabs;