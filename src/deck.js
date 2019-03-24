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
function choiceFace(value){
    const set1 = ['cake1', 'cake2', 'cake3', 'cake4',
        'cake5', 'cake6']
    const set2 = ['cat1', 'cat2', 'cat3', 'cat4',
        'cat5', 'cat6']
    if (value == 1){
        return set1
    } else
        return set2
}
function choiceSet(number, value){
    const set = choiceFace(value)
    const cards = []
    for (let i = 0; i<number; i++){
      cards.push(set[i])
    }
    return cards
}
export default function initializeDeck(number, value) {
    let id = 0
    const cards = choiceSet(number, value).reduce((acc, type) => {
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