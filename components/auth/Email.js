import React, { useState } from 'react'
import BtnLogin from './BtnLogin'

const Email = ({providers, csrfToken}) => {
  const [email, setEmail] = useState('')
  return (
    <BtnLogin 
    SessionProvider={providers}
      bgColor='#22b05b'
      csrfToken={csrfToken}
      options={{email}}
    >
      <div>
        <label htmlFor="Email address">Email address</label>
        <input type="email" id="email" name="email"
        className="form-control w-100"
        placeholder="email@example.com" required
        value={email} onChange={e => setEmail(e.target.value)} />
      </div>
    </BtnLogin>
  )
}

export default Email