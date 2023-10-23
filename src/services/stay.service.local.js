import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

// const stay = {
//   _id: 's101',
//   name: 'Ribeira Charming Duplex',
//   type: 'House',
//   imgUrls: ['     https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200', 'otherImg.jpg'],
//   price: 80.0,
//   summary: 'Fantastic duplex apartment...',
//   capacity: 8,
//   amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
//   labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
//   host: {
//     _id: 'u101',
//     fullname: 'Davit Pok',
//     imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
//   },
//   loc: {
//     country: 'Portugal',
//     countryCode: 'PT',
//     city: 'Lisbon',
//     address: '17 Kombo st',
//     lat: -8.61308,
//     lng: 41.1413,
//   },
//   reviews: [
//     {
//       id: 'madeId',
//       txt: 'Very helpful hosts. Cooked traditional...',
//       rate: 4,
//       by: {
//         _id: 'u102',
//         fullname: 'user2',
//         imgUrl: '/img/img2.jpg',
//       },
//     },
//   ],
//   likedByUsers: ['mini-user'],
// }

const orders = [
  {
    _id: 'o1225',
    hostId: 'u102',
    buyer: {
      _id: 'u101',
      fullname: 'User 1',
    },
    totalPrice: 160,
    startDate: '2025/10/15',
    endDate: '2025/10/17',
    guests: {
      adults: 1,
      kids: 2,
    },
    stay: {
      _id: 'h102',
      name: 'House Of Uncle My',
      price: 80.0,
    },
    msgs: [],
    status: 'pending', // approved, rejected
  },
]

const users = [
  {
    _id: 'u101',
    fullname: 'User 1',
    imgUrl: '/img/img1.jpg',
    username: 'user1',
    password: 'secret',
  },
  {
    _id: 'u102',
    fullname: 'User 2',
    imgUrl: '/img/img2.jpg',
    username: 'user2',
    password: 'secret',
  },
]
// Homepage: TOP categories: Best Rate / Houses / Kitchen  - show all - link to Explore
// Renders a <StayList> with <StayPreview> with Link to <StayDetails>   url: /stay/123
// See More => /explore?topRate=true
// See More => /explore?type=House
// See More => /explore?amenities=Kitchen
// Explore page:
// stayService.query({type: 'House'})

// UserDetails
//  basic info
//  visitedStays => orderService.query({userId: 'u101'})
//  myStayOrders => orderService.query({hostId: 'u101'})
//  ownedStays => stayService.query({hostId: 'u103'})

// StayEdit - make it super easy to add Stay for development
// StayList, StayPreview
// Order, confirm Order
// Lastly: StayExplore, Filtering

// Example - figuring up if the user is an owner:
// userService.login()
//  const userStays = stayService.query({ownerId: loggeinUser._id})
//  loggeinUser.isOwner = userStays.length > 0

const STORAGE_KEY = 'stay'
_createStays()

export const stayService = {
  query,
  getById,
  save,
  remove,
  addStayMsg,
  getEmptyStay,
  getRandomStay,
}
// debug trick
window.bs = stayService

async function query(filterBy = {}) {
  var stays = await storageService.query(STORAGE_KEY)

  if (filterBy.country) {
    const regex = new RegExp(filterBy.country, 'i')
    stays = stays.filter(
      (stay) => regex.test(stay.loc.country) || regex.test(stay.loc.region) || regex.test(stay.loc.city) || regex.test(stay.description)
    )
  }
  if (filterBy.labels) {
    const regex = new RegExp(filterBy.labels, 'i')
    stays = stays.filter((stay) => regex.test(stay.labels) || regex.test(stay.description))
  }

  if (filterBy.price) {
    stays = stays.filter((stay) => stay.price <= filterBy.price)
  }
  return stays
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
  var savedStay
  if (stay._id) {
    savedStay = await storageService.put(STORAGE_KEY, stay)
  } else {
    // Later, owner is set by the backend
    stay.owner = userService.getLoggedinUser()
    savedStay = await storageService.post(STORAGE_KEY, stay)
  }
  return savedStay
}

