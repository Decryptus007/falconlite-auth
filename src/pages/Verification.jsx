import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import LoadingBackdrop, { ButtonLoader } from '../utils/LoadingBackdrop';

const MySwal = withReactContent(Swal)

function Verification() {
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

  const [isPageValid, setIsPageValid] = useState(true)
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    if (sessionStorage.getItem("verify") === null) {
      setIsPageValid(false)
    } else {
      return
    }
  }, [])

  const handleChange = (code) => setOtp(code);
  useEffect(() => {
    if (otp.length === 5) verifyUser()
  }, [otp])

  const navigate = useNavigate()

  const verifyUser = () => {
    setIsLoading(true)
    if (otp.length === 5) {
      var urlencoded = new URLSearchParams();
      urlencoded.append("code", otp);

      var requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("https://falconlite.com/v1/api/verify-email", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.data.message.includes("successful")) {
            Toast.fire({
              icon: 'success',
              title: result.data.message
            })

            setTimeout(() => {
              navigate("/signin")
            }, 2000);
          } else {
            MySwal.fire({
              title: <p className='text-sm'>{`${result.data.message} or incorrect code`}</p>,
              icon: 'error',
              confirmButtonColor: '#0ea5e9',
            })
            setIsLoading(false)
          }
        })
        .catch(error => {
          MySwal.fire({
            title: <p className='text-sm'>The server encountered an error verifyong your email, please kindly check your network and retry</p>,
            icon: 'error',
            confirmButtonColor: '#0ea5e9',
          })
          setIsLoading(false)
        });
    } else {
      MySwal.fire({
        title: <p className='text-sm'>Input a valid number</p>,
        icon: 'error',
      })
      setIsLoading(false)
    }
  }

  return isPageValid && (
    <>
      <div className="flex min-h-screen">
        <div className="p-2 pb-8 flex flex-col items-center w-full bg-sky-100 lg:px-8 lg:w-[60vw]">
          <div className='relative animate__animated animate__fadeIn flex items-center px-2 py-4 mx-auto  md:px-4'>
            <div>
              <img src="https://www.falconlite.com/img/fcl-logo.png" alt="" className='mx-auto mb-8 h-[100px]' />
              <h2 className="text-2xl text-customBlue">Kindly enter Email verification code</h2>
              <span className="mt-2 text-gray-700 text-sm sm:text-base">
                To Sign up, kindly enter the verification code sent to your email address
              </span>
              <div className="mt-16 mx-auto w-fit">
                <OtpInput
                  value={otp}
                  onChange={handleChange}
                  numInputs={5}
                  placeholder="....."
                  shouldAutoFocus={true}
                />
              </div>
              <button
                onClick={verifyUser}
                className='mt-20 flex items-center gap-2 justify-center transition duration-500 bg-sky-500 rounded-md w-full max-w-[300px] mx-auto py-2'
              >
                Proceed to Login {isLoading && <ButtonLoader />}
              </button>
            </div>
          </div>
        </div>

        <div style={{ backgroundImage: 'url(https://www.falconlite.com/img/safe-fundz.png)' }} className="bg-center bg-cover hidden bg-sky-500 lg:block lg:w-[40vw]"></div>
      </div>

      {isLoading && <LoadingBackdrop />}
    </>
  )
}

export default Verification