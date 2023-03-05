import React, { useEffect, useRef, useState } from "react";
import { act } from "react-dom/test-utils";
import Tile from "../Tile/Tile"
import './ChessBoard.css';

const verticalAxis =["1","2","3","4","5","6","7","8"];
const horizontalAxis=["a","b","c","d","e","f","g","h"];



let activePiece = null

const initialBoardState=[]
export default function ChessBoard(){


  const [gridX,setGridX] = useState(0)
  const [gridY,setGridY] = useState(0)
  const [pieces,setPieces]=useState(initialBoardState)
/*
useEffect(()=>{

},[])  */
    for(var z=0;z<2;z++){
      const type =z=== 0? "b" :"w"
      const y =z ===0? 7:0;
    initialBoardState.push({ image:require(`../../asset/image/rook_${type}.png`),x:0,y:y})
    initialBoardState.push({ image:require(`../../asset/image/rook_${type}.png`),x:7,y:y})
    initialBoardState.push({ image:require(`../../asset/image/knight_${type}.png`),x:1,y:y})
    initialBoardState.push({ image:require(`../../asset/image/knight_${type}.png`),x:6,y:y})
    initialBoardState.push({ image:require(`../../asset/image/bishop_${type}.png`),x:2,y:y})
    initialBoardState.push({ image:require(`../../asset/image/bishop_${type}.png`),x:5,y:y})
    initialBoardState.push({ image:require(`../../asset/image/queen_${type}.png`),x:3,y:y})
    initialBoardState.push({ image:require(`../../asset/image/king_${type}.png`),x:4,y:y})
    }
    
    
    for(let i=0;i<8;i++){
      initialBoardState.push({
        image:require("../../asset/image/pawn_b.png"),x:i,y:6
      })
    }
      
    for(let i=0;i<8;i++){
      initialBoardState.push({
        image:require("../../asset/image/pawn_w.png"),x:i,y:1
      })
    }
    
  
    let board=[]
  
    const chessboardRef = useRef(null)


    function grabPiece(e){


   
      const element = e.target
      const chessboard = chessboardRef.current
      if(element.classList.contains("chess-piece")  && chessboard){

        const gridX = Math.floor((e.clientX - chessboard.offsetLeft)/100)
        const gridY = Math.abs(Math.floor((e.clientY - chessboard.offsetTop-800)/100))-1
        setGridX(gridX);
        setGridY(gridY);
        const x = e.clientX-50;
        const y = e.clientY-50;
        element.style.position ="absolute";
        element.style.left = `${x}px`;
        element.style.top=`${y}px`;
    
        activePiece = element
      }
      else{
        activePiece=null
      }
    
    }
    
    
    function moviePiece(e){
     // const element = e.target
      const chessboard = chessboardRef.current
      if(activePiece && chessboard){

        const minX = chessboard.offsetLeft-25;
        const minY = chessboard.offsetTop-25;
        const maxX = chessboard.offsetLeft + chessboard.clientWidth-75;
        const maxY = chessboard.offsetTop+ chessboard.clientHeight-75;

        console.log('XX'+minX)
        const x = e.clientX-50;
        const y = e.clientY-50;
        activePiece.style.position ="absolute";
        if (x < minX) {
          activePiece.style.left = `${minX}px`;
        }
        //If x is bigger than maximum amount
        else if (x > maxX) {
          activePiece.style.left = `${maxX}px`;
        }
        //If x is in the constraints
        else {
          activePiece.style.left = `${x}px`;
        }
  
        //If y is smaller than minimum amount
        if (y < minY) {
          activePiece.style.top = `${minY}px`;
        }
        //If y is bigger than maximum amount
        else if (y > maxY) {
          activePiece.style.top = `${maxY}px`;
        }
        //If y is in the constraints
        else {
          activePiece.style.top = `${y}px`;
        }
       
      }
    }
    
    function dropPiece(e){
      const chessboard = chessboardRef.current
      if(activePiece && chessboard){
        const x = Math.floor((e.clientX - chessboard.offsetLeft)/100)
        const y = Math.abs(Math.floor((e.clientY - chessboard.offsetTop-800)/100))-1
      
        console.log("XY",x,y)
        setPieces((value)=>{
          const pieces = value.map((p)=>{
            if(p.x===gridX && p.y ===gridY){
              p.x = x;
              p.y=y;
            }
            return p
          }); 
          return pieces
        });
        
        activePiece=null
      }
    }

    for(let j= verticalAxis.length-1; j>=0;j--){
        for(let i=0;i<horizontalAxis.length;i++){
          const number = j+i+2;
          let image=undefined;
          pieces.forEach((p)=>{
            if(p.x===i && p.y ===j){
              image = p.image
            }
          });

          
            board.push(<Tile key={`${j},${i}`} number={number} image={image}/>)
          /*
          if(number%2===0){
            board.push(<span className="tile black-tile"></span>)
          }
          else{
            board.push(<span className="tile white-tile"></span>)
          } */
           
                   
        }
    }

   
    console.log('VALUE' + board)
   // const listItems = board.map((board) => <span>{board}</span>);
    
   return <div 
   onMouseUp={e=>dropPiece(e)}
    onMouseMove={e=> moviePiece(e)}
     onMouseDown={e => grabPiece(e)} 
     ref={chessboardRef} id="chessboard">
      {board}
      </div>
}