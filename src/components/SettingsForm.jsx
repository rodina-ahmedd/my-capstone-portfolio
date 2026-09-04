import { useState } from 'react';

const initialValues = {
  displayName: '',
  email: '',
  website: '',
  bio: '',
  theme: 'system',
};

function validateField(name, value) {
  switch (name) {
    case 'displayName':
      if (!value.trim()) return 'Display name is required.';
      if (value.trim().length < 2 || value.trim().length > 50) {
        return 'Must be between 2 and 50 characters.';
      }
      return '';
    case 'email': {
      if (!value.trim()) return 'Email is required.';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value.trim())) return 'Enter a valid email address.';
      return '';
    }
    case 'website': {
      if (!value.trim()) return '';
      if (!/^https?:\/\//.test(value.trim())) {
        return 'Website must start with http:// or https://';
      }
      return '';
    }
    case 'bio':
      if (value.length > 200) return 'Bio must be 200 characters or fewer.';
      return '';
    default:
      return '';
  }
}

function validateAll(values) {
  const errors = {};
  Object.keys(initialValues).forEach((key) => {
    const error = validateField(key, values[key]);
    if (error) errors[key] = error;
  });
  return errors;
}

export default function SettingsForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const allErrors = validateAll(values);
    setErrors(allErrors);
    setTouched({
      displayName: true,
      email: true,
      website: true,
      bio: true,
      theme: true,
    });

    if (Object.keys(allErrors).length === 0) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  }

  return (
    <form id="settings" onSubmit={handleSubmit} noValidate>
      <h2>Settings</h2>

      <div className="field">
        <label htmlFor="displayName">Display name</label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          value={values.displayName}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby="displayName-error"
          aria-invalid={Boolean(errors.displayName)}
        />
        {errors.displayName && (
          <p id="displayName-error" role="alert">
            {errors.displayName}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby="email-error"
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && (
          <p id="email-error" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="website">Website (optional)</label>
        <input
          id="website"
          name="website"
          type="text"
          value={values.website}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby="website-error"
          aria-invalid={Boolean(errors.website)}
          placeholder="https://example.com"
        />
        {errors.website && (
          <p id="website-error" role="alert">
            {errors.website}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={values.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby="bio-error bio-count"
          aria-invalid={Boolean(errors.bio)}
          maxLength={200}
        />
        <span id="bio-count">{values.bio.length}/200</span>
        {errors.bio && (
          <p id="bio-error" role="alert">
            {errors.bio}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="theme">Theme</label>
        <select
          id="theme"
          name="theme"
          value={values.theme}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <button type="submit">Save settings</button>

      {submitted && (
        <p role="status" style={{ color: 'green' }}>
          Settings saved.
        </p>
      )}
    </form>
  );
}