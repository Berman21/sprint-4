import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { stayService } from "../services/stay.service.local.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from "react-redux"

export function StayDetails(){

    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStay()
    }, [toyId])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log('Had issues in stay details', err)
            showErrorMsg('Cannot load stay')
            navigate('/stay')
        }
    }

    return (
        <section>
            <h1>{stay.summary}</h1>
            <h2>{stay.loc.country},{stay.loc.city}</h2>
            <img src={stay.imgUrls[0]} alt="" />
            <h1>{stay.type} hosted by {stay.host.fullname}</h1>
        </section>
    )
}