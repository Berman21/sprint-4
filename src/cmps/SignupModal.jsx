import * as React from 'react';


import { LoginSignup } from "./LoginSignup";
import { login, signup } from "../store/user.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { SET_APP_MODAL_LOGIN, SET_APP_MODAL_SIGNUP } from '../store/system.reducer';
import { useDispatch, useSelector } from 'react-redux';
export function SignupModal({ onClose }) {
    const appModal = useSelector((storeState) => storeState.systemModule.appModal)

    const dispatch = useDispatch()

    async function onLoginn(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    function changeToLogin(modalType) {
        dispatch({ type: modalType })

    }


    return (
        <section className="modal-signup-container">
            <article className="signup-title">
                <h1>Welcome to Airbnb</h1>
            </article>
            <LoginSignup onClose={onClose} onSignup={onSignup} />
            {appModal === SET_APP_MODAL_SIGNUP &&
                <button className='change-login' onClick={() => changeToLogin(SET_APP_MODAL_LOGIN)}>Log in</button>
            }
            {appModal === SET_APP_MODAL_LOGIN &&

                <button className='change-login' onClick={() => changeToLogin(SET_APP_MODAL_SIGNUP)} >Sign up</button>
            }
            {/* <Input
            value={credentials.fullname}
                endDecorator={null}
                slots={{ input: InnerInput }}
                slotProps={{ input: { label: 'Fullname', placeholder: '' } }}
                sx={{
                    '--Input-minHeight': '56px',
                    '--Input-radius': '6px',
                }}
            />
            <Input
            value={credentials.username}
                endDecorator={null}
                slots={{ input: InnerInput }}
                slotProps={{ input: { placeholder: '', label: 'Username' } }}
                sx={{
                    '--Input-minHeight': '56px',
                    '--Input-radius': '6px',
                }}
            />
            <Input
            value={credentials.password}
                endDecorator={null}
                slots={{ input: InnerInput }}
                slotProps={{ input: { placeholder: '', label: 'Password', type: 'password' } }}
                sx={{
                    '--Input-minHeight': '56px',
                    '--Input-radius': '6px',
                }}
            /> */}
        </section>
    )
}