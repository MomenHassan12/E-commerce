import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider1.jpg";
import img2 from "../../assets/images/slider2.jpg";
import img3 from "../../assets/images/slider3.jpg";
import img4 from "../../assets/images/static1.jpg";
import img5 from "../../assets/images/static2.jpg";

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
        <section className="mx-auto w-full sm:w-[70%] md:w-[50%] py-10">
            <div className="flex flex-col md:flex-row justify-center items-start">
                {/* Slider Section */}
                <div className="w-full md:w-1/2 md:mb-5 lg:mb-0">
                    <Slider {...settings}>
                        <div>
                            <img
                                src={img1}
                                className="w-full sm:h-[700px] md:h-[500px] object-cover"
                                alt="Slider1"
                            />
                        </div>
                        <div>
                            <img
                                src={img2}
                                className="w-full sm:h-[700px] md:h-[500px] object-cover"
                                alt="Slider2"
                            />
                        </div>
                        <div>
                            <img
                                src={img3}
                                className="w-full sm:h-[700px] md:h-[500px] object-cover"
                                alt="Slider3"
                            />
                        </div>
                    </Slider>
                </div>

                {/* Static Images Section */}
                <div className="w-full md:w-1/2 flex flex-col ">
                    <img
                        src={img4}
                        className="w-full sm:h-[400px] md:h-[250px] object-cover"
                        alt="Static1"
                    />
                    <img
                        src={img5}
                        className="w-full sm:h-[400px] md:h-[250px] object-cover"
                        alt="Static2"
                    />
                </div>
            </div>
        </section>
    );
}
