import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import LoadingBackdrop, { ButtonLoader } from '../utils/LoadingBackdrop';

// eslint-disable-next-line no-useless-escape
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const MySwal = withReactContent(Swal)

function Signin() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const [signupData, setSignupData] = useState({
    email: "",
    password: ""
  })
  const [passwordShow, setPasswordShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const passwordRef = useRef()
  useEffect(() => {
    if (passwordShow) {
      passwordRef.current.type = "text"
    } else {
      passwordRef.current.type = "password"
    }
  }, [passwordShow])

  const navigate = useNavigate()

  const signupFunc = () => {
    const values = Object.values(signupData).every(data => data)
    if (values && signupData.email.match(mailformat)) {
      setIsLoading(true)

      MySwal.fire({
        title: <p className='text-base'>This is just a demo</p>,
        icon: 'info',
        confirmButtonColor: '#0ea5e9'
      })
      setIsLoading(false)
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Invalid input details'
      })
    }
  }


  return (
    <>
      <div className="flex min-h-screen">
        <div className="p-2 pb-8 flex flex-col items-center justify-center w-full bg-sky-100 lg:px-8 lg:w-[60vw]">
          <img src="https://www.falconlite.com/img/fcl-logo.png" alt="" className='h-[100px]' />
          <div className="mt-4 flex flex-col gap-2">
            <span className="text-2xl">Login to your account</span>
            <span className="text-gray-700">Signin to your dashboard and continue from where you left</span>

            <form onSubmit={e => e.preventDefault()} className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm text-gray-700">Email Address</label>
                <input type="text" id='email'
                  placeholder='Fname@gmail.com'
                  className="h-[44px] w-full p-2 bg-transparent rounded-md border-2 border-sky-500"
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                />
              </div>
              <div className="relative flex flex-col gap-1">
                <label htmlFor="password" className="text-sm text-gray-700">Password</label>
                <input type="password" id='password' ref={passwordRef}
                  placeholder='**********'
                  className="h-[44px] w-full p-2 pr-10 bg-transparent rounded-md border-2 border-sky-500"
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                />
                {passwordShow ?
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 cursor-pointer absolute top-8 right-2`}
                    onClick={() => setPasswordShow(false)}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 cursor-pointer absolute top-8 right-2`}
                    onClick={() => setPasswordShow(true)}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id='remember' defaultChecked
                  className="p-2 bg-transparent rounded-md border-2 border-sky-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
              </div>
              <button onClick={signupFunc}
                className="mt-4 py-2 w-5/6 mx-auto rounded-lg bg-sky-500 flex items-center justify-center gap-4"
              >
                Sign in {isLoading && <ButtonLoader />}
              </button>
              <span className='text-center text-gray-700'>New to the platform?
                <Link to={"/signup"} className="text-sky-500 underline"> Sign up</Link>
              </span>
            </form>
          </div>
        </div>

        <div style={{ backgroundImage: 'url(https://www.falconlite.com/img/safe-fundz.png)' }} className="bg-center bg-cover hidden bg-sky-500 lg:block lg:w-[40vw]"></div>
      </div>

      {isLoading && <LoadingBackdrop />}
    </>
  )
}

export default Signin