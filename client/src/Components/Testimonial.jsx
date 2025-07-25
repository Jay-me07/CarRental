import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import {easeOut, motion} from "motion/react"

const Testimonial = () => {

    const testimonials = [
        { name: "Emma Rodriguez", 
            location: "Barcelona, Spain", 
            image: assets.testimonial_image_1, 
            testimonial: "I've rented cars from various coompanies, but the experience with CarRental was exceptional" 
        },
        { name: "John Bonnes", 
            location: "Newyork, USA", 
            image: assets.testimonial_image_2, 
            testimonial: "Car rental made my trip so much easier. The car was delivered right to my door, an the customer service was fantastic!" 
        },
        { name: "I Show Speed", 
            location: "Sydney Australia", 
            image: assets.testimonial_image_1, 
            testimonial: "I highly reccommend CarRental! Their fleet is amazing and I always feel like i'm getting the best deals with excellent services." 
        }
    ];
  return (

    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
        <Title title="What our customers say" subTitle="Discover why discerning travelers choose stayVentures for their luxury accommodations around the world" />

      <motion.div
      initial={{ opacity: 0, y: 40 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{duration: 1, delay: 0.5, ease: easeOut}} 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => ( 
                  <img key={index} src={assets.star_icon} alt="star_icon" />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonial;
