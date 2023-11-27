import { HueSwitcher, Input, LocaleSwitcher, ThemeSwitcher } from '@/Components'

const Settings: React.FC = () => {
  return (
    <>
      <LocaleSwitcher />
      <ThemeSwitcher />
      <HueSwitcher />
    </>
  )
}

export default Settings
