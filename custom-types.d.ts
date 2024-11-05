import {ReactNode} from 'react'

declare module 'react-native-swipe-list-view' {
  interface IPropsSwipeRow<T> {
    children: ReactNode
  }
}