import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import { saveColumns } from '../Actions/Action'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'


// styled-components를 이용하여 스타일 꾸미는 코드 영역

    const FilteringBox = styled.div`
                         width: 400px;
                         height: 40px;
                         margin-bottom: 10px;
                         line-height: 40px;
                        `

    const FilteringInput = styled.input`
                            width: 150px;
                            `
    
    const FilteringButton = styled.button`
                              border: none;
                              width: 50px;
                              height: 30px;
                              line-height: 30px;
                              text-align: center;
                              font-size: 20px;
                              margin-left: 10px;
                              cursor: pointer;
                              background-color: #a18cd1;
                              `

    const GoToHomeWrap = styled.div`
                          display: flex;
                          `

    const GotoHomeButton = styled.button`
                            border: none;
                            margin: 30px auto;
                            width: 100px;
                            height: 50px;
                            text-align: center;
                            background-color: #8fd3f4;
                            border-radius: 25px;
                            cursor: pointer;
                            `

const Beerlist = (props) => {


    // 데이터를 가져오고 material-table에 뿌리는 코드 영역

    const [data, setData] = useState([])

    let columns = [
      {title: 'Beer', field: 'image_url', render: rowData => (
        <img style = {{ height: 36, width: 25}} src = {rowData.image_url} alt = ''/>
      )},
      {title: 'Id', field: 'id'},
      {title: 'BeerName', field: 'name'},
      {title: 'ABV', field: 'abv'},
      {title: 'TagLine', field: 'tagline'}
    ]

    const dispatch = useDispatch()

    const getData = async() => {
      await axios.get('https://api.punkapi.com/v2/beers')
              .then(response => {
                setData(response.data)
              })
    }
    

    // 드래그를 통해 column이 변화하고, 그 변화한 상태를 redux에 저장하는 코드 영역

    const handleColumnDrag = (sourceIndex, destinationIndex) => {
      const sourceColumn = columns[sourceIndex]
      const destinationColumn = columns[destinationIndex]

      columns[sourceIndex] = destinationColumn
      columns[destinationIndex] = sourceColumn
    }

    const newColumn = useSelector(state => state.Reducer.column)

    
    // 처음 값과 나중 값을 차례로 받은 다음에 그 사이값에 해당하는 데이터를 필터링하는 코드 영역

    const [firstInput, setFirstInput] = useState(0)
    const [lastInput, setLastInput] = useState(0)
    const [filter, setFilter] = useState({
      min: 0,
      max: 0,
    })

    const changeFirstInput = (e) => {
      setFirstInput(e.target.value)
    }

    const changeLastInput = (e) => {
      setLastInput(e.target.value)
    }

    const handleFilter = () => {
        setFilter({
          min: firstInput,
          max: lastInput
        })
    }

    const [filteredData, setFilteredData] = useState([]);

    const filteredBeer = data.filter((beer) => firstInput <= beer.abv && lastInput >= beer.abv)

    const changeToFiltered = () => {
      setFilteredData(filteredData.concat(...filteredBeer))
    }

    const resetFilter = () => {
      setFilter({
        min: 0,
        max: 0,
      })
    }


    // 처음 렌더링할때 한번만 실행되도록 useEffect를 구성

    useEffect(() => {
      getData()
    },[])

    return (
        <div>
          <FilteringBox>
            <FilteringInput type = 'number' onChange = {changeFirstInput}/> - <FilteringInput type = 'number' onChange = {changeLastInput}/>
            <FilteringButton onClick = {() => {handleFilter(); changeToFiltered(); console.log(filteredData)}}>설정</FilteringButton>
          </FilteringBox>
          <MaterialTable
            columns = {newColumn}
            data = {filter.min.length ? filteredData : data}
            title = '맥주 리스트'
            onColumnDragged = {handleColumnDrag}
            />
          <GoToHomeWrap>
            <GotoHomeButton onClick = {() => {dispatch(saveColumns(columns)); resetFilter(); props.history.push('/home')}}>홈으로</GotoHomeButton>
          </GoToHomeWrap>
        </div>
    )
}

export default Beerlist