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


  useEffect(() => {
    loadUsers()
  }, [])


  const StyledInput = styled('input')({
    border: 'none', // remove the native input border
    minWidth: 0, // remove the native input width
    outline: 0, // remove the native input outline
    padding: 0, // remove the native input padding
    paddingTop: '1em',
    flex: 1,
    color: 'black',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontStyle: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    textOverflow: 'ellipsis',
    '&::placeholder': {
      opacity: 0,
      transition: '0.1s ease-out',
    },
    '&:focus::placeholder': {
      opacity: 1,
    },
    '&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label': {
      top: '0.5rem',
      fontSize: '0.75rem',
    },
    '&:focus ~ label': {
      // color: 'var(--Input-focusedHighlight)',
    },
    '&:-webkit-autofill': {
      alignSelf: 'stretch', // to fill the height of the root slot
    },
    '&:-webkit-autofill:not(* + &)': {
      marginInlineStart: 'calc(-1 * var(--Input-paddingInline))',
      paddingInlineStart: 'var(--Input-paddingInline)',
      borderTopLeftRadius:
        'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
      borderBottomLeftRadius:
        'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
    },
  });

  const StyledLabel = styled('label')(({ theme }) => ({
    position: 'absolute',
    lineHeight: 1,
    top: 'calc((var(--Input-minHeight) - 1em) / 2)',
    color: theme.vars.palette.text.tertiary,
    fontWeight: theme.vars.fontWeight.md,
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  }));

  const InnerInput = React.forwardRef(function InnerInput(props, ref) {
    const id = React.useId();
    return (
      <React.Fragment>
        <StyledInput {...props} ref={ref} id={id} />
        <StyledLabel htmlFor={id}>{props.label}</StyledLabel>
      </React.Fragment>
    );
  });
  async function loadUsers() {
    const users = await userService.getUsers()
    setUsers(users)
  }

  function clearState() {
    setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
    setIsSignup(false)
  }

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  function onLogin(ev = null) {
    if (ev) ev.preventDefault()
    if (!credentials.username || !credentials.password) return
    onLoginn(credentials)
    clearState()
  }

  async function onLoginn(credentials) {
    try {
      const user = await login(credentials)
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

      {appModal === SET_APP_MODAL_SIGNUP && <Formik initialValues={credentials} onSubmit={onSubmit}>
        <Form className='form-container'>
          {appModal === SET_APP_MODAL_SIGNUP && <Field placeholder='Full name' name='fullname' as={Input} label="Fullname" />}
          <Field placeholder='Username' name='username' as={Input} label="Username" />
          <Field placeholder='Password' name='password' as={Input} label="Password" type='password' />

          <AirbnbBtn txt={appModal === SET_APP_MODAL_LOGIN ? 'Login' : 'Register'} callBackFunction={appModal === SET_APP_MODAL_LOGIN ? onLogin : onSignup} />
        </Form>
      </Formik>
      }
      {appModal === SET_APP_MODAL_LOGIN &&
        <form className='login-form' onSubmit={onLogin}>
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
      }

    </div>
  );
}