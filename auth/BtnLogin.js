import React, { useState } from 'react'
import { SessionProvider, signIn } from 'next-auth/react'
import Loading from '../Loading'
import { toast } from 'react-toastify'
import Router from 'next/router'

const BtnLogin = ({children, SessionProvider, bgColor, txtColor, csrfToken, options}) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await signIn(SessionProvider.id, options)
    setLoading(false)

    if(SessionProvider.id === "credentials"){
      if(res.error){
        if(res.error === "Success! Check your email."){
          signIn('email', {email: options.email})
          return toast.success(res.error)
        }
        return toast.error(res.error)
      }

      return Router.push("/")
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

      {children}

      <button type="submit" className="btn w-100 my-2 py-3"
      style={{ background: `${bgColor}`, color: `${txtColor}`}}>
        Sign in with {SessionProvider}
      </button>

      { loading && <Loading /> }
    </form>
  )
}

BtnLogin.defaultProps = {
  txtColor: '#eee'
}
export default BtnLogin