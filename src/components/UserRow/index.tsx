import React from 'react'
import { Checkbox, Table } from 'semantic-ui-react'

import { UserRowProps } from '../../types'
import formatDate from '../../util/formatDate'

const UserRow = ({ user, handleChange }: UserRowProps) => {
  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox
          checked={user.isBanned}
          toggle
          onChange={() => handleChange(user._id)}
        />
      </Table.Cell>
      <Table.Cell>
        {user.firstName} {user.lastName}
      </Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.createdAt && formatDate(user.createdAt)}</Table.Cell>
      <Table.Cell>{user.updatedAt && formatDate(user.updatedAt)}</Table.Cell>
      <Table.Cell>{user.role}</Table.Cell>
      <Table.Cell style={{ color: `${user.isBanned ? 'red' : 'blue'}` }}>
        {user.isBanned ? 'banned' : 'not banned'}
      </Table.Cell>
    </Table.Row>
  )
}

export default UserRow
