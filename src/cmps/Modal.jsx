import { useDispatch } from 'react-redux'
import { CLOSE_APP_MODAL, REMOVE_FOCUSED_MODAL } from '../store/system.reducer'
import { DynamicCmp } from './DynamicModal'
import { useClickOutside } from '../customHooks/useCloseModule'

export function Modal({ stay, modalType, isModalActive, setIsModalActive, modalHeaderContent }) {
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
                                <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/close-btn_xugogt.svg' />
                            </button>
                            {modalHeaderContent}
                        </div>
                        <div className="modal-content">
                            <DynamicCmp stay={stay} modalType={modalType} onClose={onClose} />
                        </div>

                    </div>

                </div>
            }
        </>
    )
}