import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { stayService } from "../services/stay.service.local.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { updateStay } from "../store/stay.actions"

export function StayEdit() {

    const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay)
    const navigate = useNavigate()
    const { stayId } = useParams()


    useEffect(() => {
        if (stayId) loadStay()
    }, [])


    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStayToEdit(stay)
        }
        catch {
            showErrorMsg('Cannot load stay')
        }
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || 0
                break
            case 'checkbox':
                value = target.checked
                break
            default:
                break
        }
        setStayToEdit((prevStay) => ({ ...prevStay, [field]: value }))
    }


    async function onSaveStay(ev) {
        ev.preventDefault()
        try {
            const savedStay = await updateStay(stayToEdit)
            showSuccessMsg('updated stay')
            navigate('/')
        }
        catch {
            showErrorMsg('cant update stay')
        }
    }

    const { name, price } = stayToEdit

    return (
        <section className="stay-edit-container">
            <section className="stay-edit">
                <h2> {stayId ? 'Edit' : 'Add'} stay</h2>
                <form onSubmit={onSaveStay} className="edit-form">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            required=""
                            onChange={handleChange}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Stay name:"
                            value={name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            required=""
                            type="number"
                            onChange={handleChange}
                            name="price"
                            id="price"
                            placeholder="Night price:"
                            value={price}
                        />
                    </div>
                    <button className="form-submit-btn">Save</button>
                </form>
            </section>
        </section>
    )
}