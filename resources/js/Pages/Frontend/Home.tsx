import React from 'react';
import FrontendLayout from "@/Layouts/FrontendLayout";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/shadcn-ui/carousel"
import SmartphonesImage from "../../../img/falabella-home-smartphones.png";
import LaptopsImage from "../../../img/falabella-home-laptops.png";
import {Button} from "@/shadcn-ui/button";
import CategoryData = App.Data.CategoryData;
import {router} from "@inertiajs/react";

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

function CategoryCard({name, image, id}: { name: string, image: string, id:number}) {
    return <div className='bg-gray-100 shadow'>
        <div className='text-center p-2'>
            <h3 className='text-lg font-semibold'>{name}</h3>
        </div>
        <img src={image} alt="" className='aspect-square  border-2 border-gray-500'/>
        <div className="flex justify-center my-2">
            <Button onClick={()=>router.visit(route('category.index',id))}>
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

                            <CategoryCard id={category.id} name={category.name} image={category.image as string}
                                           />
                        ))}
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}

export default Home;