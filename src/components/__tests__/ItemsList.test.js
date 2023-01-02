import { render, screen } from '@testing-library/react'
import ItemsList from '../ItemsList'

// Given no initial user interaction
// When the items list init
// Then the items list should be empty
test('items list, initial empty state', () => {
    // ARRANGE
    const mockProps = {
        items: [],
    }
    render(<ItemsList {...mockProps} />)

    // ACT (No user action)

    // ASSERT
    const emptyItemListMessage = screen.getByText(/The item list is empty./i)
    expect(emptyItemListMessage).toBeInTheDocument()
    const itemsListTitle = screen.getByText(/Items \(0\/0\)/i)
    expect(itemsListTitle).toBeInTheDocument()
});

// Given a request to see the items list with an item
// When the items list is displayed
// Then the items list should show the item
test('items list, show an item', () => {
    // ARRANGE
    const mockProps = {
        items: [{
            id: 1,
            description: 'Cheese',
            done: false,
        }],
    }
    render(<ItemsList {...mockProps} />)

    // ACT (No user action)

    // ASSERT
    const listItem = screen.getByText(/1\) Cheese/i)
    expect(listItem).toBeInTheDocument()
    const itemsListTitle = screen.getByText(/Items \(0\/1\)/i)
    expect(itemsListTitle).toBeInTheDocument()
});

// Given a request to see the items list with items
// When the items list is displayed
// Then the items list should show the correct counter values
test('items list, show correct counter values', () => {
    // ARRANGE
    const mockProps = {
        items: [{
            id: 1,
            done: false,
        },
        {
            id: 2,
            done: true,
        }],
    }
    render(<ItemsList {...mockProps} />)

    // ACT (No user action)

    // ASSERT
    const itemsListTitle = screen.getByText(/Items \(1\/2\)/i)
    expect(itemsListTitle).toBeInTheDocument()
});

// Given a request to see the items list with all crossout items
// When the items list is displayed
// Then the items list should show the all done message in the title
test('items list, show all done message title', () => {
    // ARRANGE
    const mockProps = {
        items: [{
            id: 1,
            done: true,
        },
        {
            id: 2,
            done: true,
        }],
    }
    render(<ItemsList {...mockProps} />)

    // ACT (No user action)

    // ASSERT
    const itemsListTitle = screen.getByText(/Items \(2\/2\) ✅ All done!/i)
    expect(itemsListTitle).toBeInTheDocument()
});