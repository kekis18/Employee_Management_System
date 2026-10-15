import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

export default function DashboardLayout({ children }) {
    return (
        <div className="app-shell flex">
            <Sidebar />

            <div className="flex flex-1 flex-col">
                <Navbar />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </main>
            </div>
        </div>
    );
}
