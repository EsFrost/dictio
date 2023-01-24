const Data = ({dict, queryString}) => {
  const editItem = (e) => {
    alert(e.target.parentElement.parentElement.id)
  }

  const deleteItem = (e) => {
    alert(e.target.parentElement.parentElement.id)
  }

  const newData = dict.filter(item => {
    if (queryString === "") {
        return item
    }
    else if ((item.word.toLocaleLowerCase().includes(queryString.toLocaleLowerCase())) || (item.translation.toLocaleLowerCase().includes(queryString.toLocaleLowerCase()))) {
        return item
    }
  }).map((item) => {
    return (
      <div key={item.id} id={item.id}>
        <span>{item.word}</span>
          <span> = </span>
          <span>{item.translation}</span>
          <span><button onClick={editItem}>Edit</button></span>
          <span><button onClick={deleteItem}>Delete</button></span>
      </div>
    )
  })

  return newData
}

export default Data