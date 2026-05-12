"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function Testimonials() {
  const scrollRef = useRef(null);

  const stories = [
    {
      title: "Chinedu Furniture",
      description:
        "How a local furniture maker expanded beyond physical customers and started receiving nationwide orders through Demand Point.",
      image: "/furniture.jpg",
    },
    {
      title: "Elite Event Center",
      description:
        "How venue owners simplified reservations, managed availability, and increased bookings using Demand Point.",
      image: "/event-center.jpg",
    },
    {
      title: "Amara Beauty Studio",
      description:
        "How beauty professionals use Demand Point to attract repeat clients and manage appointments seamlessly.",
      image: "/beauty.jpg",
    },
    {
      title: "CraftHaus",
      description:
        "How handmade product vendors reached international buyers through the marketplace ecosystem.",
      image: "/crafts.jpg",
    },
    {
      title: "Chinedu Furniture",
      description:
        "How a local furniture maker expanded beyond physical customers and started receiving nationwide orders through Demand Point.",
      image: "/furniture.jpg",
    },
    {
      title: "Elite Event Center",
      description:
        "How venue owners simplified reservations, managed availability, and increased bookings using Demand Point.",
      image: "/event-center.jpg",
    },
    {
      title: "Amara Beauty Studio",
      description:
        "How beauty professionals use Demand Point to attract repeat clients and manage appointments seamlessly.",
      image: "/beauty.jpg",
    },
    {
      title: "CraftHaus",
      description:
        "How handmade product vendors reached international buyers through the marketplace ecosystem.",
      image: "/crafts.jpg",
    },
  ];

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const amount = 360;

    scrollRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative bg-black py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-sm uppercase tracking-[0.25em] text-white/40 mb-4">
            SUCCESS STORIES
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
            Trusted by professionals, vendors & growing businesses
          </h2>

          <p className="text-white/60 text-lg leading-relaxed">
            From artisans to venue owners and product vendors, Demand Point
            empowers businesses to grow, connect with clients, and scale
            efficiently.
          </p>
        </div>

        {/* Scroll Area */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth"
        >
          {stories.map((story, index) => (
            <div
              key={index}
              className="group relative min-w-[340px] md:min-w-[340px] overflow-hidden bg-black transition-all duration-500"
            >
              {/* Visual */}
              <div className="relative h-[200px] overflow-hidden rounded-2xl bg-black cursor-pointer">
                {/* Image */}
                <img
                  src={story.image}
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* Glow */}
                <div className="absolute -bottom-20 left-10 w-60 h-60 rounded-full bg-black/30 blur-3xl" />
              </div>

              {/* Content */}
              <div className="pt-3 cursor-pointer">
                <p
                  className="text-white/70 text-sm leading-relaxed mb-8 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {story.description}
                </p>

                <button className="cursor-pointer text-white text-sm  font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  Read story →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3 mb-8 mx-auto pt-12">
          <button
            onClick={() => scroll("prev")}
            className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 hover:bg-white/[0.06] hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll("next")}
            className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 hover:bg-white/[0.06] hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
