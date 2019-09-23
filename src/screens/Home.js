import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {createRfid, getRfids} from "../actions/rfid.actions";
import {Button, Container, Nav, Navbar, Modal, Table, Form} from "react-bootstrap";
import {getLogs} from "../actions/log.actions";
import {Formik} from 'formik';

const Home = props => {
    const dispatch = useDispatch()
    const {rfidList} = useSelector(({rfid}) => rfid)
    const {logList} = useSelector(({log}) => log)
    const [selectedTab, setSelectedTab] = useState('rfids')
    const [isModalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        dispatch(getRfids())
        dispatch(getLogs())
    }, [dispatch])

    const init = {
        rfid: '',
        owner: '',
        phoneNumber: ''
    }

    return (
        <>
            <Modal show={isModalOpen} onHide={() => setModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Register New RFID</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={init}
                        onSubmit={async (values, {setSubmitting}) => {
                            await dispatch(createRfid(values))
                            setSubmitting(false)
                            setModalOpen(false)
                        }}>
                        {({
                              values,
                              errors,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                              setFieldValue
                          }) => {
                            return (
                                <Form>
                                    <Form.Group>
                                        <Form.Label>RFID</Form.Label>
                                        <Form.Control name={'rfid'} type="text" placeholder="Enter RFID"
                                                      onChange={handleChange} onBlur={handleBlur} value={values.rfid}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Owner</Form.Label>
                                        <Form.Control name={'owner'} type="text" placeholder="Enter Owner of RFID"
                                                      onChange={handleChange} onBlur={handleBlur} value={values.owner}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control name={'phoneNumber'} type="text" placeholder="Enter Phone Number"
                                                      onChange={handleChange} onBlur={handleBlur}
                                                      value={values.phoneNumber}/>
                                    </Form.Group>
                                    <div style={{textAlign: 'right'}}>
                                        <Button variant="primary" onClick={e => {
                                            e.preventDefault();
                                            handleSubmit()
                                        }}>
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </Modal.Body>
            </Modal>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Electric Door Admin</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={() => setSelectedTab('rfids')}>Registered RFIDs</Nav.Link>
                            <Nav.Link onClick={() => setSelectedTab('logs')}>Logs</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container style={{textAlign: 'left'}}>
                {selectedTab === 'rfids' && (
                    <>
                        <div style={{
                            marginTop: 24,
                            marginBottom: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{fontWeight: 'bold', fontSize: '1.75rem'}}>Registered RFIDs</div>
                            <Button onClick={() => setModalOpen(true)} variant="primary">Register New RFID</Button>
                        </div>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>RFID</th>
                                <th>Owner</th>
                                <th>Phone Number</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rfidList.length && rfidList.map((rfid, index) => (
                                <tr key={rfid._id}>
                                    <td>{index + 1}</td>
                                    <td style={{fontWeight: 'bold'}}>{rfid.rfid}</td>
                                    <td>{rfid.owner}</td>
                                    <td>{rfid.phoneNumber}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </>
                )}
                {selectedTab === 'logs' && (
                    <>
                        <div style={{
                            marginTop: 24,
                            marginBottom: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{fontWeight: 'bold', fontSize: '1.75rem'}}>Logs</div>
                            <Button onClick={() => dispatch(getLogs())} variant="primary"><i
                                className="fas fa-redo"></i> Refresh</Button>

                        </div>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>RFID</th>
                                <th>Registered Name</th>
                                <th>Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            {logList.length && logList.map((log, index) => (
                                <tr key={log._id}>
                                    <td>{index + 1}</td>
                                    <td style={{fontWeight: 'bold'}}>{log.rfid}</td>
                                    <td>{log.registeredName || 'No registered user'}</td>
                                    <td style={{color: log.authorized ? '#297DF6' : 'red'}}>{log.authorized ? 'Authorized' : 'Unauthorized'}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </Container>
        </>
    )
}

export default Home