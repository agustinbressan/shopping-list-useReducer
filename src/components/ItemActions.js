import React from "react"
import { ITEMS_LIST_ACTION_TYPES } from './itemsListReducer'

export default function ItemActions({item, dispatch}) {
    const { id, description, done } = item

    function deleteItem(id) {
        dispatch({type: ITEMS_LIST_ACTION_TYPES.DELETE_ITEM, payload: {id}})
    }

    function toggleCrossoutItem(id, done) {
        dispatch({type: ITEMS_LIST_ACTION_TYPES.TOGGLE_CROSSOUT_ITEM, payload: {id, done}})
    }

    return (
        <>
            <button onClick={() => toggleCrossoutItem(id, done)} title={done ? `Restore item (${description})` : `Crossout item (${description})`}>{done ? '🔄' : '✅'}</button>
            <button onClick={() => deleteItem(id)} title={`Delete item (${description})`}>❌</button>
        </>
    )
}