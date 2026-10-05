import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './ToDo';

describe('Todo Accessibility', () => {
    it('renders landmark section, accessible heading, and labeled task list', () => {
        render(<Todo />);

        const section = screen.getByRole('region', { name: /to-do list/i });
        expect(section).toBeInTheDocument();

        const heading = screen.getByRole('heading', { level: 2, name: /to-do list/i });
        expect(heading).toBeInTheDocument();

        const taskList = screen.getByRole('list', { name: /tasks/i });
        expect(taskList).toBeInTheDocument();
    });

    it('provides accessible names and type="button" for delete buttons', () => {
        render(<Todo />);

        const deleteButtons = screen.getAllByRole('button', { name: /delete task/i });
        expect(deleteButtons).toHaveLength(2);
        expect(screen.getByRole('button', { name: 'Delete task hi' })).toHaveAttribute('type', 'button');
        expect(screen.getByRole('button', { name: 'Delete task hillo' })).toHaveAttribute('type', 'button');
    });

    it('has accessible form input labeling and native required attribute', () => {
        render(<Todo />);

        const input = screen.getByRole('textbox', { name: /task/i });
        expect(input).toBeInTheDocument();
        expect(input).toBeRequired();
        expect(input).not.toHaveAttribute('aria-required');
    });

    it('announces additions and deletions via polite status live region and manages focus', () => {
        render(<Todo />);

        const input = screen.getByRole('textbox', { name: /task/i });
        const statusRegion = screen.getByRole('status');

        const deleteHiBtn = screen.getByRole('button', { name: 'Delete task hi' });
        fireEvent.click(deleteHiBtn);

        expect(statusRegion).toHaveTextContent('Task "hi" deleted.');
        expect(input).toHaveFocus();
    });
});

