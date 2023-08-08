import React from 'react'
import { Carousel } from 'react-bootstrap';
import { BannerCarouselConfig } from './banner-carousel-config';
import './banner-carousel.css';

const Bannercarousel = () => {

    const couraselList = BannerCarouselConfig;
    return (

        <Carousel>
            {
                couraselList.map((carousel , index) => (
                    <Carousel.Item key ={index}>
                    <img style={{height:"100vh",padding: "10px 50px 50px 50px"}}
                        className="d-block w-100"
                        src={carousel.imageSrc}
                        alt="First slide"
                    />
                </Carousel.Item>
                ))
            }
           
        </Carousel>

    )
}

export default Bannercarousel;
