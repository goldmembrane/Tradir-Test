import React from 'react'
import styled from 'styled-components'

// home의 스타일을 관장하는 코드 영역

const HomeWrap = styled.div`
                  display: flex;
                  `

const GoToBeerlistButton = styled.button`
                            border: none;
                            border-radius: 5px;
                            width: 300px;
                            height: 50px;
                            margin: 300px auto;
                            text-align: center;
                            line-height: 50px;
                            background-color: #f6d365;
                            cursor: pointer;
                            `

const Home = (props) => {
  return (
    <HomeWrap>
      <GoToBeerlistButton onClick = {() => props.history.push('/beerlist')}>맥주리스트로 이동</GoToBeerlistButton>
    </HomeWrap>
  )
}

export default Home
