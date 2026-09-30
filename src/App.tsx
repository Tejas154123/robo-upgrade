/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeOverview } from './components/HomeOverview';
import { SystemArchitecture } from './components/SystemArchitecture';
import { RoverDashboard } from './components/RoverDashboard';
import { ENoseDashboard } from './components/ENoseDashboard';
import { LiveMonitor } from './components/LiveMonitor';
import { EnvironmentalAnalysis } from './components/EnvironmentalAnalysis';
import { ExhibitionMode } from './components/ExhibitionMode';
import { AboutProject } from './components/AboutProject';
import { ConnectionSettingsModal } from './components/ConnectionSettingsModal';
import { telemetryStore } from './services/telemetryStore';
import { RoverData, ENoseData } from './types/telemetry';
import { Cpu, ShieldCheck, Heart, Sparkles, WifiOff } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [roverData, setRoverData] = useState<RoverData>(telemetryStore.roverData);
  const [eNoseData, setENoseData] = useState<ENoseData>(telemetryStore.eNoseData);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(telemetryStore.isDemoActive());
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isExhibitionModeActive, setIsExhibitionModeActive] = useState<boolean>(false);

  // Subscribe to centralized telemetry store updates
  useEffect(() => {
    const unsubscribe = telemetryStore.subscribe(() => {
      setRoverData({ ...telemetryStore.roverData });
      setENoseData({ ...telemetryStore.eNoseData });
      setIsDemoMode(telemetryStore.isDemoActive());
    });
    return () => unsubscribe();
  }, []);

  // Keyboard shortcut for booth presenters (F or E to enter/exit exhibition mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExhibitionModeActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleDemoMode = () => {
    const nextState = !isDemoMode;
    telemetryStore.setDemoMode(nextState);
    setIsDemoMode(nextState);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Kiosk / Fullscreen Exhibition Mode */}
      {isExhibitionModeActive && (
        <ExhibitionMode
          onExit={() => setIsExhibitionModeActive(false)}
          roverData={roverData}
          eNoseData={eNoseData}
        />
      )}

      {/* Main Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        roverData={roverData}
        eNoseData={eNoseData}
        isDemoMode={isDemoMode}
        onToggleDemoMode={handleToggleDemoMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onEnterExhibitionMode={() => setIsExhibitionModeActive(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'overview' && (
          <HomeOverview
            onNavigate={(tab) => setActiveTab(tab)}
            roverData={roverData}
            eNoseData={eNoseData}
            isDemoMode={isDemoMode}
            onEnterExhibitionMode={() => setIsExhibitionModeActive(true)}
          />
        )}

        {activeTab === 'architecture' && <SystemArchitecture />}

        {activeTab === 'rover' && (
          <RoverDashboard
            roverData={roverData}
            isDemoMode={isDemoMode}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {activeTab === 'enose' && (
          <ENoseDashboard
            eNoseData={eNoseData}
            isDemoMode={isDemoMode}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {activeTab === 'live-monitor' && (
          <LiveMonitor
            roverData={roverData}
            eNoseData={eNoseData}
            isDemoMode={isDemoMode}
            onToggleDemoMode={handleToggleDemoMode}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {activeTab === 'analysis' && <EnvironmentalAnalysis />}

        {activeTab === 'about' && <AboutProject />}
      </main>

      {/* ESP32 Hardware Connection Modal */}
      <ConnectionSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        roverData={roverData}
        eNoseData={eNoseData}
        isDemoMode={isDemoMode}
        onToggleDemoMode={handleToggleDemoMode}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-[#050810] text-slate-400 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-bold tracking-wide">
                SMART ENVIRONMENTAL INSPECTION ROVER
              </div>
              <div className="text-slate-500 font-mono text-[11px]">
                Autonomous Mobility + Environmental Sensing • October 2026 Exhibition
              </div>
            </div>
          </div>

          <div className="text-center md:text-right font-mono text-[11px] text-slate-500 space-y-1">
            <div>Current Architecture: <span className="text-slate-300">2 Independent ESP32 Units</span></div>
            <div>Exhibition Prototype • Built for Student Robotics & AI Showcase</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
