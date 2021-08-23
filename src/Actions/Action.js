import { createAction } from 'redux-actions'
import Type from './Type'

export const changePage = createAction(
    Type.CHANGE_PAGE,
    (pageNumber, selectedData) => ({
        pageNumber, selectedData
    })
)

export const changePageSize = createAction(
    Type.CHANGE_PAGE_SIZE,
    (pageSize, selectedData) => ({
        pageSize, selectedData
    })
)