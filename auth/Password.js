import React, { useState } from 'react'
import BtnLogin from './BtnLogin'
const Password = ({providers, csrfToken}) => {
    const [password, setPassword] = useState('')
    return (
      <BtnLogin 
      SessionProvider={providers}
        bgColor='#22b05b'
        csrfToken={csrfToken}
        options={{password}}
      >
        <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password"
        className="form-control w-100"  required
        value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      </BtnLogin>
    )
 }
export default Password
