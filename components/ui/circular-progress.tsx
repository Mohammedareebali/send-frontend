import * as React from "react"

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  backgroundColor?: string
  progressColor?: string
}

export function CircularProgress({
  value,
  size = 80,
  strokeWidth = 8,
  backgroundColor = "#e6e6e6",
  progressColor = "#3b82f6",
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={progressColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="16"
        fontWeight="bold"
      >
        {`${value}%`}
      </text>
    </svg>
  )
}
