import React, { useContext, useEffect, useState, useCallback } from 'react'
import useLocalStorage from '../Hooks/localStorage'

import { useContacts } from '../Contexts/ContactsProvider'
import { useSocket} from '../Contexts/SocketProvider'

const ConversationContext = React.createContext()

// USO ESSA FUNÇÃO PARA EXTRAIR OS DADOS DO CONTEXTO
export function useConversations() {
    return useContext(ConversationContext)
}

export function ConversationsProvider({ id, children }) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [SelectedConversationIndex, setSelectedConversationIndex] = useState(0)

    const { contacts } = useContacts()
    const socket =useSocket()

    function createConversation(recipients) {
        setConversations(prevConversations => {
            // Pego a minha antiga lista e adiciono uma nova conversa
            return [...prevConversations, { recipients, messages: [] }]
        })
    }

    const formatedConversation = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            // Pego os contatos que conversei para listar eles
            const contact = contacts.find(contact => contact.id === recipient)
            // Se tiver encontrado a pessoa com o mesmo id que está no meu contato
            // irá retornar o nome senão irá retornar o recipient
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })
        // console.log('MESSAGES= ',conversation.messages)
        
       
        const messages =conversation.messages.map(message => {
            const contact = contacts.find(contact => {
              return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return { ...message, senderName: name, fromMe }
          })
        // const messages =[]
       


        // Por padrão o selected será 0 então irá ser true para o primeiro item
        const selected = SelectedConversationIndex === index

        return { ...conversation, recipients,messages, selected }
    })

    const addMessageToConversation=useCallback(({ recipients, text, sender })=> {
        setConversations(prevConversations => {
            let madeChange = false
            const newMessage = { sender, text }
            const newConversation = prevConversations.map(conversation => {
                // Comparo se o meu destinatário do prevConversation é igual ao destinatário da conversa
                if (arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true
                    // Adiciono a nova mensagem
                    return { ...conversation, messages: [...conversation.messages,newMessage] }

                }
                return conversation
            })

            if (madeChange) {
                return newConversation
            } else {
                return [
                    ...prevConversations,
                    { recipients, messages: [newMessage] }
                ]
            }

        })
    },[setConversations])


    useEffect(()=>{
        if(socket==null) return
        socket.on('receive-message',addMessageToConversation)
        return ()=>socket.off('receive-message')
    },[socket,addMessageToConversation])

    function sendMessage(recipients, text ) {
        socket.emit('send-message',{recipients,text})
        addMessageToConversation({ recipients, text, sender: id })
    }





    return (
        // ESTOU PASSANDO A TODOS OS MEUS FILHOS
        <ConversationContext.Provider value={{
            conversations: formatedConversation,
            SelectConversationIndex: setSelectedConversationIndex,
            SelectedConversation: formatedConversation[SelectedConversationIndex],
            sendMessage,
            createConversation
        }}>
            {children}
        </ConversationContext.Provider>
    )
}
function arrayEquality(a, b) {
    if (a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((el, i) => el === b[i])
}
