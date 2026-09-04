import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SettingsForm from './SettingsForm'

describe('SettingsForm validation', () => {
  it('shows error when display name is too short', async () => {
    render(<SettingsForm />)
    const input = screen.getByLabelText(/display name/i)
    await userEvent.type(input, 'a')
    fireEvent.blur(input)
    expect(await screen.findByText(/must be between 2 and 50 characters/i)).toBeInTheDocument()
  })

  it('does not show an error when website is left empty', async () => {
    render(<SettingsForm />)
    const input = screen.getByLabelText(/website/i)
    fireEvent.blur(input)
    expect(screen.queryByText(/website must start with/i)).not.toBeInTheDocument()
  })

  it('shows error when website has no protocol', async () => {
    render(<SettingsForm />)
    const input = screen.getByLabelText(/website/i)
    await userEvent.type(input, 'example.com')
    fireEvent.blur(input)
    expect(await screen.findByText(/website must start with/i)).toBeInTheDocument()
  })

  it('shows success message on valid submit', async () => {
    render(<SettingsForm />)
    await userEvent.type(screen.getByLabelText(/display name/i), 'Rodina')
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com')
    await userEvent.click(screen.getByRole('button', { name: /save settings/i }))
    expect(await screen.findByText(/settings saved/i)).toBeInTheDocument()
  })

  it('shows error when email is invalid', async () => {
    render(<SettingsForm />)
    const input = screen.getByLabelText(/email/i)
    await userEvent.type(input, 'notanemail')
    fireEvent.blur(input)
    expect(await screen.findByText(/enter a valid email/i)).toBeInTheDocument()
  })
})