import React from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStck Developer",
];

function CategoryCarousal() {
  return (
    <>
      <div>
        <Carousel className="w-full max-w-xl mx-auto my-20">
          <CarouselContent>
            {category.map((cat, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Button variant="outline" className="rounded-full ">
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}

export default CategoryCarousal;
