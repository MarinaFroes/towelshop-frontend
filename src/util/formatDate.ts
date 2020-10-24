const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-DE')
}

export default formatDate
