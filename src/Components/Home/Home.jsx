import React from 'react'
import CategorySlider from '../CategorySlider/CategorySlider'
import Products from '../Products/Products'
import HomeSlider from '../HomeSlider/HomeSlider'

const Home = () => {
    return (
        <div>
            <section className="">
                <div className="w-full md:w-[90%] m-auto">
                    <HomeSlider />
                    <CategorySlider />
                </div>
            </section>
            <Products />
        </div>
    )
}

export default Home
