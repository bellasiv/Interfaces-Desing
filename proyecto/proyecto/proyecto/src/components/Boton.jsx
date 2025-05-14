import "./Boton.css";

function Boton({text, onClick, width = "200px", height = "50px"}){
  return(
    <button className = "boton" onClick = {onClick} style = {{width: width, height: height}}>
        {text}
    </button>
  );
}

export default Boton;