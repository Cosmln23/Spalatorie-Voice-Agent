'use client'

import { Car, Wrench, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type TrackStatus = 'Liberă' | 'Ocupată' | 'În Mentenanță';

interface Track {
  id: number;
  name: string;
  status: TrackStatus;
  vehicle?: {
    plate: string;
    service: string;
    timeRemaining: string;
  };
}

const mockTracks: Track[] = [
  { id: 1, name: 'Pista 1', status: 'Ocupată', vehicle: { plate: 'B 123 ABC', service: 'Spălare Exterior Premium', timeRemaining: '12 min' } },
  { id: 2, name: 'Pista 2', status: 'Liberă' },
  { id: 3, name: 'Linie Automată', status: 'Ocupată', vehicle: { plate: 'IF 45 XYZ', service: 'Automat Clasic', timeRemaining: '5 min' } },
  { id: 4, name: 'Zona Detailing', status: 'În Mentenanță' },
];

const getStatusStyles = (status: TrackStatus) => {
  switch (status) {
    case 'Ocupată':
      return {
        bgColor: 'bg-red-900/40',
        borderColor: 'border-red-500/50',
        textColor: 'text-red-300',
        icon: <Car className="w-5 h-5" />,
      };
    case 'Liberă':
      return {
        bgColor: 'bg-green-900/40',
        borderColor: 'border-green-500/50',
        textColor: 'text-green-300',
        icon: <ShieldCheck className="w-5 h-5" />,
      };
    case 'În Mentenanță':
      return {
        bgColor: 'bg-yellow-900/40',
        borderColor: 'border-yellow-500/50',
        textColor: 'text-yellow-300',
        icon: <Wrench className="w-5 h-5" />,
      };
    default:
      return {
        bgColor: 'bg-secondary/10',
        borderColor: 'border-border',
        textColor: 'text-secondary',
        icon: null,
      };
  }
};

export default function TrackOccupancyView() {
  return (
    <div className="p-4 border-b border-border bg-card">
      <h3 className="text-base font-medium text-primary mb-4">Vizualizare Ocupare Piste</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockTracks.map((track) => {
          const styles = getStatusStyles(track.status);
          return (
            <div key={track.id} className={cn('p-4 rounded-2xl border', styles.bgColor, styles.borderColor)}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-primary">{track.name}</h4>
                <div className={cn('flex items-center gap-2 text-sm font-medium', styles.textColor)}>
                  {styles.icon}
                  <span>{track.status}</span>
                </div>
              </div>
              {track.status === 'Ocupată' && track.vehicle ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Vehicul:</span>
                    <span className="text-primary font-mono bg-black/30 px-2 py-0.5 rounded">{track.vehicle.plate}</span>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-secondary">Serviciu:</span>
                    <span className="text-primary text-right">{track.vehicle.service}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-secondary">Timp rămas:</span>
                    <span className="text-primary font-bold text-lg">{track.vehicle.timeRemaining}</span>
                  </div>
                </div>
              ) : track.status === 'Liberă' ? (
                <div className="text-center py-8">
                  <p className="text-green-300">Disponibilă pentru clienți</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-yellow-300">Mentenanță programată</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
