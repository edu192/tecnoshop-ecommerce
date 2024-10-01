import React from 'react';
import FrontendLayout from "@/Layouts/FrontendLayout";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/shadcn-ui/carousel"
import SmartphonesImage from "../../../img/falabella-home-smartphones.png";
import LaptopsImage from "../../../img/falabella-home-laptops.png";
import LaptopsCategoryImage from "../../../img/laptops-category-image.png";
import TvsCategoryImage from "../../../img/tvs-category-image.png";
import SmartphonesCategoryImage from "../../../img/smartphones-category-image.png";
import CamerasCategoryImage from "../../../img/cameras-category-image.png";
import {Button} from "@/shadcn-ui/button";

function CarouselSection() {
    return <div className="">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Carousel>
                <CarouselContent>
                    <CarouselItem>
                        <img src={SmartphonesImage as string} alt=""/>
                    </CarouselItem>
                    <CarouselItem>
                        <img src={LaptopsImage as string} alt=""/>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    </div>
}

function Home() {
    return (
        <FrontendLayout>
            <CarouselSection/>

            <div className="mt-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='grid grid-cols-4 gap-4'>
                        <div className='bg-gray-100 shadow'>
                            <img src={LaptopsCategoryImage as string} alt="" className='aspect-square  border-2 border-gray-500'/>
                            <div className="flex justify-center my-2">
                                <Button>
                                    Ver productos
                                </Button>
                            </div>
                        </div>

                        <div className='bg-gray-100 shadow'>
                            <img src={SmartphonesCategoryImage as string} alt="" className='aspect-square  border-2 border-gray-500'/>
                            <div className="flex justify-center my-2">
                                <Button>
                                    Ver productos
                                </Button>
                            </div>
                        </div>

                        <div className='bg-gray-100 shadow'>
                            <img src={TvsCategoryImage as string} alt="" className='aspect-square   border-2 border-gray-500'/>
                 <div className="flex justify-center my-2">
                                <Button>
                                    Ver productos
                                </Button>
                            </div>
                        </div>

                        <div className='bg-gray-100 shadow'>
                            <img src={CamerasCategoryImage as string} alt="" className='aspect-square  border-2 border-gray-500'/>
                            <div className="flex justify-center my-2">
                                <Button>
                                    Ver productos
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}

export default Home;