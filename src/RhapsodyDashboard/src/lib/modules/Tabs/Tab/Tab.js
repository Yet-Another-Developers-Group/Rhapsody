import { Component } from 'react';
import './Tab.css';

class Tab extends Component {
     render() {
          const { isActive } = this.props;
          return (
               <div className={isActive ? 'tab' : 'tab-hidden'}>
                    {this.props.children}
               </div>
          );
     };
}


export default Tab;