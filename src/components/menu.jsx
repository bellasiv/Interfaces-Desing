import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Form, InputGroup } from 'react-bootstrap';
import "./menu.css";
import { FaHome, FaMap, FaCrown, FaComments, FaCamera, FaSearch, FaUserCircle } from "react-icons/fa"; 

const Menu = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? "menu-item active" : "menu-item";
  };

  return (
    <Navbar expanded={expanded} expand="lg" className="menuPrincipal" fixed="top">
      <Container fluid>
        <Navbar.Toggle 
          aria-controls="navbar-nav" 
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto menu">
            <Nav.Link 
              as={Link} 
              to="/paginaPrincipal" 
              className={isActive("/paginaPrincipal")}
              onClick={() => setExpanded(false)}
            >
              <FaHome className="icon" />
              <span className="d-none d-lg-inline ms-2">Home</span>
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/petMap" 
              className={isActive("/petMap")}
              onClick={() => setExpanded(false)}
            >
              <FaMap className="icon" />
              <span className="d-none d-lg-inline ms-2">PetMap</span>
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/ranking" 
              className={isActive("/ranking")}
              onClick={() => setExpanded(false)}
            >
              <FaCrown className="icon" />
              <span className="d-none d-lg-inline ms-2">Ranking</span>
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/chat" 
              className={isActive("/chat")}
              onClick={() => setExpanded(false)}
            >
              <FaComments className="icon" />
              <span className="d-none d-lg-inline ms-2">Chat</span>
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/post" 
              className={isActive("/post")}
              onClick={() => setExpanded(false)}
            >
              <FaCamera className="icon" />
              <span className="d-none d-lg-inline ms-2">Post</span>
            </Nav.Link>
          </Nav>

          <Form className="d-none d-lg-flex search-container1">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search users"
                className="search-input"
              />
              <InputGroup.Text>
                <FaSearch className="search-icon" />
              </InputGroup.Text>
            </InputGroup>
          </Form>

          <Nav.Link 
            as={Link} 
            to="/perfil" 
            className="profile ms-3"
            onClick={() => setExpanded(false)}
          >
            <FaUserCircle className="profile-icon" />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;