import { Navbar, Sidebar } from '@/Layouts'

export const MainNav: React.FC = () => (
  <>
    {/* Mobile navbar (< 992px)*/}
    <Navbar />

    {/* Desktop sidebar (> 991px)*/}
    <Sidebar />
  </>
)