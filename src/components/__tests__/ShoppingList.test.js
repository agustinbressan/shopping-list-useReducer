import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ShoppingList from '../ShoppingList'

// Given no initial user interaction
// When the shopping list init
// Then the items list should be empty
test('initial state, empty list', () => {
    // ARRANGE
    render(<ShoppingList />)

    // ACT (No user action)

    // ASSERT
    const emptyItemListMessage = screen.getByText(/The item list is empty./i)
    expect(emptyItemListMessage).toBeInTheDocument()
});

// Given no initial user interaction
// When the shopping list init
// Then the Items list title counters values should show (0/0)
test('initial state, zero counter values', () => {
    // ARRANGE
    render(<ShoppingList />)

    // ACT (No user action)
    
    // ASSERT
    const itemsListTitle = screen.getByText(/Items \(0\/0\)/i)
    expect(itemsListTitle).toBeInTheDocument()
});

// Given the description input field empty
// When the add item button is clicked
// Then new item should NOT be added and the button should be disabled
test('add new item, click add with empty description', () => {
    // ARRANGE
    render(<ShoppingList />)

    // ACT
    const addItemButton = screen.getByTitle(/add item/i)
    userEvent.click(addItemButton)

    // ASSERT
    const emptyItemListMessage = screen.getByText(/The item list is empty./i)
    expect(emptyItemListMessage).toBeInTheDocument()
    expect(addItemButton).toBeDisabled()
});

// Given the description input field empty
// When the add item form is submitted
// Then new item should NOT be added and the button should be disabled
test('add new item, submit form with empty description', () => {
    // ARRANGE
    render(<ShoppingList />)

    // ACT
    const itemDescriptionInput = screen.getByTitle(/item description/i)
    fireEvent.submit(itemDescriptionInput)
    // NOTE: The form can also be submitted with an Enter keyDown event -> fireEvent.keyDown(itemDescriptionInput, {key: 'Enter', code: 'Enter', charCode: 13})

    // ASSERT
    const emptyItemListMessage = screen.getByText(/The item list is empty./i)
    expect(emptyItemListMessage).toBeInTheDocument()

    const addItemButton = screen.getByTitle(/add item/i)
    expect(addItemButton).toBeDisabled()
});

// Given a request to Add a new item
// When the description input field is filled
// Then the Add item button should be enabled
test('add new item description text, button is enabled', () => {
    // ARRANGE
    render(<ShoppingList />)

    // ACT
    const itemDescriptionInput = screen.getByTitle(/item description/i)
    userEvent.type(itemDescriptionInput, 'Bananas')

    // ASSERT
    const addItemButton = screen.getByTitle(/add item/i)
    expect(addItemButton).toBeEnabled()
});

// Given a request to Add a new item and the description input field is filled
// When the add item button is clicked
// Then new item should be added to the list and the Items list title counter is updated
test('add new item by clicking the button', () => {
    // ARRANGE
    render(<ShoppingList />)

    // ACT
    const itemDescriptionInput = screen.getByTitle(/item description/i)
    userEvent.type(itemDescriptionInput, 'Bread')

    const addItemButton = screen.getByTitle(/add item/i)
    userEvent.click(addItemButton)

    // ASSERT
    const newItem = screen.getByText(/Bread/i)
    expect(newItem).toBeInTheDocument()
    const itemsListTitleUpdated = screen.getByText(/Items \(0\/1\)/i)
    expect(itemsListTitleUpdated).toBeInTheDocument()
});

// Given a request to Add a new item and the description input field is filled
// When the add item form is submitted
// Then new item should be added to the list and the Items list title counter is updated
test('add new item by submitting the form', () => {
    // ARRANGE
    render(<ShoppingList />)

    // ACT
    const itemDescriptionInput = screen.getByTitle(/item description/i)
    userEvent.type(itemDescriptionInput, 'Coffee')

    fireEvent.submit(itemDescriptionInput)

    // ASSERT
    const newItem = screen.getByText(/Coffee/i)
    expect(newItem).toBeInTheDocument()
    const itemsListTitleUpdated = screen.getByText(/Items \(0\/1\)/i)
    expect(itemsListTitleUpdated).toBeInTheDocument()
});

// Given a request to crossout an item
// When the crossout button is clicked
// Then the item description text should be crossout and greyout and the Items list title counter is updated
test('crossout item, the description item text styles change', () => {
    // ARRANGE
    render(<ShoppingList />)
    addNewItem('Milk')

    // ACT
    const crossoutItemButton = screen.getByTitle(/Crossout item \(Milk\)/i)
    userEvent.click(crossoutItemButton)

    // ASSERT
    const newItem = screen.getByText(/Milk/i)
    expect(newItem).toBeInTheDocument()
    expect(newItem).toHaveStyle('text-decoration: line-through;')
    expect(newItem).toHaveStyle('color: #AAA;') // greyout color
    const itemsListTitleUpdated = screen.getByText(/Items \(1\/1\)/i)
    expect(itemsListTitleUpdated).toBeInTheDocument()
});

// Add new item helper function
function addNewItem(itemDescription) {
    const itemDescriptionInput = screen.getByTitle(/item description/i)
    userEvent.type(itemDescriptionInput, itemDescription)
    fireEvent.submit(itemDescriptionInput)
}

