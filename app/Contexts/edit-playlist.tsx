'use client'

import { createContext } from 'react'

type EditPlaylistContext = {

}

export const EditPlaylistContext = createContext<EditPlaylistContext | null>(null)

export const EditPlaylistProvider: React.FC<React.PropsWithChildren> = ({ children }) => {


  return (
    <EditPlaylistContext.Provider
      value={{

      }}
    >
      {children}
    </EditPlaylistContext.Provider>
  )
}