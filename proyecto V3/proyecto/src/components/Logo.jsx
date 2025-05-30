import "./Logo.css";

function Logo({ src, width, margin }) {
    return (
      <img 
        src={src} 
        alt="Logo"
        style={{ width, margin }} 
      />
    );
  }
  

export default Logo;
  
