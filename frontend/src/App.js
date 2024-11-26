// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { getAccounts, createAccount, updateAccount, deleteAccount, getPosts, createPost, updatePost, deletePost } from './services/api';
import { Container, Row, Col, Form, Button, ListGroup, Modal, Card } from 'react-bootstrap';

function App() {
    const [accounts, setAccounts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [newAccount, setNewAccount] = useState({ platform: '', username: '', access_token: '' });
    const [newPost, setNewPost] = useState({ account: '', content: '', scheduled_time: '' });
    const [editAccount, setEditAccount] = useState(null);
    const [editPost, setEditPost] = useState(null);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);

    useEffect(() => {
        getAccounts().then(response => setAccounts(response.data));
        getPosts().then(response => setPosts(response.data));
    }, []);

    const handleAccountSubmit = (e) => {
        e.preventDefault();
        if (editAccount) {
            updateAccount(editAccount.id, newAccount).then(response => {
                setAccounts(accounts.map(acc => acc.id === editAccount.id ? response.data : acc));
                setEditAccount(null);
            });
        } else {
            createAccount(newAccount).then(response => setAccounts([...accounts, response.data]));
        }
        setNewAccount({ platform: '', username: '', access_token: '' });
        setShowAccountModal(false);
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (editPost) {
            updatePost(editPost.id, newPost).then(response => {
                setPosts(posts.map(post => post.id === editPost.id ? response.data : post));
                setEditPost(null);
            });
        } else {
            createPost(newPost).then(response => setPosts([...posts, response.data]));
        }
        setNewPost({ account: '', content: '', scheduled_time: '' });
        setShowPostModal(false);
    };

    const handleEditAccount = (account) => {
        setEditAccount(account);
        setNewAccount(account);
        setShowAccountModal(true);
    };

    const handleEditPost = (post) => {
        setEditPost(post);
        setNewPost(post);
        setShowPostModal(true);
    };

    const handleDeleteAccount = (id) => {
        deleteAccount(id).then(() => setAccounts(accounts.filter(acc => acc.id !== id)));
    };

    const handleDeletePost = (id) => {
        deletePost(id).then(() => setPosts(posts.filter(post => post.id !== id)));
    };

    return (
        <Container>
            <h1 className="my-4 text-center">Social Media Dashboard</h1>
            <Row className="mb-4">
                <Col className="text-center">
                    <Button variant="primary" onClick={() => setShowAccountModal(true)}>Add Account</Button>
                    <Button variant="secondary" onClick={() => setShowPostModal(true)} className="ml-2">Add Post</Button>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2 className="my-4">Accounts</h2>
                    <ListGroup>
                        {accounts.map(account => (
                            <ListGroup.Item key={account.id} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{account.username}</strong> ({account.platform})
                                </div>
                                <div>
                                    <Button variant="warning" className="mr-2" onClick={() => handleEditAccount(account)}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDeleteAccount(account.id)}>Delete</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={6}>
                    <h2 className="my-4">Scheduled Posts</h2>
                    <ListGroup>
                        {posts.map(post => (
                            <ListGroup.Item key={post.id} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{post.content}</strong> - {new Date(post.scheduled_time).toLocaleString()}
                                </div>
                                <div>
                                    <Button variant="warning" className="mr-2" onClick={() => handleEditPost(post)}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDeletePost(post.id)}>Delete</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

            <Modal show={showAccountModal} onHide={() => setShowAccountModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editAccount ? 'Edit Account' : 'Add Account'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAccountSubmit}>
                        <Form.Group controlId="formPlatform">
                            <Form.Label>Platform</Form.Label>
                            <Form.Control type="text" placeholder="Enter platform" value={newAccount.platform} onChange={(e) => setNewAccount({ ...newAccount, platform: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={newAccount.username} onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formAccessToken">
                            <Form.Label>Access Token</Form.Label>
                            <Form.Control type="text" placeholder="Enter access token" value={newAccount.access_token} onChange={(e) => setNewAccount({ ...newAccount, access_token: e.target.value })} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {editAccount ? 'Update Account' : 'Add Account'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showPostModal} onHide={() => setShowPostModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editPost ? 'Edit Post' : 'Add Post'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlePostSubmit}>
                        <Form.Group controlId="formAccount">
                            <Form.Label>Account</Form.Label>
                            <Form.Control as="select" value={newPost.account} onChange={(e) => setNewPost({ ...newPost, account: e.target.value })}>
                                <option value="">Select Account</option>
                                {accounts.map(account => (
                                    <option key={account.id} value={account.id}>{account.username}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" placeholder="Enter content" value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formScheduledTime">
                            <Form.Label>Scheduled Time</Form.Label>
                            <Form.Control type="datetime-local" value={newPost.scheduled_time} onChange={(e) => setNewPost({ ...newPost, scheduled_time: e.target.value })} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {editPost ? 'Update Post' : 'Add Post'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default App;