import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  CheckboxProps,
  DropdownProps,
  Form,
  Segment,
} from 'semantic-ui-react'

import categoriesOptions from '../../util/categoriesOptions'
import variantOptions from '../../util/variantOptions'

const Search = () => {
  const [name, setName] = useState('')
  const [size, setSize] = useState<string | number | undefined>('')
  const [category, setCategory] = useState('')
  const [variant, setVariant] = useState('')
  const history = useHistory()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSizeChange = (
    e: React.FormEvent<HTMLInputElement>,
    { value }: CheckboxProps
  ) => {
    setSize(value)
  }

  const handleVariantChange = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    const value = data.value as string
    setVariant(value)
  }

  const handleCategoryChange = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    const value = data.value as string
    setCategory(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let path = '?'

    if (name) {
      path[path.length - 1] === '?'
        ? (path += `name=${name}`)
        : (path += `&name=${name}`)
    }
    if (size) {
      path[path.length - 1] === '?'
        ? (path += `size=${size}`)
        : (path += `&size=${size}`)
    }
    if (variant && variant !== 'select') {
      path[path.length - 1] === '?'
        ? (path += `variant=${variant}`)
        : (path += `&variant=${variant}`)
    }
    if (category && category !== 'select') {
      path[path.length - 1] === '?'
        ? (path += `category=${category}`)
        : (path += `&category=${category}`)
    }

    if (path.length > 1) {
      history.push(path)
    }
  }

  const handleClearForm = () => {
    setName('')
    setSize('')
    setVariant('')
    setCategory('')
    history.push('/')
  }

  return (
    <Segment style={{ marginBottom: '2em' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Search by name"
            icon="search"
            placeholder="Name"
            value={name}
            onChange={handleSearchChange}
          />
          <Form.Select
            fluid
            label="Categories"
            options={categoriesOptions}
            placeholder="Category"
            value={category}
            onChange={handleCategoryChange}
          />
          <Form.Select
            fluid
            label="Variant"
            options={variantOptions}
            placeholder="Variant"
            value={variant}
            onChange={handleVariantChange}
          />
        </Form.Group>
        <Form.Group inline>
          <label>Size</label>
          <Form.Radio
            label="Small"
            value="small"
            checked={size === 'small'}
            onChange={handleSizeChange}
          />
          <Form.Radio
            label="Medium"
            value="medium"
            checked={size === 'medium'}
            onChange={handleSizeChange}
          />
          <Form.Radio
            label="Large"
            value="large"
            checked={size === 'large'}
            onChange={handleSizeChange}
          />
          <Form.Radio
            label="Various"
            value="various"
            checked={size === 'various'}
            onChange={handleSizeChange}
          />
        </Form.Group>
        <Button type="submit" color="teal">
          Submit
        </Button>
        <Button onClick={handleClearForm}>Clear search</Button>
      </Form>
    </Segment>
  )
}

export default Search
