import { Component } from 'react';
import './TabButton.css';
class TabButton extends Component {
     render() {
          const { isActive, onClick } = this.props;
          return (
               <button onClick={onClick} className={isActive ? 'tab-button-active' : 'tab-button'} key={this.props.name + "-tab-button"}>{this.props.name}</button>
          );
     };
}


export default TabButton;