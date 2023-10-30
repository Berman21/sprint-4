import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { categoryImages } from '../services/category-images.service'
import leftArrow from '../assets/img/left-arrow.svg'
import rightArrow from '../assets/img/right-arrow.svg'
import { useEffect, useState } from 'react'
import { SET_FILTER_BY } from '../store/stay.reducer'
import { useDispatch } from 'react-redux'
import { updateFilterBy } from '../store/stay.actions'

export function FilterCarousel({ filterBy, filterByToEdit, setFilterByToEdit }) {
  const [selectedCategory, setSelectedCategory] = useState({ labels: '', ...filterBy })
  const dispatch = useDispatch()

  // useEffect(() => {
  //   onSetFilter(filterByToEdit)
  // }, [filterByToEdit])

  function handleClick(ev, label) {
    ev.preventDefault()
    setSelectedCategory(label)
    setFilterByToEdit((prevFilter) => ({
      ...prevFilter,
      labels: label,
    }));
    updateFilterBy({ labels: label })

  }

  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy })
  }

  const CustomLeftArrow = ({ onClick }) => (
    <section className='custom-arrow-container left'>
      <button className='custom-arrow left' onClick={onClick}>
        <img src={leftArrow} />
      </button>
    </section>
  )

  const CustomRightArrow = ({ onClick }) => (
    <section className='custom-arrow-container right'>
      <button className='custom-arrow right' onClick={onClick}>
        <img src={rightArrow} />
      </button>
    </section>
  )

  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1550,
      },
      items: 13,
      slidesToSlide: 9,
    },
    desktopSmall: {
      breakpoint: {
        max: 1550,
        min: 1400,
      },
      items: 12,
      slidesToSlide: 8,
    },
    tabletLarge: {
      breakpoint: {
        max: 1400,
        min: 1200,
      },
      items: 11,
      slidesToSlide: 7,
    },
    tabletMedium: {
      breakpoint: {
        max: 1200,
        min: 1000,
      },
      items: 9,
      slidesToSlide: 6,
    },
    tabletSmall: {
      breakpoint: {
        max: 1000,
        min: 800,
      },
      items: 7,
      slidesToSlide: 5,
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
      draggable={false}
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
      minimumTouchDrag={80}
      renderArrowsWhenDisabled={false}
      className='category-bar'
      itemClass='category-item width-100-percent'
      responsive={responsive}
      swipeable={true}
    >
      {categoryImages.map((img, index) => (
        <section
          key={index}
          onClick={(ev) => handleClick(ev, img.label)}
          className={`category-container${selectedCategory === img.label ? ' active' : ''}`}
        >
          <img key={index} src={img.imgSrc} />
          <label>
            <span className='category-label'>{img.label}</span>
          </label>
        </section>
      ))}
    </Carousel>
  )
}
