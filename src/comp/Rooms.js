import React, { Component } from 'react';

class Rooms extends Component {
    constructor(props){
        super(props);
        this.state={
          
        }
  
    }
    
  
    
  render() {
      
      
    return (
      <div>
        <button onClick={this.props.handleDisplay.bind(this,"room1")}>Room 1</button>
        <button onClick={this.props.handleDisplay.bind(this,"room2")}>Room 2</button><button onClick={this.props.handleDisplay.bind(this,"room3")}>Room 3</button><button onClick={this.props.handleDisplay.bind(this,"room4")}>Room 4</button>
      </div>
    );
  }
}

export default Rooms;
