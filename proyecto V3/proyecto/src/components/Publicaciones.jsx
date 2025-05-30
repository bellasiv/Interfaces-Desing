import React, {useState} from "react";
import "./Publicaciones.css"; // Archivo de estilos

const Post = ({image, user, description}) => {
  const [reaccion, setReactions] = useState(0); // Estado para contar reacciones

  const handleReaction = () => {
    setReactions(reaccion + 1);
  };

  return (
    <div className = "post-two">
      <div className = "user-name"> @ {user} </div>
      <img src = {image} className = "post-image"/>

      <div className = "post-info">
        <button className = "reaction-button" onClick = {handleReaction}>
          Reactions 🤎 {reaccion}
        </button>

        <p className="post-description"> @ {user}: {description}</p>

      </div>
    </div>
  );
};

export default Post;
