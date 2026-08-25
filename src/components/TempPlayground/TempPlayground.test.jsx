import { render, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import TempPlayground from './TempPlayground'
import style from './TempPlayground.module.css'

const ROWS = 6

function cell(view, r, c) {
  return view.getByTestId(`cell-${r}-${c}`)
}

describe('TempPlayground', () => {
  it("shows red's turn at the start", () => {
    const view = render(<TempPlayground />)

    expect(view.getByTestId('status')).toHaveTextContent("red's turn")
  })

  it('drops red at the bottom of the clicked column', () => {
    const view = render(<TempPlayground />)

    fireEvent.click(cell(view, 0, 0))

    expect(cell(view, 5, 0)).toHaveClass(style.red)
    expect(cell(view, 0, 0)).not.toHaveClass(style.red)
    expect(view.getByTestId('status')).toHaveTextContent("blue's turn")
  })

  it('stacks the next piece above and switches to blue', () => {
    const view = render(<TempPlayground />)

    fireEvent.click(cell(view, 0, 0))
    fireEvent.click(cell(view, 0, 0))

    expect(cell(view, 5, 0)).toHaveClass(style.red)
    expect(cell(view, 4, 0)).toHaveClass(style.blue)
  })

  it('drops in the clicked column even if a filled cell is clicked', () => {
    const view = render(<TempPlayground />)

    fireEvent.click(cell(view, 0, 2))
    fireEvent.click(cell(view, 5, 2))

    expect(cell(view, 5, 2)).toHaveClass(style.red)
    expect(cell(view, 4, 2)).toHaveClass(style.blue)
  })

  it('does not change other columns', () => {
    const view = render(<TempPlayground />)

    fireEvent.click(cell(view, 0, 2))

    expect(cell(view, 5, 2)).toHaveClass(style.red)
    expect(cell(view, 5, 0)).not.toHaveClass(style.red)
    expect(cell(view, 5, 1)).not.toHaveClass(style.red)
  })

  it('does nothing when the column is full', () => {
    const view = render(<TempPlayground />)

    for (let i = 0; i < ROWS; i++) {
      fireEvent.click(cell(view, 0, 0))
    }
    fireEvent.click(cell(view, 0, 0))

    expect(cell(view, 5, 0)).toHaveClass(style.red)
    expect(cell(view, 0, 0)).toHaveClass(style.blue)
    expect(cell(view, 5, 1)).not.toHaveClass(style.red)
    expect(cell(view, 5, 1)).not.toHaveClass(style.blue)
  })

  it('wins when the disc completes a line from the middle', () => {
    const view = render(<TempPlayground />)

    fireEvent.click(cell(view, 0, 0))
    fireEvent.click(cell(view, 0, 5))
    fireEvent.click(cell(view, 0, 1))
    fireEvent.click(cell(view, 0, 5))
    fireEvent.click(cell(view, 0, 3))
    fireEvent.click(cell(view, 0, 5))
    fireEvent.click(cell(view, 0, 2))

    expect(view.getByTestId('status')).toHaveTextContent('Winner: red')
    expect(cell(view, 5, 0)).toHaveClass(style.win)
    expect(cell(view, 5, 1)).toHaveClass(style.win)
    expect(cell(view, 5, 2)).toHaveClass(style.win)
    expect(cell(view, 5, 3)).toHaveClass(style.win)

    fireEvent.click(cell(view, 0, 4))
    expect(cell(view, 5, 4)).not.toHaveClass(style.red)
    expect(cell(view, 5, 4)).not.toHaveClass(style.blue)
  })

  it('wins on four in a column', () => {
    const view = render(<TempPlayground />)

    fireEvent.click(cell(view, 0, 0))
    fireEvent.click(cell(view, 0, 1))
    fireEvent.click(cell(view, 0, 0))
    fireEvent.click(cell(view, 0, 1))
    fireEvent.click(cell(view, 0, 0))
    fireEvent.click(cell(view, 0, 1))
    fireEvent.click(cell(view, 0, 0))

    expect(view.getByTestId('status')).toHaveTextContent('Winner: red')
  })

  it('resets the board', () => {
    const view = render(<TempPlayground />)

    fireEvent.click(cell(view, 0, 0))
    fireEvent.click(view.getByTestId('reset'))

    expect(cell(view, 5, 0)).not.toHaveClass(style.red)
    expect(view.getByTestId('status')).toHaveTextContent("red's turn")
  })
})
