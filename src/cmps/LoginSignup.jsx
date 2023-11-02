import { useState, useEffect } from 'react'
import * as React from 'react';

import { userService } from '../services/user.service'
import { ImgUploader } from './ImgUploader'
import { Input } from '@mui/joy'
import { styled } from '@mui/joy/styles'
import { Field, Form, Formik } from "formik"
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined'
import { AirbnbBtn } from './AirbnbBtn';
import { useSelector } from 'react-redux';
import { SET_APP_MODAL_LOGIN, SET_APP_MODAL_SIGNUP } from '../store/system.reducer';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { login } from '../store/user.actions';


export function LoginSignup(props) {
  const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
  const [isSignup, setIsSignup] = useState(false)
  const [users, setUsers] = useState([])
  const appModal = useSelector((storeState) => storeState.systemModule.appModal)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const users = await userService.getUsers()
    setUsers(users)
  }

  function clearState() {
    setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
    setIsSignup(false)
  }

  function onLogin(values) {
    if (!values.username || !values.password) return
    onLoginn(values)
    // if (loggedInUser) {
    //   clearState()
    //   props.onClose()
    // }
  }

  async function onLoginn(credentials) {
    try {
      const user = await login(credentials)
      await props.onClose()
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }

  function onSignup(values) {
    if (!values.username || !values.password || !values.fullname) return
    props.onSignup(values)
    clearState()
    props.onClose()

  }

  function onSubmit(values) {
    console.log(values);
    if (appModal === SET_APP_MODAL_LOGIN) onLogin(values)
    else onSignup(values)
  }

  function toggleSignup() {
    setIsSignup(!isSignup)
  }

  function onUploaded(imgUrl) {
    setCredentials({ ...credentials, imgUrl })
  }
  return (
    <div className='login-page'>

      <Formik initialValues={credentials} onSubmit={onSubmit}>
        <Form className='form-container'>
          {appModal === SET_APP_MODAL_SIGNUP && <Field placeholder='Full name' name='fullname' as={Input} label="Fullname" />}
          <Field placeholder='Username' name='username' as={Input} label="Username" />
          <Field placeholder='Password' name='password' as={Input} label="Password" type='password' />

          <AirbnbBtn txt={appModal === SET_APP_MODAL_LOGIN ? 'Login' : 'Register'} callBackFunction={onSubmit} />
        </Form>
      </Formik>

      {/* {appModal === SET_APP_MODAL_LOGIN &&
        <form className='login-form' onSubmit={onSubmit}>
          <select name='username' value={credentials.username} onChange={handleChange}>
            <option value=''>Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user.username}>
                {user.fullname}
              </option>
            ))}
          </select>
          <input type='text' name='username' value={credentials.username} placeholder='Username' onChange={handleChange} required autoFocus />
          <input type='password' name='password' value={credentials.password} placeholder='Password' onChange={handleChange} required />
          <button>Login!</button>
        </form>
      } */}

    </div>
  );
}