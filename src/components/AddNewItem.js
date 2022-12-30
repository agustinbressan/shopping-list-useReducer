import React, { useState } from "react"
import { ITEMS_LIST_ACTION_TYPES } from "./itemsListReducer"

export default function AddNewItem({dispatch}) {
    const [description, setDesciption] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (description.length === 0) return

        dispatch({type: ITEMS_LIST_ACTION_TYPES.ADD_ITEM, payload: { description }})
        setDesciption('')
    }

    return (
        <div>
            <h2>Add a new item</h2>
            <form onSubmit={handleSubmit}>
                Description <input type="text" value={description} onChange={e => setDesciption(e.target.value)}  title='Item description' />
                <button disabled={!description.length} onClick={handleSubmit} title='Add item'>Add item</button>
            </form>
        </div>
    )
}