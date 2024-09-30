import React, {ReactNode} from 'react';
import FrontendNavbar from "@/Layouts/Partials/FrontendNavbar";

function FrontendLayout({children}: { children: ReactNode }) {

    return <div>
        <FrontendNavbar/>
        {children}
    </div>
}

export default FrontendLayout;