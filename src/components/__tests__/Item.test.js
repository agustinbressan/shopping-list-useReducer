import { render, screen } from '@testing-library/react'
import Item from "../Item"

// Given a request to see an item in the list
// When the item is displayed
// Then the item should show the correct description and styles
test('item display the correct description and styles', () => {
    // ARRANGE
    const mockProps = {
        item: {
            description: 'Wine',
            done: false
        },
        itemNumber: 99,
    }
    render(<Item {...mockProps} />)

    // ACT (No user action)

    // ASSERT
    const listItem = screen.getByText(/99\) Wine/i)
    expect(listItem).toBeInTheDocument()
    expect(listItem).toHaveStyle('text-decoration: none;')
    expect(listItem).toHaveStyle('color: #000;')
});

// Given a request to see a crossout item in the list
// When the item is displayed
// Then the item should show the correct description and the crossout styles
test('crossout item display the correct description and styles', () => {
    // ARRANGE
    const mockProps = {
        item: {
            description: 'Beer',
            done: true
        },
        itemNumber: 5,
    }
    render(<Item {...mockProps} />)

    // ACT (No user action)

    // ASSERT
    const listItem = screen.getByText(/5\) Beer/i)
    expect(listItem).toBeInTheDocument()
    expect(listItem).toHaveStyle('text-decoration: line-through;')
    expect(listItem).toHaveStyle('color: #AAA;') // greyout color
});