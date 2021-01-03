import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../Contexts/ConversationsProvider'

export default function Conversation() {
    const { conversations, SelectConversationIndex } = useConversations()

    return (
        <ListGroup variant="flush">
            {conversations.map((conv, index) => (
                <ListGroup.Item
                    key={index}
                    onClick={() => SelectConversationIndex(index)}
                    action
                    active={conv.selected}
                >
                    {conv.recipients.map(rec => rec.name)}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
