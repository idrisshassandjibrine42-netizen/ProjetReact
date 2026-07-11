import { useState } from "react";

import img1 from "../assets/products/ambre-imperial-1.png";
import img2 from "../assets/products/ambre-imperial-2.png";
import img3 from "../assets/products/ambre-imperial-3.png";
import img4 from "../assets/hero/home-hero.webp";

const images = [img1, img2, img3, img4];

function Slider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <section>
      <div className="slider">
        <button className="prev" onClick={prevSlide}>
          ❮ next
        </button>

        <img src={images[current]} alt="" />
        <button className="next" onClick={nextSlide}>
          ❯ return
        </button>
      </div>
    </section>
  );
}

export default Slider;
