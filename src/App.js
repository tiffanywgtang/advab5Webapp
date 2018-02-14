import React, { Component } from 'react';
import './App.css';
import mySocket from "socket.io-client";
import Rooms from './comp/Rooms';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            myImg:require("./imgs/star.png"),
            myImg2:require("./imgs/2.png"),
            allUsers:[],
            myid:null,
            showDisplay:false
        }
    this.handleImg=this.handleImg.bind(this);
    this.handleDisplay=this.handleDisplay.bind(this);
    }
    
    componentDidMount(){
        this.socket = mySocket("http://localhost:10000");
        this.socket.on("userJoined",(data)=>{
           this.setState({
               allUsers:data
           }) 
        });
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myid:data
            });
            
            this.refs.theDisplay.addEventListener("mousemove", (ev)=>{
            
                    if(this.state.myid === null){
                        return false;
                    }

                    this.refs["u"+this.state.myid].style.left=ev.pageX+"px";
                    this.refs["u"+this.state.myid].style.top=ev.pageY+"px";

                    this.socket.emit("mymove", {
                        x:ev.pageX,
                        y:ev.pageY,
                        id:this.state.myid,
                        src: this.refs["u"+this.state.myid].src
                    })
                });
        });
        
        this.socket.on("newmove", (data)=>{
            
            this.refs["u"+data.id].style.left = data.x+"px";
            this.refs["u"+data.id].style.top = data.y+"px";
            this.refs["u"+data.id].src = data.src;
        })
        
    }
    
    handleImg(evt){
        this.refs["u"+this.state.myid].src=evt.target.src;
    }
    
    handleDisplay(roomString){
        this.setState({
            showDisplay:true
        });
        
        this.socket.emit("joinRoom", roomString);
    }
    
    
  render() {
      console.log(this.state.allUsers);
      var allImgs = this.state.allUsers.map((obj, i)=>{
          return(
            <img ref={"u"+obj} className="allImgs" src={this.state.myImg} height={50} key={i}/>
          )
      })
      
      var comp = null;
      
      if(this.state.showDisplay === false){
          comp = (
              <Rooms
              handleDisplay={this.handleDisplay}
              />
          )
      }else{
         comp = (
        <div>
              <div ref ="theDisplay" id="display">
                {allImgs}
                 
                </div>
        
        
            <div id="controls">
                {this.state.myid}
                <img src ={this.state.myImg2} height={50} onClick={this.handleImg}/>
                <img src ={this.state.myImg} height={50} onClick={this.handleImg}/>
            </div>
          </div>
      )
      }
      
      
      
      
    return (
      <div className="App">
            {comp}
        
      </div>
    );
  }
}

export default App;
