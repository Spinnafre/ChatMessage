import { useState, useRef, useEffect, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../Contexts/ConversationsProvider'

export default function ConversationArea() {

    const [text, setText] = useState('')

    const { sendMessage, SelectedConversation } = useConversations()

    const lastMessageRef = useRef()
    
    const setRef=useCallback(node=>{
        if(node){
            node.scrollIntoView({smooth:true})
        }
    },[])

    function handleSubmit(e) {
        e.preventDefault()

        sendMessage(SelectedConversation.recipients.map(r => r.id), text)
        setText('')
    }


    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div
                    className="d-flex 
                    flex-column align-itens-start 
                    justify-content-end px-3">

                    {SelectedConversation.messages.map((message, i) => {
                        // True se o map chegar na última mensagem
                        const lastMessage=SelectedConversation.messages.length - 1 === i
                        return (
                            <div
                                className="my-1 d-flex flex-column"
                                key={i}
                                ref={lastMessage ? setRef : null}
                                className={message.fromMe ? 'align-self-end' : ''}
                            >
                                <div
                                    className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}
                                >
                                    {message.text}
                                </div>

                                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>{message.fromMe ? 'Você' : message.sendName}</div>

                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={{ height: '75px', resize: 'none' }}
                            title="Escreva uma mensagem"
                        />
                        <InputGroup.Append>
                            <Button type="submit">Enviar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
