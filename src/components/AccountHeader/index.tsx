import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header, Icon, Segment, Label, Image, Divider } from 'semantic-ui-react'

import { AccountHeaderProps } from '../../types'

const AccountHeader = ({ user }: AccountHeaderProps) => {
  const [image, setImage] = useState('')
  const { _id, role, email, firstName, lastName, userName } = user

  useEffect(() => {
    if (user && user.image) {
      setImage(user.image)
    }
  }, [user])

  return (
    <Segment secondary inverted color={role === 'admin' ? 'grey' : 'teal'}>
      {role === 'admin' && (
        <Label
          color="red"
          size="large"
          ribbon
          icon="privacy"
          style={{ textTransform: 'capitalize' }}
          content={role}
        />
      )}

      <Header inverted vertical="true" textAlign="center" as="h1" icon>
        {image ? (
          <Image src={image} size="massive" circular />
        ) : (
          <Image
            src={`https://avatars.dicebear.com/api/initials/${firstName} ${lastName}.svg`}
            size="massive"
            circular
          />
        )}
        <Divider hidden />
        {firstName} {lastName}
        <Header.Subheader>{userName}</Header.Subheader>
        <Header.Subheader>{email}</Header.Subheader>
      </Header>
      <Link to={`/account/${_id}/edit`}>
        <Icon name="edit" color="black" />
      </Link>
    </Segment>
  )
}

export default AccountHeader
