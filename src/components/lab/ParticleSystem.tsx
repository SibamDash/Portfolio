import { useEffect, useRef } from 'react'

export function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const resize = () => {
      // Use parent container dimensions
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 2 + 0.1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        // Primary brand color variants
        this.color = `hsla(210, 100%, 60%, ${Math.random() * 0.5 + 0.1})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.size > 0.2) this.size -= 0.01

        if (this.x < 0 || this.x > canvas!.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas!.height) this.speedY *= -1
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      particles = []
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle())
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      for (let i = 0; i < 5; i++) {
        const p = new Particle()
        p.x = x
        p.y = y
        p.size = Math.random() * 5 + 2
        p.speedX = Math.random() * 4 - 2
        p.speedY = Math.random() * 4 - 2
        p.color = `hsla(${Math.random() * 60 + 180}, 100%, 60%, 0.8)`
        particles.push(p)
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
        
        // Remove tiny particles to avoid endless array growth when interacting
        if (particles[i].size <= 0.2 && particles.length > 100) {
          particles.splice(i, 1)
          i--
        }
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)

    resize()
    init()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block cursor-crosshair rounded-xl"
      style={{ backgroundColor: '#09090b' }}
    />
  )
}
