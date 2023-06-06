import { create } from 'zustand'
import { NextRouter } from 'next/router'

interface Store {
  router: NextRouter | null
  hasRouted: boolean
  isRouting: boolean
  activeProject: string | boolean
  activeObject: string | boolean
  aboutActive: boolean
  activeCharacter: any
  activeChildCharacter: any
  activeGroup: any
  activeSelect: boolean
  canStartAnimation: boolean
  hoverObject: boolean
  hoverProject: boolean | string
  isZoomed: boolean
  isLoaded: boolean
  isResizing: boolean
  carusellActive: boolean
  tier3done: boolean
  tier2done: boolean
  tier1done: boolean
  tier3enter: boolean
  tier2enter: boolean
  tier1enter: boolean
  playPackOpening: boolean
  introDone: boolean
  activeTier: string | boolean
  showTierLable: boolean
  packOpeningEnd: boolean
  startIntro: boolean
  playPuckIntro: boolean
  reveledPucks: string[]
  activeIndex: number
  animateIn: boolean
  allowPuckFrame: boolean
  increaseActiveIndex: () => void
  decreaseActiveIndex: () => void
  resetActiveIndex: () => void
  addReveledPucks: (title: string) => void
  playedPucks: string[]
  addPlayedPucks: (title: string) => void
  shouldReveal: boolean
}

export default create<Store>((set) => ({
  aboutActive: false,
  activeObject: false,
  activeProject: false,
  activeCharacter: false,
  activeChildCharacter: false,
  activeGroup: false,
  activeSelect: false,
  canStartAnimation: false,
  hasRouted: false,
  hoverObject: false,
  hoverProject: false,
  isLoaded: true,
  isRouting: false,
  isResizing: false,
  isZoomed: false,
  router: null,
  carusellActive: false,
  tier3done: false,
  tier2done: false,
  tier1done: false,
  tier1enter: false,
  tier2enter: false,
  tier3enter: false,
  playPackOpening: false,
  introDone: false,
  activeTier: false,
  packOpeningEnd: false,
  showTierLable: false,
  startIntro: false,
  playPuckIntro: false,
  reveledPucks: [],
  activeIndex: 0,
  shouldReveal: false,
  animateIn: false,
  allowPuckFrame: true,
  increaseActiveIndex: () =>
    set((state) => {
      return {
        ...state,
        activeIndex: state.activeIndex + 1,
      }
    }),
  decreaseActiveIndex: () =>
    set((state) => {
      return {
        ...state,
        activeIndex: state.activeIndex - 1,
      }
    }),
  resetActiveIndex: () =>
    set((state) => {
      return {
        ...state,
        activeIndex: 0,
      }
    }),
  addReveledPucks: (title: string) => {
    set((state) => ({
      reveledPucks: [...state.reveledPucks, title],
    }))
  },
  playedPucks: [],
  addPlayedPucks: (title: string) => {
    set((state) => ({
      playedPucks: [...state.playedPucks, title],
    }))
  },
}))
