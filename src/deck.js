function shuffle(array) {
  const new_array = array.slice(0)
  for (let i =0; i< new_array.length - 1; i++) {
    var index = Math.floor(Math.random() * (i + 1))
    var temp = new_array[i]
    new_array[i] = new_array[index]
    new_array[index] = temp
  }
  return new_array
}
function choiceSet(number){
    const set1 = ['cake1', 'cake2', 'cake3', 'cake4',
        'cake5', 'cake6']
    const cards = []
    for (let i = 0; i<number; i++){
      cards.push(set1[i])
    }
    return cards
}
export default function initializeDeck(number) {
    let id = 0
    const cards = choiceSet(number).reduce((acc, type) => {
        acc.push(...[{
            id: id++,
            type
    }, {
      id: id++,
      type
    }])
    return acc
  }, [])

  return shuffle(cards)
}