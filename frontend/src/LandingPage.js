// frontend/src/LandingPage.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import landingImage from './landing-image.png'
function LandingPage() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/dashboard');
    };

    return (
        <Container className="text-center landing-page">
            <Row>
                <Col>
                    <img src={landingImage} alt="Landing" className="img-fluid" />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Button variant="primary" onClick={handleGetStarted}>Get Started</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default LandingPage;