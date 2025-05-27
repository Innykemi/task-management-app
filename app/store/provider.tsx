'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from './index'

export const store = makeStore()

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
