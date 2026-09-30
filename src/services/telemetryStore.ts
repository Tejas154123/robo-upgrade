/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Central Telemetry Store & Hardware Bridge
 * Smart Environmental Inspection Rover
 * 
 * ARCHITECTURE PRINCIPLE:
 * Both ESP32 systems are independent.
 * Data is cleanly structured into `roverData` and `eNoseData`.
 * When hardware is not connected, demo values are marked with isDemo: true.
 * Real ESP32 connections can be established via WebSocket or HTTP endpoints.
 */

import { RoverData, ENoseData, Esp32EndpointConfig } from '../types/telemetry';

type Listener = () => void;

class TelemetryStore {
  private listeners: Set<Listener> = new Set();
  private demoInterval: number | null = null;
  private isDemoModeActive: boolean = true;

  // Endpoint configuration for real hardware
  public endpoints: Esp32EndpointConfig = {
    roverIp: '192.168.4.1',
    roverProtocol: 'http',
    eNoseIp: '192.168.4.2',
    eNoseProtocol: 'http',
    pollIntervalMs: 1000,
  };

  // ROVER DATA STORE
  public roverData: RoverData = {
    connected: false,
    ipAddress: undefined,
    lastHeartbeat: null,
    mode: 'AUTONOMOUS',
    isDemo: true,
    distance: null,
    servoAngle: 90,
    movement: 'IDLE',
    motors: {
      leftSpeed: 0,
      rightSpeed: 0,
      leftDirection: 'STOP',
      rightDirection: 'STOP',
    },
    obstacleDetected: false,
    batteryVoltage: null,
    statusMessage: 'HARDWARE NOT CONNECTED — Running in exhibition demonstration mode',
  };

  // E-NOSE DATA STORE
  public eNoseData: ENoseData = {
    connected: false,
    ipAddress: undefined,
    lastHeartbeat: null,
    isDemo: true,
    temperature: null,
    humidity: null,
    mqSensors: [
      {
        id: 'mq1',
        label: 'MQ SENSOR READING 1',
        hardwareTag: 'Sensor Bank Alpha (Analog PIN 34)',
        rawAdc: null,
        voltage: null,
        baselineRatio: null,
        status: 'WARMING_UP',
        history: [],
      },
      {
        id: 'mq2',
        label: 'MQ SENSOR READING 2',
        hardwareTag: 'Sensor Bank Beta (Analog PIN 35)',
        rawAdc: null,
        voltage: null,
        baselineRatio: null,
        status: 'WARMING_UP',
        history: [],
      },
      {
        id: 'mq3',
        label: 'MQ SENSOR READING 3',
        hardwareTag: 'Sensor Bank Gamma (Analog PIN 32)',
        rawAdc: null,
        voltage: null,
        baselineRatio: null,
        status: 'WARMING_UP',
        history: [],
      },
    ],
    preheatElapsedSec: 45,
    preheatRequiredSec: 180,
    statusMessage: 'HARDWARE NOT CONNECTED — Running in exhibition demonstration mode',
  };

  // Internal state for demo generator
  private demoStep = 0;
  private servoDir = 5;
  private currentServo = 90;

