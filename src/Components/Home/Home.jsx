import React from 'react'
import HomeSlider from '../HomeSlider/HomeSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import Products from '../Products/Products'

const Home = () => {
    return (
        <div>
            <section className="py-16">
                <div className="w-full md:w-[90%] m-auto">

                    <HomeSlider />
                    <CategorySlider />
                </div></section>
            <Products />
        </div>
    )
}

export default Home
