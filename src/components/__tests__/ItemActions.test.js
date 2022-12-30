import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ItemActions from '../ItemActions'
import { ITEMS_LIST_ACTION_TYPES } from '../itemsListReducer';

// Given a request to see an item in the list
// When the item is displayed
// Then the item actions should be crossout and delete
test('item action buttons are correct', () => {
    // ARRANGE
    const mockProps = {
        item: {
            id: 123,
            description: 'Sugar',
            done: false
        },
    }
    render(<ItemActions {...mockProps} />)

    // ACT (No user action)

    // ASSERT
    const listItemCrossoutButton = screen.getByTitle(/Crossout item \(Sugar\)/i)
    expect(listItemCrossoutButton).toBeInTheDocument()

    const listItemDeleteButton = screen.getByTitle(/Delete item \(Sugar\)/i)
    expect(listItemDeleteButton).toBeInTheDocument()
});

// Given a request to see a crossout item in the list
// When the item is displayed
// Then the item actions should be restore and delete
test('crossout item action buttons are correct', () => {
    // ARRANGE
    const mockProps = {
        item: {
            id: 123,
            description: 'Milk',
            done: true
        },
    }
    render(<ItemActions {...mockProps} />)

    // ACT (No user action)

    // ASSERT
    const listItemRestoreButton = screen.getByTitle(/Restore item \(Milk\)/i)
    expect(listItemRestoreButton).toBeInTheDocument()

    const listItemDeleteButton = screen.getByTitle(/Delete item \(Milk\)/i)
    expect(listItemDeleteButton).toBeInTheDocument()
});

// Given a request to delete an item
// When the delete button is clicked
// Then should call the reducer delete item action type
test('delete item action', () => {
    // ARRANGE
    const mockDispatchFn = jest.fn()
    const mockProps = {
        item: {
            id: 123,
            description: 'Bananas',
            done: false
        },
        dispatch: mockDispatchFn,
    }
    render(<ItemActions {...mockProps} />)

    // ACT
    const deleteItemButton = screen.getByTitle(/Delete item \(Bananas\)/i)
    userEvent.click(deleteItemButton)

    // ASSERT
    expect(mockDispatchFn).toHaveBeenCalledWith({type: ITEMS_LIST_ACTION_TYPES.DELETE_ITEM, payload: {id: 123}})
});

// Given a request to crossout an item
// When the crossout button is clicked
// Then should call the reducer action type to toggle the item status to crossout
test('crossout item action', () => {
    // ARRANGE
    const mockDispatchFn = jest.fn()
    const mockProps = {
        item: {
            id: 123,
            description: 'Apples',
            done: false
        },
        dispatch: mockDispatchFn,
    }
    render(<ItemActions {...mockProps} />)

    // ACT
    const crossoutItemButton = screen.getByTitle(/Crossout item \(Apples\)/i)
    userEvent.click(crossoutItemButton)

    // ASSERT
    expect(mockDispatchFn).toHaveBeenCalledWith({type: ITEMS_LIST_ACTION_TYPES.TOGGLE_CROSSOUT_ITEM, payload: {id: 123, done: false}})
});

// Given a request to restore a crossout item
// When the restore button is clicked
// Then should call the reducer action type to toggle the item status to restored
test('restore item action', () => {
    // ARRANGE
    const mockDispatchFn = jest.fn()
    const mockProps = {
        item: {
            id: 123,
            description: 'Cheese',
            done: true
        },
        dispatch: mockDispatchFn,
    }
    render(<ItemActions {...mockProps} />)

    // ACT
    const restoreItemButton = screen.getByTitle(/Restore item \(Cheese\)/i)
    userEvent.click(restoreItemButton)

    // ASSERT
    expect(mockDispatchFn).toHaveBeenCalledWith({type: ITEMS_LIST_ACTION_TYPES.TOGGLE_CROSSOUT_ITEM, payload: {id: 123, done: true}})
});