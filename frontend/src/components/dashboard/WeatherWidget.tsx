'use client'

import { Sun } from 'lucide-react';

export default function WeatherWidget() {
  return (
    <div className="flex items-center gap-2 bg-secondary/5 px-3 py-1.5 rounded-2xl">
      <Sun className="w-5 h-5 text-yellow-400" />
      <div className="text-sm">
        <span className="font-bold text-primary">28°C</span>
        <span className="text-secondary"> Senin</span>
      </div>
    </div>
  );
}
