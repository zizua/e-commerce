import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'

const Shop = () => {
  return (
    <div>
      {/* 6. create hero folder & files --start */}
      <Hero />
      {/* 6. create hero folder & files --end */}
      {/* 7. create popular folder & files --start */}
      <Popular />
      {/* 7. create popular folder & files --end */}
      {/* 8. create offers folder & files --start */}
      <Offers />
      {/* 8. create offers folder & files --end */}
      {/* 9. create new collections folder & files --start */}
      <NewCollections />
      {/* 9. create new collections folder & files --end */}
      {/* 10. create newsletter folder & files --start */}
      <NewsLetter />
      {/* 10. create newsletter folder & files --end */}
    </div>
  )
}

export default Shop