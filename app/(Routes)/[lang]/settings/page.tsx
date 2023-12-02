import { HueSwitcher, LocaleSwitcher, ThemeSwitcher } from '@/Components'

const Settings: React.FC = async () => {
  return (
    <>
      <LocaleSwitcher />
      <ThemeSwitcher />
      <HueSwitcher />
    </>
  )
}

export default Settings
