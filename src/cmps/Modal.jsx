import { useDispatch } from 'react-redux'
import closeBtn from '../assets/img/close-btn.svg'
import { CLOSE_APP_MODAL, REMOVE_FOCUSED_MODAL } from '../store/system.reducer'
import { DynamicCmp } from './DynamicModal'
import { useClickOutside } from '../customHooks/useCloseModule'

export function Modal({ stay, modalType, isModalActive, setIsModalActive }) {
    const modalRef = useClickOutside(onModalClickOutside)
    const dispatch = useDispatch()

    function onModalClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsModalActive(false);
        }
    }

    function onModalClick(event) {
        event.stopPropagation()
    }

    function onClose() {
        dispatch({ type: CLOSE_APP_MODAL })
        dispatch({ type: REMOVE_FOCUSED_MODAL })
        setIsModalActive(false)
        document.body.classList.remove('modal-open')
    }

    return (
        <>
            {isModalActive &&
                <div className="modal-container" onClick={onClose}>

                    <div className="modal" onClick={onModalClick}>
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