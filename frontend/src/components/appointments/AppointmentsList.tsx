'use client'

import { useState } from 'react'
import { Search, Filter, Bell, ChevronLeft, ChevronRight, Mic, Activity, Calendar, X, Menu, User, Phone, Mail, Clock as ClockIcon, Plus, Ban, LayoutDashboard, Car, DollarSign, GaugeCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import TrackOccupancyView from '@/components/dashboard/TrackOccupancyView'
import AppointmentsQueue from '@/components/dashboard/AppointmentsQueue'
import WeatherWidget from '@/components/dashboard/WeatherWidget'

interface Appointment {
  id: string
  clientName: string
  service: string
  time: string
  status: 'confirmed' | 'pending' | 'in-progress' | 'completed' | 'cancelled'
  type: 'voice' | 'manual'
  preview: string
}

interface AppointmentsListProps {
  isMobile?: boolean
  onMobileToggle?: () => void
}

// The interfaces below are currently unused after removing the old list,
// but they might be useful for the "Add Appointment" or other future modals.
// They will be reviewed in a future refactoring pass.
interface Appointment {
  id: string
  clientName: string
  service: string
  time: string
  status: 'confirmed' | 'pending' | 'in-progress' | 'completed' | 'cancelled'
  type: 'voice' | 'manual'
  preview: string
}

interface AppointmentWithDetails extends Appointment {
  clientPhone?: string
  clientEmail?: string
  clientNotes?: string
  duration?: string
  price?: string
  lastVisit?: string
  preferences?: string[]
}

export default function AppointmentsList({ isMobile, onMobileToggle }: AppointmentsListProps) {
  const [showCalendar, setShowCalendar] = useState(false)
  const [showAddAppointment, setShowAddAppointment] = useState(false)

  // NOTE: The logic for showing client details has been removed as its trigger (the old list) is gone.
  // This can be re-added when a new trigger point is implemented.

  return (
    <div className={cn(
      "flex flex-col bg-card",
      isMobile ? "w-full h-full" : "flex-1 border-r border-border"
    )}>
      {/* Main Header */}
      <div className="px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isMobile && (
              <button 
                onClick={onMobileToggle}
                className="p-1.5 text-secondary hover:text-primary rounded-2xl hover:bg-card-hover transition-colors"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}
            <LayoutDashboard className="w-4 h-4 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Dashboard (Tablou de Bord Operațional)</h1>
          </div>
          <div className="flex items-center gap-3">
            <WeatherWidget />
            <div className='h-6 w-px bg-border'></div>
            <p className="text-sm text-secondary">Astăzi, 12 Oct 2025</p>
            <button className="p-1.5 text-secondary hover:text-primary rounded-2xl hover:bg-card-hover transition-colors relative">
              <Bell className="h-4 w-4" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-secondary rounded-full"></div>
            </button>
          </div>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="p-4 border-b border-border bg-card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Vehicule Procesate Azi */}
          <div className="bg-secondary/5 p-4 rounded-2xl flex items-center gap-4">
            <div className="bg-secondary/10 p-3 rounded-xl">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-secondary">Vehicule Procesate Azi</p>
              <p className="text-2xl font-bold text-primary">42</p>
            </div>
          </div>
          {/* Card 2: Venit Estimat Azi */}
          <div className="bg-secondary/5 p-4 rounded-2xl flex items-center gap-4">
            <div className="bg-secondary/10 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-secondary">Venit Estimat Azi</p>
              <p className="text-2xl font-bold text-primary">3,150 RON</p>
            </div>
          </div>
          {/* Card 3: Rata de Utilizare Piste */}
          <div className="bg-secondary/5 p-4 rounded-2xl flex items-center gap-4">
            <div className="bg-secondary/10 p-3 rounded-xl">
              <GaugeCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-secondary">Rata de Utilizare Piste</p>
              <p className="text-2xl font-bold text-primary">85%</p>
            </div>
          </div>
          {/* Card 4: Timp Mediu per Serviciu */}
          <div className="bg-secondary/5 p-4 rounded-2xl flex items-center gap-4">
            <div className="bg-secondary/10 p-3 rounded-xl">
              <ClockIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-secondary">Timp Mediu per Serviciu</p>
              <p className="text-2xl font-bold text-primary">25 min</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="px-4 py-2 border-b border-border bg-card">
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddAppointment(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-primary text-background rounded-2xl hover:bg-secondary transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Adaugă Programare
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-secondary/10 text-secondary hover:text-primary hover:bg-secondary/20 rounded-2xl transition-colors text-sm">
            <Ban className="w-4 h-4" />
            Blochează Interval
          </button>
        </div>
      </div>
      
      {/* Search and Actions */}
      <div className="p-3 border-b border-border flex bg-card">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Căutare programări..."
            className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-2xl text-base text-primary placeholder-secondary focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-colors"
          />
          <Search className="h-4 w-4 text-secondary absolute left-3 top-2.5" />
        </div>
        <button className="ml-2 p-2 text-secondary hover:text-primary rounded-2xl hover:bg-card-hover transition-colors">
          <Filter className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col overflow-y-auto">
        <TrackOccupancyView />
        <AppointmentsQueue />
      </div>
      
      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowCalendar(false)}>
          <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-primary">Selectează Data</h3>
              <button 
                onClick={() => setShowCalendar(false)}
                className="p-1 text-secondary hover:text-primary rounded-2xl hover:bg-card-hover transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-secondary p-2">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: 35 }, (_, i) => {
                const dayNumber = i - 5 + 1; // Start from 1st day
                const isCurrentDay = dayNumber === 12;
                const isValidDay = dayNumber > 0 && dayNumber <= 31;
                
                return (
                  <button
                    key={i}
                    className={cn(
                      "text-sm p-2 rounded-2xl transition-colors",
                      isCurrentDay 
                        ? "bg-primary text-background font-medium" 
                        : isValidDay 
                          ? "text-primary hover:bg-card-hover" 
                          : "text-secondary/50 cursor-not-allowed"
                    )}
                    disabled={!isValidDay}
                    onClick={() => {
                      if (isValidDay) {
                        setShowCalendar(false);
                      }
                    }}
                  >
                    {isValidDay ? dayNumber : ''}
                  </button>
                );
              })}
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setShowCalendar(false)}
                className="flex-1 px-4 py-2 bg-secondary/10 text-secondary rounded-2xl hover:bg-secondary/20 transition-colors"
              >
                Anulează
              </button>
              <button 
                onClick={() => setShowCalendar(false)}
                className="flex-1 px-4 py-2 bg-primary text-background rounded-2xl hover:bg-secondary transition-colors"
              >
                Selectează
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* TODO: The Client Details modal was removed as it's no longer accessible.
          It can be re-added when a new trigger point is implemented. */}
      
      {/* Add Appointment Modal */}
      {showAddAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddAppointment(false)}>
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-primary">Adaugă Programare</h3>
              <button 
                onClick={() => setShowAddAppointment(false)}
                className="p-1 text-secondary hover:text-primary rounded-2xl hover:bg-card-hover transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Nume Client</label>
                <input
                  type="text"
                  placeholder="Nume complet client"
                  className="w-full px-3 py-2 bg-card border border-border rounded-2xl text-sm text-primary placeholder-secondary focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Telefon</label>
                <input
                  type="tel"
                  placeholder="+40 123 456 789"
                  className="w-full px-3 py-2 bg-card border border-border rounded-2xl text-sm text-primary placeholder-secondary focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-colors"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Data</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-card border border-border rounded-2xl text-sm text-primary focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Ora</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 bg-card border border-border rounded-2xl text-sm text-primary focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Serviciu</label>
                <select className="w-full px-3 py-2 bg-card border border-border rounded-2xl text-sm text-primary focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-colors">
                  <option value="">Selectează serviciul</option>
                  <option value="tuns">Tuns simplu</option>
                  <option value="tuns-barba">Tuns + Barbă</option>
                  <option value="tuns-vopsit">Tuns + Vopsit</option>
                  <option value="coafura">Coafură ocazie</option>
                  <option value="tratament">Tratamente păr</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Observații</label>
                <textarea
                  placeholder="Observații despre client, preferințe, alergii..."
                  rows={3}
                  className="w-full px-3 py-2 bg-card border border-border rounded-2xl text-sm text-primary placeholder-secondary focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-colors resize-none"
                ></textarea>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
              <button 
                onClick={() => setShowAddAppointment(false)}
                className="flex-1 px-4 py-2 bg-secondary/10 text-secondary rounded-2xl hover:bg-secondary/20 transition-colors"
              >
                Anulează
              </button>
              <button 
                onClick={() => setShowAddAppointment(false)}
                className="flex-1 px-4 py-2 bg-primary text-background rounded-2xl hover:bg-secondary transition-colors"
              >
                Salvează Programare
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}