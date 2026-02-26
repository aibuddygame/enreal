import { useEffect, useRef, useState } from 'react'

/**
 * CustomCursor — ported from TypeScript to JSX for this React + Vite project.
 *
 * cursorType: "arrow-pointer" | "big-circle" | "ring-dot" |
 *             "circle-and-dot" | "glitch-effect" | "motion-blur"
 */
export function CustomCursor({
    cursorType = 'circle-and-dot',
    color = '#2563EB',        // Enreal AI signal blue
    size = 18,
    glitchColorB = '#00feff',
    glitchColorR = '#ff4f71',
}) {
    const cursorRef = useRef(null)
    const filterRef = useRef(null)

    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [fading, setFading] = useState(false)

    const state = useRef({
        distanceX: 0, distanceY: 0, distance: 0,
        pointerX: 0, pointerY: 0,
        previousPointerX: 0, previousPointerY: 0,
        angle: 0, previousAngle: 0, angleDisplace: 0,
        degrees: 57.296,
        fadingTimer: null,
    })

    useEffect(() => {
        // Only hide native cursor on non-touch (desktop) devices
        const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
        if (!isTouch) document.body.style.cursor = 'none'

        const onMove = (e) => {
            const s = state.current
            s.previousPointerX = s.pointerX
            s.previousPointerY = s.pointerY
            // Use clientX/Y — correct for position:fixed elements (scroll-independent)
            s.pointerX = e.clientX
            s.pointerY = e.clientY
            s.distanceX = s.previousPointerX - s.pointerX
            s.distanceY = s.previousPointerY - s.pointerY
            s.distance = Math.sqrt(s.distanceY ** 2 + s.distanceX ** 2)

            setPosition({ x: e.clientX, y: e.clientY })

            const t = e.target
            const interactive =
                t.tagName === 'A' || t.tagName === 'BUTTON' ||
                t.onclick !== null || t.classList.contains('cursor-hover') ||
                t.closest('button') || t.closest('a') || t.closest('[role="button"]')
            setIsHovering(!!interactive)

            if (!isVisible) setIsVisible(true)

            // Fading pulse for circle-and-dot trail dot
            if (s.distance > 1) {
                clearTimeout(s.fadingTimer)
                setFading(true)
                s.fadingTimer = setTimeout(() => setFading(false), 50)
            }
        }

        const onEnter = () => setIsVisible(true)
        const onLeave = () => setIsVisible(false)
        const onClick = () => {
            if (cursorRef.current) {
                cursorRef.current.style.transform += ' scale(0.75)'
                setTimeout(() => {
                    if (cursorRef.current)
                        cursorRef.current.style.transform =
                            cursorRef.current.style.transform.replace(' scale(0.75)', '')
                }, 35)
            }
        }

        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseenter', onEnter)
        document.addEventListener('mouseleave', onLeave)
        document.addEventListener('click', onClick)
        return () => {
            document.body.style.cursor = 'auto'
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseenter', onEnter)
            document.removeEventListener('mouseleave', onLeave)
            document.removeEventListener('click', onClick)
        }
    }, []) // eslint-disable-line

    // ── Rotation tracking ──────────────────────────────────────
    const calcRotation = () => {
        const s = state.current
        if (s.distance <= 1) return s.angleDisplace
        const ua = Math.atan(Math.abs(s.distanceY) / Math.abs(s.distanceX)) * s.degrees
        s.previousAngle = s.angle
        if (s.distanceX <= 0 && s.distanceY >= 0) s.angle = 90 - ua
        else if (s.distanceX < 0 && s.distanceY < 0) s.angle = ua + 90
        else if (s.distanceX >= 0 && s.distanceY <= 0) s.angle = 90 - ua + 180
        else if (s.distanceX > 0 && s.distanceY > 0) s.angle = ua + 270
        if (isNaN(s.angle)) { s.angle = s.previousAngle }
        else {
            const diff = s.angle - s.previousAngle
            if (diff <= -270) s.angleDisplace += 360 + diff
            else if (diff >= 270) s.angleDisplace += diff - 360
            else s.angleDisplace += diff
        }
        return s.angleDisplace
    }

    // ── Shared base style ──────────────────────────────────────
    const base = {
        position: 'fixed', top: 0, left: 0,
        zIndex: 2147483647,
        pointerEvents: 'none',
        userSelect: 'none',
        opacity: isVisible ? 1 : 0,
        transition: '250ms, transform 100ms',
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    }

    // ── Renderers ──────────────────────────────────────────────
    const renderArrowPointer = () => {
        const rot = calcRotation()
        return (
            <div ref={cursorRef} style={{
                ...base, width: size, height: size,
                transform: `translate3d(${position.x - size / 2}px, ${position.y}px, 0) rotate(${rot}deg)`
            }}>
                <svg viewBox="0 0 32 32" style={{ width: '100%', height: '100%' }}>
                    <path d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" fill="#F2F5F8" />
                    <path d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" fill={color} />
                </svg>
            </div>
        )
    }

    const renderBigCircle = () => {
        const cs = size * 2.5
        return (<>
            <div style={{
                ...base, width: cs, height: cs, backgroundColor: 'transparent', borderRadius: '50%',
                backdropFilter: 'invert(0.85) grayscale(1)',
                transform: `translate3d(${position.x - cs / 2}px,${position.y - cs / 2}px,0) ${isHovering ? 'scale(2.5)' : 'scale(1)'}`
            }} />
            <div style={{
                ...base, width: 6, height: 6, backgroundColor: 'transparent', borderRadius: '50%',
                backdropFilter: 'invert(1)',
                transform: `translate3d(${position.x - 3}px,${position.y - 3}px,0)`
            }} />
        </>)
    }

    const renderRingDot = () => {
        const hs = isHovering ? 40 : size
        return (
            <div ref={cursorRef} style={{
                ...base, display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: hs, height: hs, backgroundColor: 'transparent',
                boxShadow: `0 0 0 1.25px ${color}, 0 0 0 2.25px #edf370`,
                borderRadius: '50%',
                transform: `translate3d(${position.x - hs / 2}px,${position.y - hs / 2}px,0)`
            }}>
                <div style={{ width: 4, height: 4, backgroundColor: color, boxShadow: '0 0 0 1px #edf370', borderRadius: '50%' }} />
            </div>
        )
    }

    const renderCircleAndDot = () => {
        const rot = calcRotation()
        const s = state.current
        return (
            <div ref={cursorRef} style={{
                ...base, width: size, height: size, backgroundColor: 'transparent',
                border: isHovering ? `10px solid ${color}` : `1.25px solid ${color}`,
                borderRadius: '50%',
                boxShadow: `0 ${-15 - s.distance}px 0 -8px ${color}${fading ? '00' : ''}`,
                transform: `translate3d(${position.x - size / 2}px,${position.y - size / 2}px,0) rotate(${rot}deg)`
            }} />
        )
    }

    const renderGlitchEffect = () => {
        const s = state.current
        const dx = Math.min(Math.max(s.distanceX, -10), 10)
        const dy = Math.min(Math.max(s.distanceY, -10), 10)
        const cs = isHovering ? 30 : 15
        return (
            <div ref={cursorRef} style={{
                ...base, width: cs, height: cs, backgroundColor: '#222', borderRadius: '50%',
                backdropFilter: 'invert(1)',
                boxShadow: `${dx}px ${dy}px 0 ${glitchColorB}, ${-dx}px ${-dy}px 0 ${glitchColorR}`,
                transform: `translate3d(${position.x - cs / 2}px,${position.y - cs / 2}px,0)`
            }} />
        )
    }

    const renderMotionBlur = () => {
        const s = state.current
        const dx = Math.min(Math.max(s.distanceX, -20), 20)
        const dy = Math.min(Math.max(s.distanceY, -20), 20)
        const ua = Math.atan(Math.abs(dy) / Math.abs(dx)) * s.degrees
        let angle = 0, stdDeviation = '0, 0'
        if (!isNaN(ua)) {
            if (ua <= 45) { angle = dx * dy >= 0 ? ua : -ua; stdDeviation = `${Math.abs(dx / 2)}, 0` }
            else { angle = dx * dy <= 0 ? 180 - ua : ua; stdDeviation = `${Math.abs(dy / 2)}, 0` }
        }
        return (
            <svg ref={cursorRef} style={{
                ...base, width: size, height: size, borderRadius: '50%', overflow: 'visible',
                transform: `translate3d(${position.x - size / 2}px,${position.y - size / 2}px,0) rotate(${angle}deg)`
            }}>
                <defs><filter id="cur-mb" x="-100%" y="-100%" width="400%" height="400%">
                    <feGaussianBlur ref={filterRef} stdDeviation={stdDeviation} />
                </filter></defs>
                <circle cx="50%" cy="50%" r="5" fill={color} filter="url(#cur-mb)" />
            </svg>
        )
    }

    const render = () => {
        switch (cursorType) {
            case 'big-circle': return renderBigCircle()
            case 'ring-dot': return renderRingDot()
            case 'circle-and-dot': return renderCircleAndDot()
            case 'glitch-effect': return renderGlitchEffect()
            case 'motion-blur': return renderMotionBlur()
            default: return renderArrowPointer()
        }
    }

    return <>{render()}</>
}
