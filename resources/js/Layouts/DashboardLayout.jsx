import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1">
                <Navbar />

                <main className="p-6">
                    {children}
                </main>
            </div>

        </div>
    );
}
