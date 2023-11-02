import * as React from 'react';


import { LoginSignup } from "./LoginSignup";
import { login, signup } from "../store/user.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
export function SignupModal({ onClose }) {

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



    return (
        <section className="modal-signup-container">
            <article className="signup-title">
                <h1>Welcome to Airbnb</h1>
            </article>
            <LoginSignup onClose={onClose} onSignup={onSignup} />
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