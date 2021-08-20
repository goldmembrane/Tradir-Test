import React from 'react'
import MaterialTable from 'material-table'

const Beerlist = () => {
    return (
        <div>
            <MaterialTable
            columns = {[
                {title: 'Adi', field: 'name'}
            ]}
            data = {[{ name: 'memet'}]}
            title = 'demo title'
            />
        </div>
    )
}

export default Beerlist