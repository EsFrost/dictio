const Data = ({dict, queryString}) => {
  const newData = dict.filter(item => {
    if (queryString === "") {
        return item
    }
    else if ((item.word.toLocaleLowerCase().includes(queryString.toLocaleLowerCase())) || (item.translate.toLocaleLowerCase().includes(queryString.toLocaleLowerCase()))) {
      return item
    }
  }).map((item) => {
    return (
      <div key={item.id}>
        <span>{item.word}</span>
        <span> = </span>
        <span>{item.translate}</span>
      </div>
    )
  })

  return newData
}

export default Data