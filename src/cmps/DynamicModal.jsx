import { SET_APP_MODAL_ABOUT, SET_APP_MODAL_AMENITIES, SET_APP_MODAL_LOGIN, SET_APP_MODAL_REVIEWS } from "../store/system.reducer";
import { AboutModal } from "./AboutModal";
import { AmenitiesModal } from "./AmenitiesModal";
import { Modal } from "./Modal";
import { ReviewsModal } from "./ReviewsModal";

export function DynamicCmp({ modalType, stay }) {

    switch (modalType) {

        case SET_APP_MODAL_LOGIN:
            return <Modal />
        case SET_APP_MODAL_ABOUT:
            return <AboutModal stay={stay} />
        case SET_APP_MODAL_AMENITIES:
            return <AmenitiesModal stay={stay} />
        case SET_APP_MODAL_REVIEWS:
            return <ReviewsModal stay={stay} />

        default: return

    }

}