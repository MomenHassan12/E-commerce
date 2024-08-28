import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider1.jpg"
import img2 from "../../assets/images/slider2.jpg"
import img3 from "../../assets/images/slider3.jpg"
import img4 from "../../assets/images/static1.jpg"
import img5 from "../../assets/images/static2.jpg"

export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,

    };
    return (
        <>
            <section className="mx-auto md:w-[50%] sm:w-[80%] pb-5">
                <div className="flex flex-wrap justify-center items-start">
                    <div className="sm:w-full md:w-1/2 sm:py-5 md:py-0">

                        <Slider {...settings}>
                            <div>
                                <img src={img1} className="w-[100%] h-[500px]" alt="Slider1" />
                            </div>
                            <div>
                                <img src={img2} className="w-[100%] h-[500px]" alt="Slider2" />
                            </div><div>
                                <img src={img3} className="w-[100%] h-[500px]" alt="Slider3" />
                            </div>
                        </Slider>
                    </div>
                    <div className="sm:w-full md:w-1/2 sm:mt-10 md:mt-0">
                        <img src={img4} className="w-full md:h-[250px] sm:h-[500px]" alt="img1" />
                        <img src={img5} className="w-full md:h-[250px] sm:h-[500px]" alt="img2" />
                    </div>
                </div>
            </section>
        </>
    );
}