import { useEffect, useRef } from 'react'

/**
 * CustomCursor Component
 * Renders a high-performance Canvas-based "Star Dust" mouse trail.
 * Features neon pink particles that follow the mouse and fade out gracefully.
 */
export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mouse = useRef({ x: 0, y: 0, isActive: false })
  const prevMouse = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number>(0)

  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string
    life: number
    maxLife: number

    constructor(x: number, y: number) {
      this.x = x
      this.y = y
      this.size = Math.random() * 2.8 + 0.8
      // Drift velocity
      this.speedX = (Math.random() - 0.5) * 1.5
      this.speedY = (Math.random() - 0.5) * 1.5
      
      const colors = ['#FF007A', '#D400FF', '#9D00FF', '#FF0055', '#E60073']
      this.color = colors[Math.floor(Math.random() * colors.length)]
      // Faster lifespan for a snappier trail
      this.maxLife = Math.random() * 60 + 30 
      this.life = this.maxLife
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY
      // Snappier friction and drift
      this.speedX *= 0.97
      this.speedY *= 0.97
      this.speedY -= 0.01 
      
      if (this.size > 0.1) this.size -= 0.022 // Faster shrinkage
      this.life--
    }

    draw(ctx: CanvasRenderingContext2D) {
      const alpha = Math.max(0, this.life / this.maxLife)
      ctx.fillStyle = this.color
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.shadowBlur = 15 * alpha
      ctx.shadowColor = this.color
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      if (mouse.current.isActive) {
        const dx = mouse.current.x - prevMouse.current.x
        const dy = mouse.current.y - prevMouse.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const steps = Math.min(Math.floor(distance / 3), 15)

        for (let i = 0; i <= steps; i++) {
          const x = prevMouse.current.x + (dx * (i / steps))
          const y = prevMouse.current.y + (dy * (i / steps))
          
          // Spawn particles with slight offsets
          const spawnCount = distance > 2 ? 2 : 1
          for (let j = 0; j < spawnCount; j++) {
            particles.current.push(new Particle(
              x + (Math.random() - 0.5) * 5, 
              y + (Math.random() - 0.5) * 5
            ))
          }
        }
      }

      // Smoothly track previous mouse position
      prevMouse.current.x += (mouse.current.x - prevMouse.current.x) * 0.5
      prevMouse.current.y += (mouse.current.y - prevMouse.current.y) * 0.5

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i]
        p.update()
        p.draw(ctx)

        if (p.life <= 0) {
          particles.current.splice(i, 1)
          i--
        }
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      mouse.current.isActive = true
      
      clearTimeout((window as any).mouseStopTimer)
      ;(window as any).mouseStopTimer = setTimeout(() => {
        mouse.current.isActive = false
      }, 50)
    }

    resizeCanvas()
    animate()

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  )
}