  constructor() {
    this.startDemoSimulation();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  public isDemoActive(): boolean {
    return this.isDemoModeActive;
  }

  public setDemoMode(active: boolean) {
    this.isDemoModeActive = active;
    if (active) {
      this.roverData.isDemo = true;
      this.eNoseData.isDemo = true;
      this.startDemoSimulation();
    } else {
      if (this.demoInterval) {
        clearInterval(this.demoInterval);
        this.demoInterval = null;
      }
      if (!this.roverData.connected) {
        this.roverData.distance = null;
        this.roverData.movement = 'IDLE';
        this.roverData.motors.leftSpeed = 0;
        this.roverData.motors.rightSpeed = 0;
        this.roverData.statusMessage = 'Rover ESP32 Offline. Waiting for hardware connection.';
      }
      if (!this.eNoseData.connected) {
        this.eNoseData.temperature = null;
        this.eNoseData.humidity = null;
        this.eNoseData.mqSensors.forEach(s => {
          s.rawAdc = null;
          s.voltage = null;
          s.baselineRatio = null;
        });
        this.eNoseData.statusMessage = 'E-Nose ESP32 Offline. Waiting for hardware connection.';
      }
    }
    this.notify();
  }

  /**
   * Start realistic simulated readings strictly marked with isDemo: true
   * to illustrate rover obstacle avoidance and MQ sensor monitoring.
   */
  private startDemoSimulation() {
    if (this.demoInterval) clearInterval(this.demoInterval);

    // Seed initial history
    this.eNoseData.mqSensors.forEach((sensor, idx) => {
      if (sensor.history.length === 0) {
        const base = 480 + idx * 220;
        sensor.history = Array.from({ length: 20 }, (_, i) => base + Math.sin(i * 0.5) * 20);
      }
    });

    this.demoInterval = window.setInterval(() => {
      if (!this.isDemoModeActive) return;

      this.demoStep++;

      // 1. Simulate Rover Obstacle Detection & Avoidance Logic
      if (!this.roverData.connected) {
        this.currentServo += this.servoDir;
        if (this.currentServo >= 150) this.servoDir = -10;
        if (this.currentServo <= 30) this.servoDir = 10;
        this.roverData.servoAngle = this.currentServo;

        // Simulate distance changes as rover navigates
        const cycle = this.demoStep % 40;
        if (cycle < 18) {
          // Clear path
          this.roverData.distance = Math.round(55 + Math.sin(this.demoStep * 0.3) * 15);
          this.roverData.obstacleDetected = false;
          this.roverData.movement = 'FORWARD';
          this.roverData.motors = {
            leftSpeed: 190,
            rightSpeed: 190,
            leftDirection: 'FORWARD',
            rightDirection: 'FORWARD',
          };
          this.roverData.statusMessage = 'DEMO: Path clear, forward autonomous navigation';
        } else if (cycle >= 18 && cycle < 24) {
          // Obstacle detected within 25cm
          this.roverData.distance = Math.round(18 - (cycle - 18) * 1.5);
          this.roverData.obstacleDetected = true;
          this.roverData.movement = 'OBSTACLE_AVOIDING';
          this.roverData.motors = {
            leftSpeed: 0,
            rightSpeed: 0,
            leftDirection: 'STOP',
            rightDirection: 'STOP',
          };
          this.roverData.statusMessage = 'DEMO: Ultrasonic proximity alert (< 20cm). Scanning alternatives.';
        } else if (cycle >= 24 && cycle < 32) {
          // Executing evasive turn
          this.roverData.distance = Math.round(28 + Math.cos(this.demoStep * 0.4) * 8);
          this.roverData.obstacleDetected = false;
          this.roverData.movement = 'TURNING_RIGHT';
          this.roverData.motors = {
            leftSpeed: 180,
            rightSpeed: 90,
            leftDirection: 'FORWARD',
            rightDirection: 'REVERSE',
          };
          this.roverData.statusMessage = 'DEMO: Executing differential right turn to bypass obstacle';
        } else {
          // Resuming patrol
          this.roverData.distance = Math.round(42 + Math.sin(this.demoStep * 0.2) * 10);
          this.roverData.obstacleDetected = false;
          this.roverData.movement = 'FORWARD';
          this.roverData.motors = {
            leftSpeed: 160,
            rightSpeed: 160,
            leftDirection: 'FORWARD',
            rightDirection: 'FORWARD',
          };
          this.roverData.statusMessage = 'DEMO: Trajectory cleared. Resuming sector patrol.';
        }
        this.roverData.batteryVoltage = 7.74 + Number((Math.sin(this.demoStep * 0.05) * 0.05).toFixed(2));
      }

      // 2. Simulate E-Nose Environmental Readings
      if (!this.eNoseData.connected) {
        // DHT11 simulation
        this.eNoseData.temperature = +(24.2 + Math.sin(this.demoStep * 0.1) * 0.4).toFixed(1);
        this.eNoseData.humidity = Math.round(56 + Math.cos(this.demoStep * 0.08) * 2);

        // Preheating counter
        if (this.eNoseData.preheatElapsedSec < this.eNoseData.preheatRequiredSec) {
          this.eNoseData.preheatElapsedSec += 1;
        }

        // MQ Sensors telemetry
        this.eNoseData.mqSensors.forEach((sensor, idx) => {
          const baseAdc = 420 + idx * 280;
          const fluctuation = Math.round(Math.sin((this.demoStep + idx * 7) * 0.2) * 35);
          const raw = Math.max(100, Math.min(4095, baseAdc + fluctuation));
          const voltage = +( (raw / 4095) * 3.3 ).toFixed(2);
          const ratio = +(1.0 + (raw - 400) / 1200).toFixed(2);

          sensor.rawAdc = raw;
          sensor.voltage = voltage;
          sensor.baselineRatio = ratio;
          sensor.status = this.eNoseData.preheatElapsedSec < 60 ? 'WARMING_UP' : 'READY';

          // Update sparkline history (max 20 points)
          const newHist = [...sensor.history.slice(1), raw];
          sensor.history = newHist;
        });

        this.eNoseData.statusMessage = 'DEMO: DHT11 and MQ-series analog sampling active (simulated).';
      }

      this.notify();
    }, 1200);
  }

  /**
   * Real ESP32 Connection Attempt Handler
   * Does NOT fake connectivity. If the server cannot be reached, reports connection error.
   */
  public async testConnectRover(ip: string): Promise<{ success: boolean; message: string }> {
    try {
      this.roverData.statusMessage = `Connecting to Rover ESP32 at ${ip}...`;
      this.notify();

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`http://${ip}/status`, {
        method: 'GET',
        signal: controller.signal,
      }).catch(err => {
        throw new Error(err.message || 'Network unreachable');
      });

      clearTimeout(timeoutId);

      if (res && res.ok) {
        const json = await res.json();
        this.roverData.connected = true;
        this.roverData.isDemo = false;
        this.roverData.ipAddress = ip;
        this.roverData.lastHeartbeat = Date.now();
        this.roverData.statusMessage = 'Connected to Rover ESP32 via Wi-Fi';
        this.updateRoverFromHardware(json);
        this.notify();
        return { success: true, message: 'Rover ESP32 connected successfully!' };
      } else {
        throw new Error('Endpoint responded with non-200 status');
      }
    } catch (err: any) {
      this.roverData.connected = false;
      this.roverData.statusMessage = `Connection failed: ${err.message || 'Unable to reach Rover ESP32'}`;
      this.notify();
      return { success: false, message: `Could not reach Rover at ${ip}. Ensure laptop is on same Wi-Fi network.` };
    }
  }

