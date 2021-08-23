import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'

const Beerlist = () => {

    const [data, setData] = useState([])

    const getData = async() => {
      await axios.get('https://api.punkapi.com/v2/beers')
              .then(response => {
                setData(response.data)
              })
    }

    const columns = [
      { title: 'Beer', field: 'image_url',
          render: rowData => (
              <img style = {{ height: 45, width: 25 }} src = {rowData.image_url} alt = ''/>
          )
      },
      { title: 'BeerName', field: 'name'},
      { title: 'Id', field: 'id' },
      { title: 'Abv', field: 'abv'},
      { title: 'Tagline', field: 'tagline'},
    ]

    useEffect(() => {
      getData()
    },[])

    return (
        <div>
          <MaterialTable
            columns = {columns}
            data = {data}
            title = 'demo title'
            />
        </div>
    )
}

export default Beerlist