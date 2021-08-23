import { BEER_LIST_COLUMN } from "./Type"
import { createAction } from 'redux-actions'

export const saveColumns = createAction(BEER_LIST_COLUMN, column => column)