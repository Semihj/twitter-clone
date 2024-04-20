import { SupabaseClient } from '@supabase/supabase-js'
import { createStore } from 'zustand/vanilla'
import { Database } from '../supabase.types'

export type UserState = {
  currentUser: any,
}

export type UserActions = {
  signInUser: (data:any) => void
  logOutUser: () => void
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
  currentUser:null,
}

export const createUserStore = (
  initState: UserState = defaultInitState,
) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    signInUser: (data:any) => set((state) => ({ currentUser:data })),
    logOutUser: () => set((state) => ({ currentUser: null})),
    
  }))
}