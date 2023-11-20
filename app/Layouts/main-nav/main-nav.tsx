import { Navbar, Sidebar } from '@/Layouts'

export const MainNav: React.FC = () => (
  <>
    {/* Mobile navbar */}
    <Navbar />

    {/* Desktop sidebar */}
    <Sidebar />
  </>
)