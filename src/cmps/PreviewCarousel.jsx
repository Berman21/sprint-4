import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

import arrowLeftSvg from '../assets/img/preview-left-arrow.svg'
import arrowRightSvg from '../assets/img/preview-right-arrow.svg'

export function PreviewCarousel({ stay }) {

    const CustomLeftArrow = ({ onClick }) => (
        <button className='custom-arrow left' onClick={onClick}  >
            <img src={arrowLeftSvg} alt="" />
        </button >
    )

    const CustomRightArrow = ({ onClick }) => (
        <button className='custom-arrow right' onClick={onClick}  >
            <img src={arrowRightSvg} alt="" />
        </button >
    )

    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1024
            },
            items: 1,
        },
        tablet: {
            breakpoint: {
                max: 1024,
                min: 464
            },
            items: 1,
        },
        mobile: {
            breakpoint: {
                max: 464,
                min: 0
            },
            items: 1,
        },
    }

    return (
        <section>

            <div
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >

                <Carousel
                    additionalTransfrom={0}
                    arrows
                    centerMode={false}
                    className='preview-image-carousel'
                    customTransition='transform 300ms ease-in-out'
                    dotListClass='dot-container'
                    draggable={false}
                    focusOnSelect={false}
                    infinite={false}
                    itemClass=''
                    minimumTouchDrag={80}
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={responsive}
                    rtl={false}
                    showDots={true}
                    sliderClass=''
                    slidesToSlide={1}
                    swipeable
                    customLeftArrow={<CustomLeftArrow />}
                    customRightArrow={<CustomRightArrow />}

                >
                    {
                        stay.imgUrls.map((img, index) =>
                            <Link key={index} to={`/stay/${stay._id}`}>
                                <img className="preview-img"
                                    src={img}
                                    alt={`stay-pic-${index}`}
                                />
                            </Link>
                        )
                    }

                </Carousel>
            </div>
        </section>
    )
}