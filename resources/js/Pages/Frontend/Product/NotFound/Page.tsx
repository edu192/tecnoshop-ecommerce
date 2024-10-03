import React from 'react';
import FrontendLayout from "@/Layouts/FrontendLayout";

function Page({search}:{search:string}) {
    return (
        <FrontendLayout>
            <div className="mt-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className=''>
                       <h2 className='text-5xl text-center'>No se encontraron productos</h2>
                        <p className='text-2xl text-center '>
                            "{search}"
                        </p>
                    </div>

                </div>
            </div>
        </FrontendLayout>
    );
}

export default Page;