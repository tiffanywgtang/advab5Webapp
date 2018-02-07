import React, { Component } from 'react';
import './App.css';
import mySocket from "socket.io-client";


class App extends Component {
    constructor(props){
        super(props);
        this.state={
            myImg:require("./imgs/star.png"),
            myImg2:require("./imgs/2.png"),
            allUsers:[],
            myid:null
        }
    this.handleImg=this.handleImg.bind(this);
    }
    
    componentDidMount(){
        this.socket = mySocket("https://adclab.herokuapp.com/");
        this.socket.on("userJoined",(data)=>{
           this.setState({
               allUsers:data
           }) 
        });
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myid:data
            })
        })
        
        this.socket.on("newmove", (data)=>{
            
            this.refs["u"+data.id].style.left = data.x+"px";
            this.refs["u"+data.id].style.top = data.y+"px";
            this.refs["u"+data.id].src = data.src;
        })
        
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
    }
    
    handleImg(evt){
        this.refs["u"+this.state.myid].src=evt.target.src;
    }
    
    
    
    
  render() {
      
      var allImgs = this.state.allUsers.map((obj, i)=>{
          return(
            <img ref={"u"+obj} className="allImgs" src={this.state.myImg} height={50} key={i}/>
          )
      })
      
    return (
      <div className="App">
        <div ref ="theDisplay" id="display">
        {allImgs}
            <img ref="myImg" id="myImg" src={this.state.myImg}height={50}/>
        </div>
        
        
        <div id="controls">
            {this.state.myid}
            <img src ={this.state.myImg2} height={50} onClick={this.handleImg}/>
            <img src ={this.state.myImg} height={50} onClick={this.handleImg}/>
        </div>
        
      </div>
    );
  }
}

export default App;
