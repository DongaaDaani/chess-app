import React from "react";
import "./Tile.css"

export default function Tile(props){
if(props.number % 2 ===0){
    if(props.image){
        return  <div className='tile black-tile'><div style={{backgroundImage:`url(${props.image})`}} className="chess-piece"></div></div>
    }
    else{
        return   <div className='tile black-tile'></div>
    }
}
else{
    if(props.image){
        return <div className='tile white-tile'> <div style={{backgroundImage:`url(${props.image})`}} className="chess-piece"></div></div>
    }
    else{
        return   <div className='tile white-tile'></div>
    }
    
}
}