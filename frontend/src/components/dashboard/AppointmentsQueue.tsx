'use client'

import { Car, Truck, Mic, Smartphone, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type BookingSource = 'AI' | 'App/Web' | 'Walk-in';
type VehicleType = 'Sedan' | 'SUV';

interface QueuedAppointment {
  id: number;
  time: string;
  client: string; // License Plate or Name
  vehicleType: VehicleType;
  package: string;
  source: BookingSource;
}

const mockQueue: QueuedAppointment[] = [
  { id: 1, time: '14:00', client: 'B 456 DEF', vehicleType: 'SUV', package: 'Curățare Interior', source: 'AI' },
  { id: 2, time: '14:15', client: 'Andrei Popa', vehicleType: 'Sedan', package: 'Pachet Complet', source: 'App/Web' },
  { id: 3, time: '14:20', client: 'Walk-in', vehicleType: 'Sedan', package: 'Spălare Exterior', source: 'Walk-in' },
  { id: 4, time: '14:45', client: 'CJ 78 GHI', vehicleType: 'SUV', package: 'Detailing Premium', source: 'AI' },
];

const getIconFor = (type: VehicleType | BookingSource) => {
  switch (type) {
    case 'Sedan':
      return <Car className="w-6 h-6 text-secondary" />;
    case 'SUV':
      return <Truck className="w-6 h-6 text-secondary" />;
    case 'AI':
      return <Mic className="w-4 h-4 text-primary" title="Programare AI" />;
    case 'App/Web':
      return <Smartphone className="w-4 h-4 text-primary" title="Programare App/Web" />;
    case 'Walk-in':
      return <User className="w-4 h-4 text-primary" title="Client Walk-in" />;
    default:
      return null;
  }
};

export default function AppointmentsQueue() {
  return (
    <div className="p-4 bg-card flex-1 flex flex-col">
      <h3 className="text-base font-medium text-primary mb-4">Coada de Așteptare & Programări</h3>
      <div className="space-y-3 overflow-y-auto">
        {mockQueue.map((apt) => (
          <div key={apt.id} className="flex items-center gap-4 p-3 bg-secondary/5 hover:bg-secondary/10 transition-colors rounded-2xl">
            <div className="text-primary font-bold text-lg w-16 text-center">{apt.time}</div>
            <div className="flex-shrink-0">{getIconFor(apt.vehicleType)}</div>
            <div className="flex-1">
              <p className="font-medium text-primary">{apt.client}</p>
              <p className="text-sm text-secondary">{apt.package}</p>
            </div>
            <div className="p-2 bg-secondary/10 rounded-full">
              {getIconFor(apt.source)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
