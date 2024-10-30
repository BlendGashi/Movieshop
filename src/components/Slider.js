import React from 'react';
import Slides from "../data/Slides";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';


function slider() {
  return (
    <Carousel> 
      { Slides && Slides.map(slide => <Carousel.Item key={slide.id}><Image src={slide.src} alt={slide.alt} /></Carousel.Item>) }
      </Carousel>
  )
}

export default slider