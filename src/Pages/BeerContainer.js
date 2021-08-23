import React from 'react'
import { changePage, changePageSize } from '../Actions/Action'
import { connect } from 'react-redux'
import BeerList from '../Components/BeerList'

const BeerContainer = ({ pageNumber, pageSize, selectedData, changePage, changePageSize }) => {

    const columns = [
        {   title: 'Beer', 
            field: 'image_url', 
            render: rowData => (
                <img style = {{ height: 40, width: 25 }} src = {rowData.image_url} />
            )},
        { title: 'Name', field: 'name' },
        { title: 'ABV', field: 'abv' },
        { title: 'TagLine', field: 'tagline' }
    ]

    const data = fetch('https://api.punkapi.com/v2/beers')
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                })

    const handleData = {
        get : (pageNumber, pageSize) => {
            let prevData = handleData.createPrevData(pageSize * pageNumber)
            let nextData = handleData.createNextData(pageSize)

            if ( handleData.isFirstPage(pageNumber) ) {
                let realData = data.slice(pageNumber * pageSize, pageSize)
                return realData.concat(nextData)
            } else if ( handleData.isLastPage(pageNumber) ) {
                let realData = data.slice(pageNumber * pageSize, data.length)
                return prevData.concat(realData)
            } else {
                let realData = data.slice(pageNumber * pageSize, (pageNumber * pageSize) * pageSize)
                return prevData.concat(realData).concat(nextData)
            }
        },

        createPrevData : size => {
            let beerData = Array.apply(null, new Array(size)).map(Object.prototype.valueOf, new Object())
            return beerData.map((currentValue, index) => handleData.setData(index))
        },

        createNextData : size => {
            let beerData = Array.apply(null, new Array(size)).map(Object.prototype.valueOf, new Object())
            return beerData.map((currentValue, index) => handleData.setData(index))
        },

        setData : index => {
            let beerData = new Object()
            beerData.tableData = { index: index }
            return beerData
        },

        isFirstPage : pageNumber => {
            return pageNumber === 0
        },

        isLastPage : pageNumber => {
            return data.length <= pageNumber * pageSize + pageSize
        }
    }

    const handleChangePage = (pageNumber) => {
        changePage(pageNumber, handleData.get(pageNumber, pageSize))
    }

    const handleChangeRowPerPage = (pageSize) => {
        changePageSize(pageSize, handleData.get(pageNumber, pageSize))
    }


    return (
        <div>
            <BeerList 
                selectedData = {selectedData}
                handleChangePage = {handleChangePage}
                handleChangeRowPerPage = {handleChangeRowPerPage}
                columns = {columns}/>
            <button onClick = {() => console.log(data)}>확인</button>
        </div>
    )
}

const mapStateToProps = state => ({
    pageNumber : state.Reducer.pageNumber,
    pageSize : state.Reducer.pageSize,
    selectedData : state.Reducer.selectedData
})

const mapDispatchToProps = dispatch => ({
    changePage : (pageNumber, selectedData) => dispatch(changePage(pageNumber, selectedData)),
    changePageSize : (pageSize, selectedData) => dispatch(changePageSize(pageSize, selectedData))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BeerContainer)