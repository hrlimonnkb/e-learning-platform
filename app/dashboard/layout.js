"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col">
                <Topbar setIsSidebarOpen={setIsSidebarOpen} />
                
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                    {/* Page content goes here */}
                    {children}
                </main>
            </div>
        </div>
    );
}