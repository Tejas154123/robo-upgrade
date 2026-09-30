/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Telemetry Data Types for Smart Environmental Inspection Rover
 * School Robotics & AI Exhibition — October 2026
 * 
 * Clean separation between:
 * 1. Rover ESP32 (Autonomous Navigation)
 * 2. E-Nose ESP32 (Environmental Sensing)
 */

export type MovementState = 'IDLE' | 'FORWARD' | 'TURNING_LEFT' | 'TURNING_RIGHT' | 'REVERSING' | 'OBSTACLE_AVOIDING';
export type RoverMode = 'AUTONOMOUS' | 'MANUAL' | 'IDLE';

export interface RoverData {
  connected: boolean;
  ipAddress?: string;
  lastHeartbeat: number | null;
  mode: RoverMode;
  isDemo: boolean;
  distance: number | null; // Ultrasonic reading in cm
  servoAngle: number | null; // Servo angle 0 - 180 degrees
  movement: MovementState;
  motors: {
    leftSpeed: number; // 0 - 255 PWM
    rightSpeed: number; // 0 - 255 PWM
    leftDirection: 'FORWARD' | 'REVERSE' | 'STOP';
    rightDirection: 'FORWARD' | 'REVERSE' | 'STOP';
  };
  obstacleDetected: boolean;
  batteryVoltage: number | null; // e.g. 7.4V or 11.1V pack
  statusMessage: string;
}

export interface MqSensorReading {
  id: string;
  label: string; // Generic label e.g. "MQ SENSOR READING 1"
  hardwareTag: string; // e.g. "MQ-X (Analog A0)"
  rawAdc: number | null; // 0 - 4095 ESP32 12-bit ADC
  voltage: number | null; // 0.0 - 3.3V
  baselineRatio: number | null; // Rs / R0 relative ratio
  status: 'CALIBRATING' | 'READY' | 'WARMING_UP' | 'ELEVATED';
  history: number[]; // Last 20 readings for sparkline/graph
}

export interface ENoseData {
  connected: boolean;
  ipAddress?: string;
  lastHeartbeat: number | null;
  isDemo: boolean;
  temperature: number | null; // DHT11 in Celsius
  humidity: number | null; // DHT11 in % RH
  mqSensors: MqSensorReading[];
  preheatElapsedSec: number;
  preheatRequiredSec: number;
  statusMessage: string;
}

export interface Esp32EndpointConfig {
  roverIp: string;
  roverProtocol: 'ws' | 'http';
  eNoseIp: string;
  eNoseProtocol: 'ws' | 'http';
  pollIntervalMs: number;
}
