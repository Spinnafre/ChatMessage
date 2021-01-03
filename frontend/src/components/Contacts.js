import React from 'react'
import { useContacts } from '../Contexts/ContactsProvider'
import { ListGroup } from 'react-bootstrap'

export default function Contacts() {
    // Peguei o contacts da provider(Contexto)
    const { contacts } = useContacts()

    return (
        <ListGroup variant="flush">
           {contacts.map(contact=>(
               <ListGroup.Item key={contact.id}>
                   {contact.name}
               </ListGroup.Item>
           ))} 
        </ListGroup>
    )
}
