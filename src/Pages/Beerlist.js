import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import { saveColumns } from '../Actions/Action'
import { useDispatch, useSelector } from 'react-redux'

const Beerlist = (props) => {

    const [data, setData] = useState([])

    let columns = [
      {title: 'Beer', field: 'image_url', render: rowData => (
        <img style = {{ height: 36, width: 25}} src = {rowData.image_url} />
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
    

    const handleColumnDrag = (sourceIndex, destinationIndex) => {
      const sourceColumn = columns[sourceIndex]
      const destinationColumn = columns[destinationIndex]

      columns[sourceIndex] = destinationColumn
      columns[destinationIndex] = sourceColumn
    }

    const newColumn = useSelector(state => state.Reducer.column)


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

    useEffect(() => {
      getData()
    },[])

    return (
        <div>
          <div>
            <input type = 'number' onChange = {changeFirstInput}/> - <input type = 'number' onChange = {changeLastInput}/>
            <button onClick = {() => {handleFilter(); changeToFiltered(); console.log(filteredData)}}>설정</button>
          </div>
          <MaterialTable
            columns = {newColumn}
            data = {filter.min.length ? filteredData : data}
            title = 'demo title'
            onColumnDragged = {handleColumnDrag}
            />
          <button onClick = {() => {dispatch(saveColumns(columns)); resetFilter(); props.history.push('/home')}}>홈으로</button>
        </div>
    )
}

export default Beerlist