import React from "react"
import Item from "./Item"

export default function ItemsList({items, dispatch}) {
    const doneItemsCount = items.filter(i=>i.done).length

    return (
        <div>
            <h2>Items ({doneItemsCount}/{items.length}) {(items.length && doneItemsCount === items.length) ? '✅ All done!' : ''}</h2>
            {
                items.length ?
                items.map((item, index) => <Item key={item.id} item={item} itemNumber={(index+1)} dispatch={dispatch} />)
                : 'The item list is empty.'
            }
        </div>
    )
}