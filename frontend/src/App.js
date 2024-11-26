// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { getAccounts, getPosts, createPost } from './services/api';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

function App() {
    const [accounts, setAccounts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ account: '', content: '', scheduled_time: '' });

    useEffect(() => {
        getAccounts().then(response => setAccounts(response.data));
        getPosts().then(response => setPosts(response.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost(newPost).then(response => setPosts([...posts, response.data]));
    };

    return (
        <Container>
            <h1 className="my-4">Social Media Dashboard</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formAccount">
                    <Form.Label>Account</Form.Label>
                    <Form.Control as="select" onChange={(e) => setNewPost({ ...newPost, account: e.target.value })}>
                        <option value="">Select Account</option>
                        {accounts.map(account => (
                            <option key={account.id} value={account.id}>{account.username}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="text" placeholder="Enter content" onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="formScheduledTime">
                    <Form.Label>Scheduled Time</Form.Label>
                    <Form.Control type="datetime-local" onChange={(e) => setNewPost({ ...newPost, scheduled_time: e.target.value })} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Schedule Post
                </Button>
            </Form>
            <h2 className="my-4">Scheduled Posts</h2>
            <ListGroup>
                {posts.map(post => (
                    <ListGroup.Item key={post.id}>
                        {post.content} - {post.scheduled_time}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default App;