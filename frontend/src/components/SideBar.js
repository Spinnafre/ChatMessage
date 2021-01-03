import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'

import Contacts from './Contacts'
import Conversation from './Conversation'
import NewContact from './ContactModal'
import NewConversation from './ConversationModal'

export default function SideBar({ id }) {
    const [active, setActive] = useState('conversations')
    const [openModal, setOpenModal] = useState(false)


    const activeConversation = active === 'conversations'

    function closeModal(){
        setOpenModal(false)
    }

    return (
        <div className="d-flex flex-column" style={{ width: '260px' }}>
            <Tab.Container activeKey={active} onSelect={setActive}>
                <Nav variant="tabs" className="justfy-content-center">

                    <Nav.Item>
                        <Nav.Link eventKey="conversations">
                            Conversas
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link eventKey="contacts">
                            Contatos
                        </Nav.Link>
                    </Nav.Item>

                </Nav>

                <Tab.Content className="border-right overflow-auto flex-grow-1">

                    <Tab.Pane eventKey="conversations">
                        <Conversation />
                    </Tab.Pane>

                    <Tab.Pane eventKey="contacts">
                        <Contacts />
                    </Tab.Pane>

                </Tab.Content>

                <div className="p-2 border-top border-right small">
                    SEU ID: <strong className="text-muted">{id}</strong>
                </div>

                <Button className="rounded-0" onClick={()=>setOpenModal(true)}>
                    {activeConversation ? 'NOVA CONVERSA' : 'NOVO CONTATO'}
                </Button>

            </Tab.Container>

            <Modal show={openModal} onHide={closeModal}>
                {
                    activeConversation ?
                        <NewConversation closeModal={closeModal}/> :
                        <NewContact closeModal={closeModal}/>
                }
            </Modal>
        </div>
    )
}
