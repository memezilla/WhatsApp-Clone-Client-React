import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../Navbar'
import UsersList from '../UsersList'
import { useAddChat } from '../../graphql-hooks/chats-hooks'
import NewChatNavbar from './NewChatNavbar'
import NewGroupButton from './NewGroupButton'

const name = 'NewChatScreen'

const Style = styled.div `
  .UsersList {
    height: calc(100% - 56px);
  }

  .${name}-users-list {
    height: calc(100% - 56px);
    overflow-y: overlay;
  }
`

export default ({ history }: RouteComponentProps) => {
  const addChat = useAddChat()

  const onUserPick = (user) => {
    addChat({
      variables: {
        recipientId: user.id
      }
    }).then(() => {
      history.push('/chats')
    })
  }

  return (
    <Style className={`${name} Screen`}>
      <Navbar>
        <NewChatNavbar history={history} />
      </Navbar>
      <div className={`${name}-users-list`}>
        <NewGroupButton history={history} />
        <UsersList onUserPick={onUserPick} />
      </div>
    </Style>
  )
}
