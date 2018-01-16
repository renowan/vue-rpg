export default {
  '1': {
    name: 'やくそう',
    effective: (hp, hpMax) => (hp + 20) > hpMax ? hpMax : hp + 20
    // validImg: '27-7',
    // inValidImg: '27-8',
  }
}
