import React from "react"
import ItemActions from "./ItemActions"

export default function Item({item, itemNumber, dispatch}) {
    const { description, done } = item

    const itemCrossoutStyles = { 
        textDecoration: (done ? 'line-through' : 'none'),
        color: (done ? '#AAA' : '#000')
    }

    return (
        <div>
            <span style={itemCrossoutStyles} title={description}>{itemNumber}) {description}</span> - <ItemActions item={item} dispatch={dispatch} />
        </div>
    )
}