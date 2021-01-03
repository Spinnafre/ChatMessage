import React,{useRef} from 'react'

import {Button, Container,Form} from 'react-bootstrap'

import {v4 as uuidV4} from 'uuid'

export default function Login({submitID}) {

    const idRef = useRef()

    function handleSubmit(e){
        e.preventDefault()

        submitID(idRef.current.value)
    }

    function createNewId(){
        submitID(uuidV4())
    }

    return (
        <Container className="align-items-center d-flex" style={{height:'100vh'}}> 
            <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Digite o seu ID</Form.Label>
                    <Form.Control type="text" ref={idRef}></Form.Control>
                </Form.Group>
                <Button type="submit" className="mr-2">Login</Button>
                <Button variant="secondary" onClick={createNewId}>Register</Button>
            </Form>
        </Container>
    )
}
