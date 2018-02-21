import React, { Component } from 'react';
import mySocket from 'socket.io-client';

class Test extends Component {
    constructor(props){
        super(props);
        
        this.state={
            screen:0,
            host:null,
            qObj:{Q:null,O1:null,O2:null,A:null},
        }
  
    }
    
    componentDidMount(){
        this.socket = mySocket("http://localhost:10000");
        
        this.socket.on("newQ", (data)=>{
            this.setState({
                qObj:data
            })
        });
        
        this.socket.on("result", (data)=>{
            alert(data);
        })
    }
    
  changeScreen=(roomStr)=>{
      this.setState({
          screen:1
      });
      this.socket.emit("joinedRoom", roomStr);
  }
  
  handleHost=(isHost)=>{
      this.setState({
          screen:2,
          host:isHost
      });
  }
  
  handleQ=()=>{
      var obj={
          Q:this.refs.Q.value,
          O1:this.refs.O1.value,
          O2:this.refs.O2.value,
          A:this.refs.A.value
          //when calling refs  it is plurual when calling it  
   }
      this.socket.emit("qSubmit", obj);
      
  }
      
      handleA=(optionNum)=>{
          this.socket.emit("answer", optionNum);
      }
    
  render() {
      
      var comp = null;
      
        if(this.state.screen === 0){
            comp=(
            <div>
                <button onClick={this.changeScreen.bind(this,"room1")}>Room 1</button>
                <button onClick={this.changeScreen.bind(this,"room2")}>Room 2</button>
            </div>
            )
        }else if(this.state.screen === 1){
            comp=(
            <div>
                <button onClick={this.handleHost.bind(this,true)}>Host</button>
                <button onClick={this.handleHost.bind(this,false)}>Player</button>
                </div>
            )
        }else if(this.state.screen === 2){
            if(this.state.host === true){
                comp = (
                <div>
                    <input ref="Q" type="text" placeholder="Ask a Question"/>
                    <input ref="O1"type="text" placeholder="Option 1"/>
                    <input ref="O2" type="text" placeholder="Option 2"/>
                        <select ref="A">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        </select>
                    <button onClick={this.handleQ}>Submit</button>
                    </div>
                    
                )
            }else if(this.state.host === false){
                comp = (
                <div>
                    <div>{this.state.qObj.Q}</div>
                    <button onClick={this.handleA.bind(this,"1")}>{this.state.qObj.O1}</button>
                    <button onClick={this.handleA.bind(this,"2")}>{this.state.qObj.O2}</button>
                    </div>
                )
            }
        }
            
    return (
      <div>
       {comp}
      </div>
    );
  }
}

export default Test;
