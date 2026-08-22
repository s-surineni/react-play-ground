import { render, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import TempPlayground from './TempPlayground'
import style from './TempPlayground.module.css'

const ROWS = 6

function cell(view, r, c) {
  return view.getByTestId(`cell-${r}-${c}`)
}

describe('TempPlayground', () => {
  it('drops red at the bottom of the clicked column', () => {
    const view = render(<TempPlayground />)

    fireEvent.click(cell(view, 0, 0))

    expect(cell(view, 5, 0)).toHaveClass(style.red)
    expect(cell(view, 0, 0)).not.toHaveClass(style.red)
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
})
