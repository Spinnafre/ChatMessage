import React from 'react'
import SideBar from './SideBar'
import ConversationArea from './ConversationArea'
import {useConversations} from '../Contexts/ConversationsProvider'

export default function Dashboard({id}) {
    const {SelectedConversation}=useConversations()

    return (
        <div className="d-flex" style={{height:'100vh'}}>
            <SideBar id={id}/>
            {SelectedConversation && <ConversationArea/>}
        </div>
    )
}
