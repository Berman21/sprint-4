import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { logout } from "../store/user.actions"

export function DashboardNav() {

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <nav className="dashboard-nav">
            <section className='c'>
                <article className={selectedExperience === 'stays' ? 'selected' : ''} name='stays' onClick={toggleSelected}>
                    <span>Homepage</span>
                </article>

                <article className={selectedExperience === 'experiences' ? 'selected' : ''} name='experiences' onClick={toggleSelected}>
                    <span>Experiences</span>
                </article>

                <article className={selectedExperience === 'online' ? 'selected' : ''} name='online' onClick={toggleSelected}>
                    <span>Online Experiences</span>
                </article>
            </section>

            <span className='experiences'>Search your next trip!</span>

            {/* <div onClick={onLogout}>Logout</div> */}
        </nav>
    )

}