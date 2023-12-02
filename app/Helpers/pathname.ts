export const getPathnameWithoutLocale = (currentPathname: string) => {
  if (!currentPathname) {
    return '/'
  }

  const pathnameWithoutLocale = currentPathname.substring(3)
  
  if (pathnameWithoutLocale === '') {
    return '/'
  }
  
  return pathnameWithoutLocale
}
