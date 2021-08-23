import { handleActions } from 'redux-actions'
import Type from '../Actions/Type'
import {BEER_LIST_SIZE} from '../Components/Constant'

const initialState = {
    pageNumber: 0,
    pageSize: BEER_LIST_SIZE,
    seletedData: []
}

export default handleActions({
    [Type.CHANGE_PAGE]: (state, action) => ({
        ...state,
        pageNumber: action.payload.pageNumber,
        seletedData: action.payload.seletedData
    }),
    [Type.CHANGE_PAGE_SIZE]: (state, action) => ({
        ...state,
        pageNumber: action.payload.pageNumber,
        seletedData: action.payload.seletedData
    })
},initialState)