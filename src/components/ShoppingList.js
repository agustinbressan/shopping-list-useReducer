import React, { useReducer } from "react"
import AddNewItem from "./AddNewItem"
import ItemsList from "./ItemsList"
import { itemsListReducer } from './itemsListReducer'

export default function ShoppingList() {
    const [{items}, dispatch] = useReducer(itemsListReducer, {items: []})

    return (
        <div>
            <AddNewItem dispatch={dispatch} />
            <ItemsList items={items} dispatch={dispatch} />
        </div>
    )
}