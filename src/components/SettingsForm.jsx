import { useState } from 'react'
import './SettingsForm.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_PATTERN = /^https?:\/\/.+\..+/i

const initialValues = {
  displayName: '',
  email: '',
  website: '',
  bio: '',
  theme: 'system',
}

function validate(values) {
  const errors = {}
  const name = values.displayName.trim()
  const email = values.email.trim()
  const website = values.website.trim()
  const bio = values.bio.trim()

  if (!name) {
    errors.displayName = 'Display name is required.'
  } else if (name.length < 2) {
    errors.displayName = 'Display name must be at least 2 characters.'
  } else if (name.length > 50) {
    errors.displayName = 'Display name must be 50 characters or fewer.'
  }

  if (!email) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (website && !URL_PATTERN.test(website)) {
    errors.website = 'Enter a valid URL starting with http:// or https://.'
  }

  if (bio.length > 200) {
    errors.bio = 'Bio must be 200 characters or fewer.'
  }

  if (!['light', 'dark', 'system'].includes(values.theme)) {
    errors.theme = 'Choose a theme.'
  }

  return errors
}

function SettingsForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [saved, setSaved] = useState(false)

  function updateField(name, value) {
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)
    setSaved(false)

    if (submitted || touched[name]) {
      setErrors(validate(nextValues))
    }
  }

  function handleBlur(event) {
    const { name } = event.target
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors(validate(values))
  }

  function handleChange(event) {
    const { name, value } = event.target
    updateField(name, value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setSubmitted(true)
    setTouched({
      displayName: true,
      email: true,
      website: true,
      bio: true,
      theme: true,
    })

    if (Object.keys(nextErrors).length > 0) {
      setSaved(false)
      return
    }

    setSaved(true)
  }

  function fieldError(name) {
    return (touched[name] || submitted) && errors[name]
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <h2>Portfolio settings</h2>
      <p className="settings-form__intro">
        Update how your profile appears. Required fields are marked.
      </p>

      <div className="settings-form__field">
        <label htmlFor="displayName">
          Display name <span aria-hidden="true">*</span>
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          autoComplete="name"
          value={values.displayName}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldError('displayName'))}
          aria-describedby={fieldError('displayName') ? 'displayName-error' : undefined}
        />
        {fieldError('displayName') ? (
          <p id="displayName-error" className="settings-form__error" role="alert">
            {errors.displayName}
          </p>
        ) : null}
      </div>

      <div className="settings-form__field">
        <label htmlFor="email">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldError('email'))}
          aria-describedby={fieldError('email') ? 'email-error' : undefined}
        />
        {fieldError('email') ? (
          <p id="email-error" className="settings-form__error" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="settings-form__field">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="url"
          autoComplete="url"
          placeholder="https://example.com"
          value={values.website}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldError('website'))}
          aria-describedby={fieldError('website') ? 'website-error' : undefined}
        />
        {fieldError('website') ? (
          <p id="website-error" className="settings-form__error" role="alert">
            {errors.website}
          </p>
        ) : null}
      </div>

      <div className="settings-form__field">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          maxLength={220}
          value={values.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldError('bio'))}
          aria-describedby={
            fieldError('bio') ? 'bio-error bio-count' : 'bio-count'
          }
        />
        <p id="bio-count" className="settings-form__hint">
          {values.bio.trim().length}/200
        </p>
        {fieldError('bio') ? (
          <p id="bio-error" className="settings-form__error" role="alert">
            {errors.bio}
          </p>
        ) : null}
      </div>

      <fieldset className="settings-form__field">
        <legend>Theme</legend>
        <div className="settings-form__options">
          {['light', 'dark', 'system'].map((theme) => (
            <label key={theme} className="settings-form__option">
              <input
                type="radio"
                name="theme"
                value={theme}
                checked={values.theme === theme}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </label>
          ))}
        </div>
        {fieldError('theme') ? (
          <p className="settings-form__error" role="alert">
            {errors.theme}
          </p>
        ) : null}
      </fieldset>

      <button type="submit" className="settings-form__submit">
        Save settings
      </button>

      {saved ? (
        <p className="settings-form__success" role="status">
          Settings saved.
        </p>
      ) : null}
    </form>
  )
}

export default SettingsForm
