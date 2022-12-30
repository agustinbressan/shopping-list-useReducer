export const ITEMS_LIST_ACTION_TYPES = {
    ADD_ITEM: 'add-item',
    DELETE_ITEM: 'delete-item',
    TOGGLE_CROSSOUT_ITEM: 'toggle-crossout-item',
}

export function itemsListReducer(state, action) {
    const { type, payload } = action
    switch(type) {
        case ITEMS_LIST_ACTION_TYPES.ADD_ITEM:
            return addItem(state.items, payload.description)
        case ITEMS_LIST_ACTION_TYPES.DELETE_ITEM:
            return deleteItem(state.items, payload.id)
        case ITEMS_LIST_ACTION_TYPES.TOGGLE_CROSSOUT_ITEM:
            return toggleCrossoutItem(state.items, payload.id, payload.done)
        default:
            return state
    }
}

function addItem(items, description) {
    // Using the getTime method from the Date class to get a numeric value (milliseconds) to use it as an id
    return {
        items: [...items, {id: new Date().getTime(), description}]
    }
}

function deleteItem(items, id) {
    return {
        items: items.filter(i => i.id !== id)
    }
}

function toggleCrossoutItem(items, id, done) {
    return {
        items: items.map(i => {
            if (i.id === id) {
                return { ...i, done: !done }
            }
            return i
        })
    }
}