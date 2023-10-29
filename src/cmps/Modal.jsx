import { useDispatch, useSelector } from 'react-redux'
import closeBtn from '../assets/img/close-btn.svg'
import { CLOSE_APP_MODAL, REMOVE_FOCUSED_MODAL } from '../store/system.reducer'
import { DynamicCmp } from './DynamicModal'
import { useClickOutside } from '../customHooks/useCloseModule'
import { useState } from 'react'

export function Modal({ stay, modalType, isModalActive, setIsModalActive }) {
    const modalRef = useClickOutside(onModalClickOutside)
    const dispatch = useDispatch()

    function onModalClickOutside() {
        setIsModalActive(false)
    }

    function onClose() {
        // ev.preventDefault()
        // ev.stopPropagation()
        dispatch({ type: CLOSE_APP_MODAL })
        dispatch({ type: REMOVE_FOCUSED_MODAL })
        setIsModalActive(false)
        document.body.classList.remove('modal-open')
    }

    return (
        <>
            {isModalActive &&
                <div className="modal-container" >

                    <div className="modal">
                        <div className="modal-header">
                            <button className='modal-close-btn' onClick={onClose}>
                                <img src={closeBtn} />
                            </button>
                        </div>
                        <div className="modal-content">
                            <DynamicCmp stay={stay} modalType={modalType} />
                        </div>

                    </div>

                </div>
            }
        </>
    )
}