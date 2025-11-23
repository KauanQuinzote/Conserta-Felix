"use client"
import React, { useEffect, useRef } from 'react'

const Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      age: number
      life: number
      rotation: number
      size: number
    }

    const particles: Particle[] = []
    const particleLife = 7000 // ms

    // PNG do Flaticon
    const hammerImage = new Image()
    hammerImage.src = 'https://cdn-icons-png.flaticon.com/512/620/620588.png'
    hammerImage.crossOrigin = 'anonymous'

    const createParticle = () => {
      const x = Math.random() * canvas.width
      const particle: Particle = {
        x,
        y: canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: -(Math.random() * 1.5 + 0.8),
        age: 0,
        life: particleLife,
        rotation: Math.random() * Math.PI * 2,
        size: Math.random() * 8 + 20,
      }
      particles.push(particle)
    }

    let lastSpawn = 0

    const animate = (currentTime: number) => {
      ctx.fillStyle = '#06628D' // primary-blue
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Spawnar novas partículas
      if (currentTime - lastSpawn > 200) {
        createParticle()
        lastSpawn = currentTime
      }

      // Atualizar e desenhar partículas
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.age += 16 // ~60fps
        p.x += p.vx
        p.y += p.vy
        p.vy *= 0.99 // Desaceleração
        p.rotation += 0.05

        const progress = p.age / p.life
        const opacity = Math.max(0, 1 - progress)

        ctx.globalAlpha = opacity
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)

        // Desenhar a imagem do martelo
        if (hammerImage.complete) {
          ctx.drawImage(
            hammerImage,
            -p.size / 2,
            -p.size / 2,
            p.size,
            p.size
          )
        }

        ctx.restore()

        if (p.age >= p.life) {
          particles.splice(i, 1)
        }
      }

      ctx.globalAlpha = 1
      requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    requestAnimationFrame(animate)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-[9999] w-full h-full bg-gradient-to-b from-white to-primary-blue"
    />
  )
}

export default Particles