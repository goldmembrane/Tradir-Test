import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import { saveColumns } from '../Actions/Action'
import { useDispatch, useSelector } from 'react-redux'

const Beerlist = (props) => {

    const [data, setData] = useState([])

    let columns = [
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

    useEffect(() => {
      getData()
    },[])

    return (
        <div>
          <MaterialTable
            columns = {newColumn}
            data = {data}
            title = 'demo title'
            onColumnDragged = {handleColumnDrag}
            />
          <button onClick = {() => {dispatch(saveColumns(columns)); props.history.push('/home')}}>홈으로</button>
        </div>
    )
}

export default Beerlist