/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Cpu, 
  Wind, 
  Compass, 
  Activity, 
  Maximize2, 
  WifiOff, 
  Settings, 
  Info,
  GitBranch,
  Layers,
  Radio,
  Sliders
} from 'lucide-react';
import { RoverData, ENoseData } from '../types/telemetry';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  roverData: RoverData;
  eNoseData: ENoseData;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onOpenSettings: () => void;
  onEnterExhibitionMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  roverData,
  eNoseData,
  isDemoMode,
  onToggleDemoMode,
  onOpenSettings,
  onEnterExhibitionMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'architecture', label: 'Architecture', icon: GitBranch },
    { id: 'rover', label: 'Rover Module', icon: Compass },
    { id: 'enose', label: 'E-Nose Module', icon: Wind },
    { id: 'live-monitor', label: 'Live Monitor', icon: Activity },
    { id: 'analysis', label: 'Future Analysis', icon: Radio },
    { id: 'about', label: 'Project Info', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Telemetry / Status Ribbon */}
      <div className="bg-[#050810] border-b border-slate-800/60 px-4 py-1.5 text-xs font-mono flex flex-wrap items-center justify-between gap-3 text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-cyan-400 font-semibold uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Exhibition 2026 Prototype
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">
            System: <span className="text-white font-medium">Dual Independent ESP32 Units</span>
          </span>
        </div>

        {/* Hardware Status Indicators */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">ROVER:</span>
            {roverData.connected ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> ONLINE ({roverData.ipAddress})
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-950/40 border border-amber-800/50 px-2 py-0.5 rounded text-[11px]">
                <WifiOff className="w-3 h-3" /> NOT CONNECTED {isDemoMode ? '(DEMO)' : '(IDLE)'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">E-NOSE:</span>
            {eNoseData.connected ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> ONLINE ({eNoseData.ipAddress})
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-950/40 border border-amber-800/50 px-2 py-0.5 rounded text-[11px]">
                <WifiOff className="w-3 h-3" /> NOT CONNECTED {isDemoMode ? '(DEMO)' : '(IDLE)'}
              </span>
            )}
          </div>

          {/* Quick Demo Mode Toggle */}
          <button
            onClick={onToggleDemoMode}
            title={isDemoMode ? 'Click to disable demo data simulation' : 'Click to enable demo data simulation'}
            className={`hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
              isDemoMode 
                ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-700/60 hover:bg-cyan-900/60' 
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span>Simulated Data: <strong>{isDemoMode ? 'ACTIVE' : 'PAUSED'}</strong></span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
              <Cpu className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                <span>SMART ENVIRONMENTAL ROVER</span>
              </div>
              <p className="text-[11px] font-mono text-cyan-400/90 tracking-wide uppercase">
                School Robotics & AI Exhibition • Oct 2026
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium tracking-wide uppercase transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
              title="Hardware IP and connection configuration"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">ESP32 Bridge</span>
            </button>

            <button
              onClick={onEnterExhibitionMode}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold tracking-wider uppercase text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              title="Full screen booth exhibition mode"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="font-semibold">Exhibition Mode</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c1220] border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
