import { SET_APP_MODAL_ABOUT, SET_APP_MODAL_AMENITIES, SET_APP_MODAL_LOGIN } from "../store/system.reducer";
import { AboutModal } from "./AboutModal";
import { AmenitiesModal } from "./AmenitiesModal";
import { Modal } from "./Modal";

export function DynamicCmp({ modalType, stay }) {

    switch (modalType) {

        case SET_APP_MODAL_LOGIN:
            return <Modal />
        case SET_APP_MODAL_ABOUT:
            return <AboutModal stay={stay} />
        case SET_APP_MODAL_AMENITIES:
            return <AmenitiesModal />

        default: return

    }

}