  public async testConnectENose(ip: string): Promise<{ success: boolean; message: string }> {
    try {
      this.eNoseData.statusMessage = `Connecting to E-Nose ESP32 at ${ip}...`;
      this.notify();

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`http://${ip}/sensors`, {
        method: 'GET',
        signal: controller.signal,
      }).catch(err => {
        throw new Error(err.message || 'Network unreachable');
      });

      clearTimeout(timeoutId);

      if (res && res.ok) {
        const json = await res.json();
        this.eNoseData.connected = true;
        this.eNoseData.isDemo = false;
        this.eNoseData.ipAddress = ip;
        this.eNoseData.lastHeartbeat = Date.now();
        this.eNoseData.statusMessage = 'Connected to E-Nose ESP32 via Wi-Fi';
        this.updateENoseFromHardware(json);
        this.notify();
        return { success: true, message: 'E-Nose ESP32 connected successfully!' };
      } else {
        throw new Error('Endpoint responded with non-200 status');
      }
    } catch (err: any) {
      this.eNoseData.connected = false;
      this.eNoseData.statusMessage = `Connection failed: ${err.message || 'Unable to reach E-Nose ESP32'}`;
      this.notify();
      return { success: false, message: `Could not reach E-Nose at ${ip}. Ensure laptop is on same Wi-Fi network.` };
    }
  }

  public disconnectRover() {
    this.roverData.connected = false;
    this.roverData.isDemo = this.isDemoModeActive;
    this.roverData.ipAddress = undefined;
    this.roverData.statusMessage = 'Rover ESP32 disconnected.';
    this.notify();
  }

  public disconnectENose() {
    this.eNoseData.connected = false;
    this.eNoseData.isDemo = this.isDemoModeActive;
    this.eNoseData.ipAddress = undefined;
    this.eNoseData.statusMessage = 'E-Nose ESP32 disconnected.';
    this.notify();
  }

  public updateRoverFromHardware(payload: Partial<RoverData>) {
    Object.assign(this.roverData, payload);
    this.roverData.connected = true;
    this.roverData.isDemo = false;
    this.roverData.lastHeartbeat = Date.now();
    this.notify();
  }

  public updateENoseFromHardware(payload: Partial<ENoseData>) {
    Object.assign(this.eNoseData, payload);
    this.eNoseData.connected = true;
    this.eNoseData.isDemo = false;
    this.eNoseData.lastHeartbeat = Date.now();
    this.notify();
  }
}

export const telemetryStore = new TelemetryStore();
