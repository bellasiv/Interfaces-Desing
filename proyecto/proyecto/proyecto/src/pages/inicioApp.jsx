import {Link} from "react-router-dom";
import logoimg from "../assets/logo.png"
import Logo from "../components/Logo.jsx"
import Boton from "../components/Boton";

function InicioApp(){

    return(
    <div>
        <div className = "logoContainer">
         <Logo src={logoimg} width="250px" margin="20px" />
        </div>

        <Link to = "/inicioSesion">
            <Boton text = "Sign In" width = "500px" height = "60px" />
        </Link>

        <Link to = "/registro">
            <Boton text = "Register" width = "500px" height = "60px" />
        </Link>

    </div>
    )
}

export default InicioApp;