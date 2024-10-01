import React from 'react';
import FrontendLayout from "@/Layouts/FrontendLayout";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/shadcn-ui/carousel"
import SmartphonesImage from "../../../img/falabella-home-smartphones.png";
import LaptopsImage from "../../../img/falabella-home-laptops.png";
import {Button} from "@/shadcn-ui/button";
import CategoryData = App.Data.CategoryData;

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

function CategoryCard({name, image, link}: { name: string, image: string, link: string }) {
    return <div className='bg-gray-100 shadow'>
        <div className='text-center p-2'>
            <h3 className='text-lg font-semibold'>{name}</h3>
        </div>
        <img src={image} alt="" className='aspect-square  border-2 border-gray-500'/>
        <div className="flex justify-center my-2">
            <Button>
                Ver productos
            </Button>
        </div>
    </div>
}

function Home({categories}: { categories: CategoryData[] }) {
    console.log(categories);
    return (
        <FrontendLayout>
            <CarouselSection/>

            <div className="mt-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='grid grid-cols-4 gap-4'>
                        {categories.map((category, index) => (

                            <CategoryCard name={category.name} image={category.image as string}
                                          link={route('home')}/>
                        ))}
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}

export default Home;