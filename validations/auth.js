const rules = {
  first_name: [(v) => !!v || 'Firstname is required'],
  last_name: [(v) => !!v || 'Lastname is required'],
  email: [(v) => !!v || 'Email is required'],
  password: [
    (v) => !!v || 'Password is required',
    (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
  ],
  password_confirmation: [
    (v) => !!v || 'Password confirmation is required',
    (v) => (v && v.length >= 8) || 'Password confirmation must be at least 8 characters',
  ],
}

export { rules }
