"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type LifeEventChartData = {
  year: number
  positive: number
  negative: number
}

export function LifePathChart() {
  // TODO: Remplacer par les données réelles de l'utilisateur
  const data: LifeEventChartData[] = [
    { year: 2010, positive: 4, negative: 0 },
    { year: 2012, positive: 0, negative: 3 },
    { year: 2015, positive: 6, negative: 1 },
    { year: 2018, positive: 3, negative: 0 },
    { year: 2020, positive: 0, negative: 5 },
    { year: 2023, positive: 7, negative: 2 },
  ]

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="positive" stackId="1" stroke="#4ade80" fill="#4ade80" />
          <Area type="monotone" dataKey="negative" stackId="1" stroke="#f87171" fill="#f87171" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
