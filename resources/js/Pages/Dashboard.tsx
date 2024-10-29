import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FrontendLayout from "@/Layouts/FrontendLayout";

export default function Dashboard() {
    return (
        <FrontendLayout
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Has iniciado sesión!
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
