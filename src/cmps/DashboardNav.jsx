import { useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { logout } from "../store/user.actions"
import homePage from '../assets/img/nav-home.svg'
import chart from '../assets/img/nav-chart.svg'
import trips from '../assets/img/nav-trips.svg'
import wishlist from '../assets/img/nav-heart.svg'
import logoutIcon from '../assets/img/nav-logout.svg'
import { Link } from "react-router-dom"
export function DashboardNav() {
    const [selectedExperience, setSelectedExperience] = useState('dashboard')

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function toggleSelected(ev) {
        ev.preventDefault()
        const field = ev.currentTarget.getAttribute('name')
        const value = ev.currentTarget.getAttribute('class')
        if (value === selectedExperience) return
        setSelectedExperience(`${field}`)
    }

    return (
        <nav className="dashboard-nav">
            <section className='nav-options'>
                <article className={selectedExperience === 'stays' ? 'selected' : ''} name='stays' onClick={toggleSelected}>
                    <Link to={'/'}>

                        <img src={homePage} />
                        <span>Homepage</span>
                    </Link>
                </article>

                <article className={selectedExperience === 'dashboard' ? 'selected' : ''} name='dashboard' onClick={toggleSelected}>
                    <img src={chart} />
                    <span>Dashboard</span>
                </article>

                <article className={selectedExperience === 'wishlist' ? 'selected' : ''} name='wishlist' onClick={toggleSelected}>
                    <img src={wishlist} />

                    <span>Wishlist</span>
                </article>

                <article className={selectedExperience === 'trips' ? 'selected' : ''} name='trips' onClick={toggleSelected}>
                    <img src={trips} />
                    <span>Trips</span>
                </article>
            </section>
            <article className="nav-logout" onClick={onLogout}>
                <Link to={'/'}>
                    <img src={logoutIcon} />
                    <span>Logout</span>
                </Link>
            </article>


        </nav>
    )

}