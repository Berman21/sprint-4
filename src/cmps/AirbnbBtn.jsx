import { useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"

export function AirbnbBtn({ id }) {
    const buttonRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        const button = buttonRef.current

        if (!button) return

        const handleMouseMove = (ev) => {
            const rect = button.getBoundingClientRect()
            const x = ((ev.clientX - rect.left) * 100) / button.clientWidth
            const y = ((ev.clientY - rect.top) * 100) / button.clientHeight
            button.style.setProperty('--mouse-x', x)
            button.style.setProperty('--mouse-y', y)
        };

        button.addEventListener('mousemove', handleMouseMove)

        return () => {
            button.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    function onReservePage() {
        return navigate(`/stay/${id}/reserve`)
    }

    return (
        <button ref={buttonRef} className="btn-reserve" onClick={onReservePage}>
            Reserve
        </button>
    )
}
