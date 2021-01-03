import React,{useRef} from 'react'
import {Modal,Form,Button} from 'react-bootstrap'
import {useContacts} from '../Contexts/ContactsProvider'

export default function ContactModal({closeModal}) {
    const inputID = useRef()
    const inputName= useRef()

    // Estou pegando a função do meu contexto
    const {createContact}=useContacts()

    function handleSubmit(e){
        e.preventDefault()
        createContact(inputID.current.value,inputName.current.value)
        closeModal()
    }
    return (
        <div>
            <Modal.Header closeButton>
                CRIAR CONTATO
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            ID
                        </Form.Label>
                        <Form.Control type="text" ref={inputID}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            NAME
                        </Form.Label>
                        <Form.Control type="text" ref={inputName}>

                        </Form.Control>
                    </Form.Group>
                    <Button type="submit">
                        CRIAR CONTATO
                    </Button>
                    
                </Form>
            </Modal.Body>
        </div>
    )
}
