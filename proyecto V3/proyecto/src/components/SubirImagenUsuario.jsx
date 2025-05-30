import React, { useState } from 'react';

const SubirImagen = () => {
  const [imagenUrl, setImagenUrl] = useState(null);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'fotosUsuario'); // tu upload preset
    formData.append('cloud_name', 'dvnwgsewi');        // tu cloud name

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dvnwgsewi/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      console.log('URL de la imagen:', data.secure_url);
      setImagenUrl(data.secure_url); // mostrar la imagen
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  return (
    <div>
      <h2>Sube tu imagen</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) handleImageUpload(file);
        }}
      />
      {imagenUrl && (
        <div>
          <p>Imagen subida:</p>
          <img src={imagenUrl} alt="Imagen subida" width="300" />
        </div>
      )}
    </div>
  );
};

export default SubirImagen;
