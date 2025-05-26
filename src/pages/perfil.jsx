import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Menu from "../components/menu.jsx";
import FotoPerfil from "../components/FotoPerfil.jsx";
import PostLateral from "../components/PostLateral.jsx";
import ProfileInfo from "../components/InfoPerfil.jsx";

function Perfil({ profileImage, setProfileImage }) {  
  return (
    <Container fluid className="p-0">
      <Menu />
      <Row className="g-0">
        <Col xs={12} md={4} lg={3}>
          <FotoPerfil profileImage={profileImage} />
        </Col>
        <Col xs={12} md={8} lg={6}>
          <ProfileInfo onImageUpdate={setProfileImage} />
        </Col>
        <Col lg={3} className="d-none d-lg-block">
          <PostLateral />
        </Col>
      </Row>
    </Container>
  );
}

export default Perfil;