async function addStayMsg(stayId, txt) {
  // Later, this is all done by the backend
  const stay = await getById(stayId)
  if (!stay.msgs) stay.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  stay.msgs.push(msg)
  await storageService.put(STORAGE_KEY, stay)

  return msg
}

function getEmptyStay() {
  return {
    id: '',
    name: '',
    type: 'house',
    price: '50',
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Lisbon',
      address: '17 Kombo st',
      lat: -8.61308,
      lng: 41.1413,
    },
  }
}

function getRandomStay() {
  let stays = utilService.loadFromStorage(STORAGE_KEY)
  let stay = {
    _id: '',
    name: 'Ribeira Charming Duplex',
    type: 'House',
    imgUrls: [
      'https://a0.muscache.com/im/pictures/678e2242-04a0-4dad-8e1e-38517515923b.jpg?im_w=720',
      'https://a0.muscache.com/im/pictures/864acb40-bdaa-49f3-8568-9231aaaf0af9.jpg?im_w=720',
      'https://a0.muscache.com/im/pictures/1a6aa4c3-7a52-4c1e-b076-e596469e6a80.jpg?im_w=720',
      'https://a0.muscache.com/im/pictures/8bc19657-215d-4e4a-9bf7-b585154acc41.jpg?im_w=720',
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-14992070/original/ae3d0fb7-de50-46db-b2c3-2eb6351dfa22.jpeg?im_w=720',
    ],
    price: utilService.getRandomIntInclusive(100, 1000),
    summary: 'Hospitality Expert NSF: Private Pool, Beach, Chef',
    capacity: utilService.getRandomIntInclusive(1, 8),
    amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
      _id: 'u101',
      fullname: 'Davit Pok',
      imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Jamaica',
      countryCode: 'PT',
      city: 'Montego Bay',
      address: '17 Kombo st',
      lat: -8.61308,
      lng: 41.1413,
    },
    reviews: [
      {
        id: 'madeId',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: utilService.getRandomIntInclusive(1, 5),
        by: {
          _id: 'u102',
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user'],
  }
  stays.push(stay)
  return stays
}

function createStay() {
  return (stay = {
    _id: utilService.makeId(),
    name: 'Ribeira Charming Duplex',
    type: 'House',
    imgUrls: [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
      'otherImg.jpg',
    ],
    price: utilService.getRandomIntInclusive(100, 1000),
    summary: 'Fantastic duplex apartment...',
    capacity: utilService.getRandomIntInclusive(1, 8),
    amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
      _id: 'u101',
      fullname: 'Davit Pok',
      imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Lisbon',
      address: '17 Kombo st',
      lat: -8.61308,
      lng: 41.1413,
    },
    reviews: [
      {
        id: 'madeId',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: utilService.getRandomIntInclusive(1, 5),
        by: {
          _id: 'u102',
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user'],
  })
}

function _createStays() {
  let stays = utilService.loadFromStorage(STORAGE_KEY)
  if (!stays || !stays.length) {
    stays = [
      {
        _id: utilService.makeId(),
        name: 'Hospitality Expert NSF: Private Pool, Beach, Chef',
        type: 'Villa',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/678e2242-04a0-4dad-8e1e-38517515923b.jpg?im_w=720',
          'https://a0.muscache.com/im/pictures/864acb40-bdaa-49f3-8568-9231aaaf0af9.jpg?im_w=720',
          'https://a0.muscache.com/im/pictures/1a6aa4c3-7a52-4c1e-b076-e596469e6a80.jpg?im_w=720',
          'https://a0.muscache.com/im/pictures/8bc19657-215d-4e4a-9bf7-b585154acc41.jpg?im_w=720',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-14992070/original/ae3d0fb7-de50-46db-b2c3-2eb6351dfa22.jpeg?im_w=720',
        ],
        price: utilService.getRandomIntInclusive(100, 1000),
        summary: `Nianna is part of one of the most glamorous private homes overlooking golf courses and vast ocean vista.
         The view is breathtaking ~ the deep blue sea to the north and magnificent lush vegetation to the south,
         both endorsing a great feeling of calm and relaxation.
         Furnishings are an exquisite combination of Asian antique and tropical colonial.
         Head to the Rose Hall Beach Club and you can enjoy the white sand beach, swimming pool, bar and grill and free WiFi.`,
        capacity: utilService.getRandomIntInclusive(1, 8),
        amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
        labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        host: {
          _id: 'u101',
          fullname: 'Davit Pok',
          imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        loc: {
          region: 'Middle East',
          country: 'Jamaica',
          countryCode: 'JM',
          city: 'Montego Bay',
          address: '17 Kombo st',
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: 'madeId',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: utilService.getRandomIntInclusive(1, 5),
            by: {
              _id: 'u102',
              fullname: 'user2',
              imgUrl: '/img/img2.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: utilService.makeId(),
        name: 'Ribeira Charming Duplex',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
        ],
        price: utilService.getRandomIntInclusive(100, 1000),
        summary: 'Fantastic duplex apartment...',
        capacity: utilService.getRandomIntInclusive(1, 8),
        amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
        labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        host: {
          _id: 'u101',
          fullname: 'Davit Pok',
          imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        loc: {
          region: 'Italy',
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Lisbon',
          address: '17 Kombo st',
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: 'madeId',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: utilService.getRandomIntInclusive(1, 5),
            by: {
              _id: 'u102',
              fullname: 'user2',
              imgUrl: '/img/img2.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: utilService.makeId(),
        name: 'Ribeira Charming Duplex',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
        ],
        price: utilService.getRandomIntInclusive(100, 1000),
        summary: 'Fantastic duplex apartment...',
        capacity: utilService.getRandomIntInclusive(1, 8),
        amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
        labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        host: {
          _id: 'u101',
          fullname: 'Davit Pok',
          imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Lisbon',
          address: '17 Kombo st',
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: 'madeId',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: utilService.getRandomIntInclusive(1, 5),
            by: {
              _id: 'u102',
              fullname: 'user2',
              imgUrl: '/img/img2.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: utilService.makeId(),
        name: 'Ribeira Charming Duplex',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'otherImg.jpg',
        ],
        price: utilService.getRandomIntInclusive(100, 1000),
        summary: 'Fantastic duplex apartment...',
        capacity: utilService.getRandomIntInclusive(1, 8),
        amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
        labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        host: {
          _id: 'u101',
          fullname: 'Davit Pok',
          imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Lisbon',
          address: '17 Kombo st',
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: 'madeId',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: utilService.getRandomIntInclusive(1, 5),
            by: {
              _id: 'u102',
              fullname: 'user2',
              imgUrl: '/img/img2.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: utilService.makeId(),
        name: 'Ribeira Charming Duplex',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'otherImg.jpg',
        ],
        price: utilService.getRandomIntInclusive(100, 1000),
        summary: 'Fantastic duplex apartment...',
        capacity: utilService.getRandomIntInclusive(1, 8),
        amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
        labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        host: {
          _id: 'u101',
          fullname: 'Davit Pok',
          imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Lisbon',
          address: '17 Kombo st',
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: 'madeId',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: utilService.getRandomIntInclusive(1, 5),
            by: {
              _id: 'u102',
              fullname: 'user2',
              imgUrl: '/img/img2.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: utilService.makeId(),
        name: 'Ribeira Charming Duplex',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'otherImg.jpg',
        ],
        price: utilService.getRandomIntInclusive(100, 1000),
        summary: 'Fantastic duplex apartment...',
        capacity: utilService.getRandomIntInclusive(1, 8),
        amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
        labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        host: {
          _id: 'u101',
          fullname: 'Davit Pok',
          imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Lisbon',
          address: '17 Kombo st',
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: 'madeId',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: utilService.getRandomIntInclusive(1, 5),
            by: {
              _id: 'u102',
              fullname: 'user2',
              imgUrl: '/img/img2.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: utilService.makeId(),
        name: 'Ribeira Charming Duplex',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'otherImg.jpg',
        ],
        price: utilService.getRandomIntInclusive(100, 1000),
        summary: 'Fantastic duplex apartment...',
        capacity: utilService.getRandomIntInclusive(1, 8),
        amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
        labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        host: {
          _id: 'u101',
          fullname: 'Davit Pok',
          imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Lisbon',
          address: '17 Kombo st',
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: 'madeId',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: utilService.getRandomIntInclusive(1, 5),
            by: {
              _id: 'u102',
              fullname: 'user2',
              imgUrl: '/img/img2.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: utilService.makeId(),
        name: 'Ribeira Charming Duplex',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'otherImg.jpg',
        ],
        price: utilService.getRandomIntInclusive(100, 1000),
        summary: 'Fantastic duplex apartment...',
        capacity: utilService.getRandomIntInclusive(1, 8),
        amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
        labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        host: {
          _id: 'u101',
          fullname: 'Davit Pok',
          imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Lisbon',
          address: '17 Kombo st',
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: 'madeId',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: utilService.getRandomIntInclusive(1, 5),
            by: {
              _id: 'u102',
              fullname: 'user2',
              imgUrl: '/img/img2.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: utilService.makeId(),
        name: 'Ribeira Charming Duplex',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'otherImg.jpg',
        ],
        price: utilService.getRandomIntInclusive(100, 1000),
        summary: 'Fantastic duplex apartment...',
        capacity: utilService.getRandomIntInclusive(1, 8),
        amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
        labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        host: {
          _id: 'u101',
          fullname: 'Davit Pok',
          imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Lisbon',
          address: '17 Kombo st',
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: 'madeId',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: utilService.getRandomIntInclusive(1, 5),
            by: {
              _id: 'u102',
              fullname: 'user2',
              imgUrl: '/img/img2.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: utilService.makeId(),
        name: 'Ribeira Charming Duplex',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'otherImg.jpg',
        ],
        price: utilService.getRandomIntInclusive(100, 1000),
        summary: 'Fantastic duplex apartment...',
        capacity: utilService.getRandomIntInclusive(1, 8),
        amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
        labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        host: {
          _id: 'u101',
          fullname: 'Davit Pok',
          imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Lisbon',
          address: '17 Kombo st',
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: 'madeId',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: utilService.getRandomIntInclusive(1, 5),
            by: {
              _id: 'u102',
              fullname: 'user2',
              imgUrl: '/img/img2.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: utilService.makeId(),
        name: 'Ribeira Charming Duplex',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'otherImg.jpg',
        ],
        price: utilService.getRandomIntInclusive(100, 1000),
        summary: 'Fantastic duplex apartment...',
        capacity: utilService.getRandomIntInclusive(1, 8),
        amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
        labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        host: {
          _id: 'u101',
          fullname: 'Davit Pok',
          imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Lisbon',
          address: '17 Kombo st',
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: 'madeId',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: utilService.getRandomIntInclusive(1, 5),
            by: {
              _id: 'u102',
              fullname: 'user2',
              imgUrl: '/img/img2.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
      {
        _id: utilService.makeId(),
        name: 'Ribeira Charming Duplex',
        type: 'House',
        imgUrls: [
          'https://a0.muscache.com/im/pictures/prohost-api/Hosting-923567396711072416/original/b3fa79d4-1900-4969-ad45-060e43d8b5b5.jpeg?im_w=1200',
          'otherImg.jpg',
        ],
        price: utilService.getRandomIntInclusive(100, 1000),
        summary: 'Fantastic duplex apartment...',
        capacity: utilService.getRandomIntInclusive(1, 8),
        amenities: ['TV', 'Wifi', 'Kitchen', 'Pool view', 'Bathtub', 'Fire pit'],
        labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        host: {
          _id: 'u101',
          fullname: 'Davit Pok',
          imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        loc: {
          country: 'Portugal',
          countryCode: 'PT',
          city: 'Lisbon',
          address: '17 Kombo st',
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: 'madeId',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: utilService.getRandomIntInclusive(1, 5),
            by: {
              _id: 'u102',
              fullname: 'user2',
              imgUrl: '/img/img2.jpg',
            },
          },
        ],
        likedByUsers: ['mini-user'],
      },
    ]
    utilService.saveToStorage(STORAGE_KEY, stays)
  }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {title: 'Jira G', price: 980}).then(x => console.log(x))
