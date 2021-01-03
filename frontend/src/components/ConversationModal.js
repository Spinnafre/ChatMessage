import React,{useState} from 'react'
import {Modal,Form,Button} from 'react-bootstrap'
import {useContacts} from '../Contexts/ContactsProvider'
import {useConversations} from '../Contexts/ConversationsProvider'

export default function ConversationModal({closeModal}) {
    const [selectedContactID,setSelectedContactID]=useState([])


    // Estou pegando a função do meu contexto
    const {contacts}=useContacts()
    const {createConversation}=useConversations()

    function handleSubmit(e){
        e.preventDefault()
        createConversation(selectedContactID)
        closeModal()
    }
    function handleCheckBox(id){
        // PrevSelected irá ser o valor anterior do state
        setSelectedContactID(prevSelected=>{
            // Se o valor anterior já tiver o valor que estou selecionando então
            // irei filtrar
            if(prevSelected.includes(id)){
                return prevSelected.filter(prev=>prev.id !==id)
            }
            else{
                return [...prevSelected,id]
            }
        })
   
    }
    return (
        <div>
            <Modal.Header closeButton>
                CRIAR CONVERSA
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact=>(
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check 
                            type="checkbox" 
                            value={selectedContactID.includes(contact.id)} 
                            label={contact.name} 
                            onChange={()=>handleCheckBox(contact.id)}>

                            </Form.Check>
                        </Form.Group>
                    ))}
                    <Button type="submit">
                        CRIAR CONTATO
                    </Button>

                </Form>
            </Modal.Body>
        </div>
    )
}
