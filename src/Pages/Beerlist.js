import React from 'react'
import MaterialTable from 'material-table'

const Beerlist = () => {

    return (
        <div>
            <MaterialTable
            columns = {[
                { title: 'Beer', field: 'image_url',
                    render: rowData => (
                        <img style = {{ height: 45, width: 25 }} src = {rowData.image_url} alt = ''/>
                    )
                },
                { title: 'BeerName', field: 'name'},
                { title: 'Id', field: 'id' },
                { title: 'Abv', field: 'abv'},
                { title: 'Tagline', field: 'tagline'},
            ]}
            data = {query =>
            new Promise((resolve, reject) => {
                let url = 'https://api.punkapi.com/v2/beers'
                fetch(url)
                .then((response) => response.json())
                .then((result) => {
                    resolve({
                        data: result
                    })
                })
            })}
            title = 'demo title'
            localization={{
                pagination : {
                    labelDisplayedRows: '1-5 of 25',
                    labelRowsPerPage: '{5, 10, 25, 100}'
                }
            }}
            options = {{
                pageSizeOptions : [5, 10, 20]
            }}
            />
        </div>
    )
}

export default Beerlist