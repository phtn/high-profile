'use client'

import { animate, createDrawable, stagger } from 'animejs'
import { useCallback, useEffect, useRef, useState } from 'react'

const OUTLINE_CLASS = 'logo-outline'

// Timing: trace speed, stagger between paths, hold when complete, then advance
const DRAW_DURATION_MS = 4400
const STAGGER_MS = 640
const HOLD_AFTER_DRAW_MS = 0

type SvgPath = {
  d: string
  stroke?: string
  strokeWidth?: string
  strokeLinejoin?: 'round' | 'miter' | 'bevel'
}

type SvgSet = {
  viewBox: string
  paths: SvgPath[]
}

const SVG_SETS: SvgSet[] = [
  {
    viewBox: '0 0 32 32',
    paths: [
      {
        d: 'M15.4922 10.2737L14.4821 14.0434C16.0142 14.5588 19.2719 15.4193 19.7885 13.4913C20.3051 11.5633 17.567 10.8296 15.4922 10.2737Z'
      },
      {
        d: 'M19.7566 9.32071C22.2449 10.2497 24.0447 11.5436 23.6623 13.8568C23.3727 15.5405 22.396 16.3265 21.0673 16.5613C22.8508 17.5347 23.7202 18.9314 22.8354 21.2756C21.7345 24.2148 19.1958 24.3752 15.8224 23.648L14.9924 26.7661L13.0315 26.2434L13.8615 23.1253C13.3622 22.9846 12.8015 22.862 12.2509 22.6965L11.421 25.8146L9.46301 25.2914L10.293 22.1733L6.39263 21.0481L7.33245 18.8595C7.33245 18.8595 8.26075 19.1248 8.78235 19.2645C9.32782 19.4079 9.59052 19.0766 9.6967 18.84L11.0247 13.8428L11.9926 10.2923C12.0327 9.90554 11.892 9.39022 11.0943 9.1627C11.1472 9.13545 9.65799 8.77921 9.65799 8.77921L10.2119 6.69143L14.2319 7.76167L15.0446 4.70797L17.0686 5.24753L16.2558 8.30124C16.7783 8.42743 17.2872 8.57345 17.8081 8.71579L18.6208 5.66208L20.592 6.18749L19.7566 9.32071Z',
        stroke: 'currentColor',
        strokeLinejoin: 'round'
      },
      {
        d: 'M12.8123 20.1665C14.0762 20.5548 18.5304 22.0396 19.0843 19.8897C19.6961 17.6891 15.073 16.7678 13.8162 16.42L12.8123 20.1665Z'
      }
    ]
  },
  {
    // ETH
    viewBox: '0 0 32 32',
    paths: [
      {
        d: 'M16 27.0869L10.7285 19.0293L15.7256 22.3037C15.892 22.4127 16.108 22.4127 16.2744 22.3037L21.2705 19.0293L16 27.0869ZM22.3389 15.6748L16 19.8291L9.66016 15.6748L16 4.04492L22.3389 15.6748Z'
      }
    ]
  },
  {
    viewBox: '0 0 32 32',
    paths: [
      {
        d: 'M12.3391 27.42C12.699 27.52 12.9991 27.32 12.9991 26.94V26.92V25.9799C12.9991 25.74 12.7991 25.44 12.5591 25.36C8.73905 23.96 5.99905 20.2799 5.99905 15.9799C5.99905 11.6799 8.73905 7.99995 12.5591 6.59995C12.7991 6.51995 12.9991 6.23995 12.9991 5.97995V5.05995C12.9991 4.67995 12.699 4.45995 12.3391 4.57995C9.91846 5.35422 7.80649 6.87761 6.30799 8.93023C4.80948 10.9829 4.00195 13.4585 4.00195 15.9999C4.00195 18.5414 4.80948 21.017 6.30799 23.0697C7.80649 25.1223 9.91846 26.6457 12.3391 27.42Z'
      },
      {
        d: 'M16.5005 24C16.7805 24 17.0005 23.78 17.0005 23.5H16.9804V21.92C19.0404 21.6 20.3605 20.16 20.3605 18.38C20.3605 16.04 18.9404 15.26 16.2004 14.88C14.1604 14.58 13.7805 14.1 13.7805 13.16C13.7805 12.26 14.4604 11.62 15.7804 11.62C16.9604 11.62 17.6604 12.04 17.9404 13C18.0004 13.2 18.2005 13.36 18.4205 13.36H19.4804C19.7804 13.36 20.0005 13.08 19.9405 12.8C19.6205 11.28 18.6004 10.36 16.9804 10.08V8.47998C16.9804 8.19998 16.7604 7.97998 16.4804 7.97998H15.4804C15.2004 7.97998 14.9804 8.19998 14.9804 8.47998V10.02C13.0004 10.32 11.7205 11.62 11.7205 13.32C11.7205 15.52 13.0405 16.36 15.8405 16.74C17.7405 17.06 18.2805 17.46 18.2805 18.54C18.2805 19.62 17.3805 20.34 16.0805 20.34C14.3205 20.34 13.7605 19.6 13.5405 18.6C13.5005 18.36 13.3005 18.2 13.0605 18.2H11.9205C11.6405 18.2 11.4005 18.46 11.4605 18.74C11.7605 20.4 12.8205 21.62 15.0005 21.92V23.5C15.0005 23.78 15.2205 24 15.5005 24H16.5005Z'
      },
      {
        d: 'M19 26.94C19 27.32 19.3 27.54 19.66 27.42V27.46C24.5 25.9 28 21.38 28 16.04C28 10.7 24.5 6.15999 19.66 4.61999C19.3 4.49999 19 4.71999 19 5.09999V6.01999C19.0082 6.15409 19.0537 6.28323 19.1315 6.3928C19.2093 6.50237 19.3161 6.58799 19.44 6.63999C23.26 8.03999 26 11.72 26 16.02C26 20.32 23.26 24 19.44 25.4C19.16 25.48 19 25.74 19 26.02V26.94Z'
      }
    ]
  },
  {
    viewBox: '0 0 32 32',
    paths: [
      {
        d: 'M24.2676 11.1562L24.0205 11.0107L20.6943 9.06055L20.4414 8.91211L20.1885 9.06055L16.9229 10.9756L16.8643 11.0098L16.6152 11.1553V21.3916C16.615 21.4511 16.5996 21.5088 16.5713 21.5586C16.5429 21.6085 16.5036 21.6483 16.458 21.6748L16.4561 21.6758L11.7129 24.458C11.6644 24.4855 11.6112 24.5 11.5576 24.5C11.5037 24.5 11.4501 24.4858 11.4014 24.458L6.66016 21.6758C6.56461 21.6197 6.50013 21.511 6.5 21.3906V15.8242C6.5 15.7643 6.51554 15.7063 6.54395 15.6562C6.57233 15.6062 6.61253 15.5666 6.6582 15.54L6.65918 15.5391L11.4014 12.7568C11.45 12.7292 11.5039 12.7158 11.5576 12.7158C11.611 12.7158 11.6645 12.7295 11.7129 12.7568L13.251 13.6592V15.1191L11.8105 14.2734L11.5576 14.124L11.3047 14.2725L7.97852 16.2236L7.73145 16.3691V20.8447L7.97852 20.9893L11.3047 22.9404L11.5576 23.0889L11.8105 22.9404L15.1377 20.9893L15.3848 20.8447V10.6104C15.3848 10.5504 15.4003 10.4925 15.4287 10.4424C15.4571 10.3924 15.4964 10.3527 15.542 10.3262L15.5439 10.3252L20.2881 7.54199C20.336 7.51398 20.3893 7.5 20.4424 7.5C20.4951 7.50003 20.5481 7.51339 20.5957 7.54102V7.54199L25.3408 10.3252L25.3418 10.3262C25.3875 10.3527 25.4277 10.3924 25.4561 10.4424C25.4844 10.4925 25.5 10.5505 25.5 10.6104V16.1738C25.4995 16.2347 25.483 16.2937 25.4541 16.3447C25.4252 16.3956 25.3843 16.4364 25.3379 16.4639L20.5996 19.2432C20.5513 19.2709 20.4963 19.2861 20.4414 19.2861C20.3871 19.2861 20.3322 19.2713 20.2832 19.2432L18.75 18.3438V16.8838L20.1885 17.7275L20.4414 17.876L20.6943 17.7275L24.0205 15.7764L24.2676 15.6318V11.1562Z'
      }
    ]
  }
]

