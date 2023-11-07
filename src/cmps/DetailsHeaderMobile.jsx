import React from 'react'
import { useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { WishlistIcon } from './WishlistIcon'
import arrowLeftSvg from '../assets/img/arrow-left.svg'

export function DetailsHeaderMobile({ onWishlistIcon, setClr }) {

    const [dateSelection, setIsDateOpen] = useState(false)
    const navigate = useNavigate()

    const order = useSelector(store => store.orderModule.order)

    function onOpenDateModal() {
        setIsDateOpen(!dateSelection)
    }

    function onPrevPage() {
        return navigate(`/`)
    }

    return (
        <section className="detail-header-mobile">

            <article className='prev-page-btn' onClick={onPrevPage}>
                <img src={arrowLeftSvg} alt="" />
                <span> Homes</span>
            </article>

            <article className='wishlist-btn'>
                <WishlistIcon onWishlistIcon={onWishlistIcon} setClr={setClr} className='detail-wishlist-icon' />
            </article>

        </section>
    )
}