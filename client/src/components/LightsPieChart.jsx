import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#21ac9bff", "#b63221ff"]; // Teal = On, Red = Off

export default function LightsPieChart({ lights }) {
  const total = lights.length;
  const onCount = lights.filter((l) => l.on).length;
  const offCount = total - onCount;

  const data = [
    { name: "On", value: onCount },
    { name: "Off", value: offCount },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%" >
      <PieChart >
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="60%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
          label={({ name, value }) => `${name}  ${value}`}
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
