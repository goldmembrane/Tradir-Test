import React from 'react'

const Home = (props) => {
  return (
    <div>
      Home
      <button onClick = {() => props.history.push('/beerlist')}>맥주리스트로 이동</button>
    </div>
  )
}

export default Home
