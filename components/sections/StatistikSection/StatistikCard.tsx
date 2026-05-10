"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { useRef } from "react"

interface StatistikCardProps {
  label: string
  value: number
  prefix?: string
  suffix?: string
  delay?: number
}

export function StatistikCard({ label, value, prefix = "", suffix = "", delay = 0 }: StatistikCardProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const duration = 2000 // 2 seconds
      const increment = end / (duration / 16) // roughly 60fps

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          clearInterval(timer)
          setCount(end)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-start"
    >
      <div className="text-4xl md:text-5xl font-black text-primary mb-2 flex items-center">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-neutral-500 font-medium uppercase tracking-wider text-sm">
        {label}
      </div>
    </motion.div>
  )
}
