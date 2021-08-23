import { BEER_LIST_COLUMN } from "../Actions/Type"

const initialState = {
    column: [
        {title: 'Id', field: 'id'},
        {title: 'BeerName', field: 'name'},
        {title: 'ABV', field: 'abv'},
        {title: 'TagLine', field: 'tagline'}
      ]
}

export default function Reducer( state = initialState, action ) {
    switch(action.type) {
        case BEER_LIST_COLUMN:
            return {
                column: state.column.splice(0, action.payload.column),
                ...state,
            }
        default:
            return state
    }
}