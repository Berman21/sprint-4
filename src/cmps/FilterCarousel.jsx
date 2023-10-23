import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { categoryImages } from '../services/category-images.service'

export function FilterCarousel() {
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1700,
      },
      items: 13,
      slidesToSlide: 6,
    },
    desktopSmall: {
      breakpoint: {
        max: 1700,
        min: 1400,
      },
      items: 13,
      slidesToSlide: 6,
    },
    tabletLarge: {
      breakpoint: {
        max: 1400,
        min: 1200,
      },
      items: 11,
      slidesToSlide: 3,
    },
    tabletMedium: {
      breakpoint: {
        max: 1200,
        min: 1000,
      },
      items: 9,
      slidesToSlide: 3,
    },
    tabletSmall: {
      breakpoint: {
        max: 1000,
        min: 800,
      },
      items: 7,
      slidesToSlide: 3,
    },
    mobileLarge: {
      breakpoint: {
        max: 800,
        min: 599,
      },
      items: 6,
      slidesToSlide: 3,
    },
    mobileMedium: {
      breakpoint: {
        max: 599,
        min: 500,
      },
      items: 4,
      slidesToSlide: 3,
    },
    mobileSmall: {
      breakpoint: {
        max: 500,
        min: 400,
      },
      items: 3,
      slidesToSlide: 2,
    },
  }

  return (
    <Carousel
      // centerMode={false}
      draggable={false}
      // partialVisible={false}
      // customLeftArrow={<CustomLeftArrow />}
      // customRightArrow={<CustomRightArrow />}
      // minimumTouchDrag={80}
      // renderArrowsWhenDisabled={false}
      // arrows
      // className='category-bar'
      // itemClass='category-item width-100-percent'
      // renderButtonGroupOutside={false}
      responsive={responsive}
      // rewind={true}
      // rtl={false}
      // slidesToSlide={1}
      swipeable={true}
      // infinite={false}
    >
      {categoryImages.map((img, index) => (
        <section key={index} className={`category-container`}>
          <img key={index} src={img.imgSrc} />
          <p className='category-label'>{img.label}</p>
        </section>
      ))}
    </Carousel>
  )
}
