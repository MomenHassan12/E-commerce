import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {

    async function getallCategories() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    const { data, isloading } = useQuery("CategorySlider", getallCategories)
    console.log(data)

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024, // For tablets and small desktops
                settings: {
                    slidesToShow: 4, // Show 4 slides
                },
            },
            {
                breakpoint: 768, // For tablets
                settings: {
                    slidesToShow: 3, // Show 3 slides
                },
            },
            {
                breakpoint: 480, // For mobile devices
                settings: {
                    slidesToShow: 2, // Show 2 slides
                },
            },
        ],
    };
    return (
        <>
            <section className="pb-5">

                <Slider {...settings}>
                    {data?.data.data.map(function (item, idx) {
                        return <div key={idx}>
                            <img src={item.image} className="h-[200px] w-full" alt={item.name} />
                            <h2 className=" text-2xl font-semibold" >{item.name}</h2>
                        </div>;
                    })}
                </Slider>
            </section>
        </>
    );
}