export type TracerProps = {
  onTraceStart?: VoidFunction
}

export const Tracer = ({ onTraceStart }: TracerProps = {}) => (
  <div className='size-fit md:size-64 m-auto flex items-center justify-center'>
    <Trace svgSets={SVG_SETS} onTraceStart={onTraceStart} />
  </div>
)

type TraceProps = {
  svgSets: SvgSet[]
  onTraceStart?: VoidFunction
}

const Trace = ({ svgSets, onTraceStart }: TraceProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const setNextIndex = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % svgSets.length)
  }, [svgSets.length])

  useEffect(() => {
    const drawables = createDrawable(`.${OUTLINE_CLASS}`)
    const container = containerRef.current

    if (drawables.length > 0 && container) {
      onTraceStart?.()
      animate(drawables, {
        draw: ['0 0', '0 0', '0 1', '1 1'],
        ease: 'inOutCirc',
        duration: DRAW_DURATION_MS,
        delay: stagger(STAGGER_MS),
        loop: false,
        autoplay: true,
        direction: 'normal'
      })

      animate(drawables, {
        ease: 'easeOutSine',
        duration: 600,
        delay: 0,
        loop: false,
        autoplay: true
      })

      animate(container, {
        scale: [1, 1.2, 0.8],
        ease: 'easeOutSine',
        duration: 600,
        delay: 0,
        loop: false,
        autoplay: true
      })

      const totalDrawMs = DRAW_DURATION_MS + (drawables.length - 1) * STAGGER_MS + HOLD_AFTER_DRAW_MS
      const advanceId = setTimeout(setNextIndex, totalDrawMs)
      return () => clearTimeout(advanceId)
    }
  }, [currentIndex, setNextIndex, onTraceStart])

  const currentSet = svgSets[currentIndex]
  if (!currentSet) return null

  return (
    <div ref={containerRef} className='relative inset-0 flex items-center justify-center size-full' key={currentIndex}>
      <Svg set={currentSet} />
    </div>
  )
}

type SvgProps = {
  set: SvgSet
}

const Svg = ({ set }: SvgProps) => {
  return (
    <div className='absolute flex justify-center items-center'>
      <svg
        className='md:size-40 size-20'
        viewBox={set.viewBox}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden>
        {set.paths.map((path, i) => (
          <path
            key={i}
            className={OUTLINE_CLASS}
            d={path.d}
            stroke={path.stroke ?? 'currentColor'}
            strokeWidth={path.strokeWidth ?? '1'}
            strokeLinejoin={path.strokeLinejoin ?? 'round'}
          />
        ))}
      </svg>
    </div>
  )
}
