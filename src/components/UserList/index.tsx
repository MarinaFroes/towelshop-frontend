import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Table, Icon, Message } from 'semantic-ui-react'

import { AppState, UserListProps } from '../../types'
import UserRow from '../UserRow'
import {
  banUser,
  listUsers,
  unbanUser,
  userBanUnbanReset,
} from '../../redux/actions/user'

const UserList = ({ loggedUserId }: UserListProps) => {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const { users } = useSelector((state: AppState) => state.userList)

  const { error, success } = useSelector(
    (state: AppState) => state.userBanUnban
  )

  useEffect(() => {
    dispatch(listUsers())

    if (success) {
      dispatch(userBanUnbanReset())
    }
  }, [dispatch, success])

  const handleChange = (userId: string) => {
    const user = users.find((user) => user._id === userId)

    if (user) {
      user.isBanned && dispatch(unbanUser(user._id))
      !user.isBanned && dispatch(banUser(user._id))
    } else {
      setMessage('Could not find user')
    }
  }

  return (
    <div style={{ margin: '2em 0' }}>
      <Header as="h2">
        <Icon name="settings" />
        Users information
      </Header>
      {message && <Message warning content={message} header="Oops!" />}
      {error && <Message error content={error} header="Oops!" />}
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joined</Table.HeaderCell>
            <Table.HeaderCell>Updated</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users ? (
            users
              .filter((user) => user._id !== loggedUserId)
              .map((user) => (
                <UserRow
                  key={user._id}
                  user={user}
                  handleChange={handleChange}
                />
              ))
          ) : (
            <Message content="No users" color="teal" />
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

export default UserList