// Given a request to crossout an item
// When the crossout button is clicked
// Then the item crossout button should change to the restore button action
test('crossout item, the button change to restore action', () => {
    // ARRANGE
    render(<ShoppingList />)
    addNewItem('Apples')

    // ACT
    userEvent.click(screen.getByTitle(/Crossout item \(Apples\)/i))

    // ASSERT
    const newItem = screen.getByText(/Apples/i)
    expect(newItem).toBeInTheDocument()

    const restoreItemButton = screen.getByTitle(/Restore item \(Apples\)/i)
    expect(restoreItemButton).toBeInTheDocument()

    // NOTE: When we expect to NOT find dom elements we need to use the 'queryBy...' function instead of 'getBy...'
    const crossoutItemButton = screen.queryByTitle(/Crossout item \(Apples\)/i)
    expect(crossoutItemButton).not.toBeInTheDocument()
});

// Given a request to restore a crossout item
// When the retore button is clicked
// Then the item description text crossout and greyout styles should be removed and the Items list title counter is updated
test('restore item, the description item text styles change', () => {
    // ARRANGE
    render(<ShoppingList />)
    addNewItem('Wine')

    const crossoutItemButton = screen.getByTitle(/Crossout item \(Wine\)/i)
    userEvent.click(crossoutItemButton)

    // ACT
    const restoreItemButton = screen.queryByTitle(/Restore item \(Wine\)/i)
    userEvent.click(restoreItemButton)

    // ASSERT
    const newItem = screen.getByText(/Wine/i)
    expect(newItem).toBeInTheDocument()
    expect(newItem).toHaveStyle('text-decoration: none;')
    expect(newItem).toHaveStyle('color: #000;')
    const itemsListTitleUpdated = screen.getByText(/Items \(0\/1\)/i)
    expect(itemsListTitleUpdated).toBeInTheDocument()
});

// Given a request to restore a crossout item
// When the retore button is clicked
// Then the item restore button should change to the crossout button action
test('restore item, the button change to crossout action', () => {
    // ARRANGE
    render(<ShoppingList />)
    addNewItem('Tomatoes')

    userEvent.click(screen.getByTitle(/Crossout item \(Tomatoes\)/i))

    // ACT
    userEvent.click(screen.getByTitle(/Restore item \(Tomatoes\)/i))

    // ASSERT
    const newItem = screen.getByText(/Tomatoes/i)
    expect(newItem).toBeInTheDocument()

    const crossoutItemButton = screen.getByTitle(/Crossout item \(Tomatoes\)/i)
    expect(crossoutItemButton).toBeInTheDocument()
    const restoreItemButton = screen.queryByTitle(/Restore item \(Tomatoes\)/i)
    expect(restoreItemButton).not.toBeInTheDocument()
});

// Given a request to delete an item
// When the delete button is clicked
// Then the item should be removed from the list and the Items list title counter should be updated
test('delete item, item is removed and counters change', () => {
    // ARRANGE
    render(<ShoppingList />)
    addNewItem('Eggs')

    // ACT
    const deleteItemButton = screen.getByTitle(/Delete item \(Eggs\)/i)
    userEvent.click(deleteItemButton)

    // ASSERT
    const newItem = screen.queryByTitle(/Eggs/i)
    expect(newItem).not.toBeInTheDocument()
    const itemsListTitleUpdated = screen.getByText(/Items \(0\/0\)/i)
    expect(itemsListTitleUpdated).toBeInTheDocument()
});

// Given a request to crossout an item and the item is the only one in the list
// When the crossout button is clicked
// Then the Items list title counter should be updated and the All done message should be displayed
test('crossout the only item in the list, all done message', () => {
    // ARRANGE
    render(<ShoppingList />)
    addNewItem('Cheese')

    // ACT
    userEvent.click(screen.getByTitle(/Crossout item \(Cheese\)/i))

    // ASSERT
    const newItem = screen.getByText(/Cheese/i)
    expect(newItem).toBeInTheDocument()
    const itemsListTitleUpdated = screen.getByText(/Items \(1\/1\) ✅ All done!/i)
    expect(itemsListTitleUpdated).toBeInTheDocument()
});

// Given a request to crossout an item and the rest of the list items are already marked as crossout
// When the crossout button is clicked
// Then the Items list title counter should be updated and the All done message should be displayed
test('crossout item and complete all the items, all done message', () => {
    // ARRANGE
    render(<ShoppingList />)
    addNewItem('Beer')
    userEvent.click(screen.getByTitle(/Crossout item \(Beer\)/i))

    addNewItem('Snacks')
    userEvent.click(screen.getByTitle(/Crossout item \(Snacks\)/i))

    addNewItem('Pizza')

    // ACT
    expect(screen.getByText(/Items \(2\/3\)/i)).toBeInTheDocument() // Pre-assert check of the item list counters
    userEvent.click(screen.getByTitle(/Crossout item \(Pizza\)/i))

    // ASSERT
    expect(screen.getByText(/Items \(3\/3\) ✅ All done!/i)).toBeInTheDocument()
});