// frontend/src/Sidebar.js
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Sidebar() {
    return (
        <div className="sidebar">
            <ListGroup>
                <ListGroup.Item><FaFacebook /> Facebook</ListGroup.Item>
                <ListGroup.Item><FaTwitter /> Twitter</ListGroup.Item>
                <ListGroup.Item><FaInstagram /> Instagram</ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default Sidebar;