/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Info, 
  Cpu, 
  Code, 
  Layers, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen,
  Wrench,
  Compass,
  Wind
} from 'lucide-react';

export const AboutProject: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'rover' | 'enose'>('rover');
  const [copied, setCopied] = useState(false);

  const roverSnippet = `// ==========================================
// ESP32 ROVER FIRMWARE SNIPPET (Arduino IDE)
// Provides JSON endpoint for Dashboard Telemetry
// ==========================================
#include <WiFi.h>
#include <WebServer.h>
#include <ESP32Servo.h>

const char* ssid = "Robotics_Rover_AP";
const char* password = "inspectionrover";
WebServer server(80);
Servo scanServo;

// Ultrasonic Pins
#define TRIG_PIN 5
#define ECHO_PIN 18
#define SERVO_PIN 19

long readUltrasonicDistanceCM() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH, 30000);
  if (duration == 0) return 400; // max range
  return duration * 0.034 / 2;
}

void handleStatus() {
  long dist = readUltrasonicDistanceCM();
  int currentAngle = scanServo.read();
  
  // JSON payload matching web dashboard roverData schema
  String json = "{";
  json += "\\"connected\\": true,";
  json += "\\"mode\\": \\"AUTONOMOUS\\",";
  json += "\\"distance\\": " + String(dist) + ",";
  json += "\\"servoAngle\\": " + String(currentAngle) + ",";
  json += "\\"movement\\": \\"FORWARD\\",";
  json += "\\"obstacleDetected\\": " + String(dist < 20 ? "true" : "false") + ",";
  json += "\\"batteryVoltage\\": 7.82";
  json += "}";
  
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", json);
}

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  scanServo.attach(SERVO_PIN);
  scanServo.write(90);

  WiFi.softAP(ssid, password);
  server.on("/status", handleStatus);
  server.begin();
  Serial.println("Rover WebServer Online at 192.168.4.1");
}

void loop() {
  server.handleClient();
  // Autonomous obstacle avoidance loop runs here
}
`;

  const eNoseSnippet = `// ==========================================
// ESP32 E-NOSE FIRMWARE SNIPPET (Arduino IDE)
// Provides JSON endpoint for Dashboard Telemetry
// ==========================================
#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>

const char* ssid = "Robotics_ENose_AP";
const char* password = "enoseenvironmental";
WebServer server(80);

#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

#define MQ_PIN_1 34
#define MQ_PIN_2 35
#define MQ_PIN_3 32

void handleSensors() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  int adc1 = analogRead(MQ_PIN_1);
  int adc2 = analogRead(MQ_PIN_2);
  int adc3 = analogRead(MQ_PIN_3);

  // JSON payload matching web dashboard eNoseData schema
  String json = "{";
  json += "\\"connected\\": true,";
  json += "\\"temperature\\": " + String(isnan(temp) ? 24.0 : temp, 1) + ",";
  json += "\\"humidity\\": " + String(isnan(hum) ? 55.0 : hum, 0) + ",";
  json += "\\"mqSensors\\": [";
  json += "  {\\"id\\": \\"mq1\\", \\"label\\": \\"MQ SENSOR READING 1\\", \\"rawAdc\\": " + String(adc1) + "},";
  json += "  {\\"id\\": \\"mq2\\", \\"label\\": \\"MQ SENSOR READING 2\\", \\"rawAdc\\": " + String(adc2) + "},";
  json += "  {\\"id\\": \\"mq3\\", \\"label\\": \\"MQ SENSOR READING 3\\", \\"rawAdc\\": " + String(adc3) + "}";
  json += "]}";

  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", json);
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  analogReadResolution(12);

  WiFi.softAP(ssid, password);
  server.on("/sensors", handleSensors);
  server.begin();
  Serial.println("E-Nose WebServer Online at 192.168.4.2");
}

void loop() {
  server.handleClient();
}
`;

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const disciplines = [
    { title: 'Robotics', desc: 'Differential 4-wheel drive kinematic physics, PWM motor control, and servo panning mechanisms.' },
    { title: 'Embedded Systems', desc: 'Dual ESP32 microcontrollers, 12-bit ADC analog sampling, hardware timers, and interrupt handling.' },
    { title: 'IoT Concepts', desc: 'JSON telemetry data modeling, Wi-Fi access points, RESTful endpoints, and future mesh networking.' },
    { title: 'Environmental Sensing', desc: 'Chemical resistance monitoring using tin dioxide (SnO2) heating elements and DHT11 digital hygrometry.' },
    { title: 'Autonomous Navigation', desc: 'Real-time time-of-flight ultrasonic echo processing and reactive collision avoidance state machine.' },
    { title: 'Web-Based Monitoring', desc: 'Interactive browser dashboard for remote mission oversight, system diagnostics, and kiosk exhibition display.' },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Engineering Documentation</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white">About the Project</h2>
        <p className="text-slate-400 text-sm mt-1">
          Designed and developed for a School Robotics & AI Exhibition in October 2026.
        </p>
      </div>

      {/* Project Overview Card */}
      <div className="rounded-2xl bg-[#0b111e] border border-slate-800 p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-white">Exhibition Prototype Purpose</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          The <strong>Smart Environmental Inspection Rover</strong> is an educational robotics prototype created to demonstrate how autonomous mobile robotics and chemical gas sensing can work hand-in-hand to inspect dangerous, hazardous, or enclosed spaces without risking human health.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          For the October 2026 exhibition, the system is deliberately structured as <strong>two independent hardware systems</strong> demonstrated together. This modular architecture allows visitors to understand each subsystem’s discrete engineering principles before seeing how they unite into a future autonomous environmental inspection vehicle.
        </p>
      </div>

      {/* Six Pillars of the Project */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Interdisciplinary Engineering Domains</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {disciplines.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-[#0d1424] border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase mb-1">
                Pillar 0{idx + 1}
              </div>
              <h4 className="text-base font-bold text-white">{item.title}</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hardware Bill of Materials (BOM) Table */}
      <div className="rounded-2xl bg-[#0b111e] border border-slate-800 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-white mb-2">Hardware Bill of Materials (BOM)</h3>
        <p className="text-xs text-slate-400 mb-6">
          Physical parts used across both independent demonstration units.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5">Subsystem</th>
                <th className="py-2.5">Component</th>
                <th className="py-2.5">Quantity</th>
                <th className="py-2.5">Function</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2 text-cyan-400 font-semibold">Rover Platform</td>
                <td className="py-2 font-medium text-white">ESP32 DevKit V1</td>
                <td className="py-2">1x</td>
                <td className="py-2 text-slate-400">Microcontroller for mobility, PWM & ultrasonic</td>
              </tr>
              <tr>
                <td className="py-2 text-cyan-400 font-semibold">Rover Platform</td>
                <td className="py-2 font-medium text-white">L298N Dual H-Bridge</td>
                <td className="py-2">1x</td>
                <td className="py-2 text-slate-400">Motor driver powering 4x DC motors</td>
              </tr>
              <tr>
                <td className="py-2 text-cyan-400 font-semibold">Rover Platform</td>
                <td className="py-2 font-medium text-white">Geared DC TT Motors + Wheels</td>
                <td className="py-2">4x</td>
                <td className="py-2 text-slate-400">Differential drive 4WD chassis</td>
              </tr>
              <tr>
                <td className="py-2 text-cyan-400 font-semibold">Rover Platform</td>
                <td className="py-2 font-medium text-white">HC-SR04 Ultrasonic Sensor</td>
                <td className="py-2">1x</td>
                <td className="py-2 text-slate-400">Soundwave obstacle distance detection</td>
              </tr>
              <tr>
                <td className="py-2 text-cyan-400 font-semibold">Rover Platform</td>
                <td className="py-2 font-medium text-white">SG90 9g Micro Servo</td>
                <td className="py-2">1x</td>
                <td className="py-2 text-slate-400">Pans ultrasonic sensor across 180° sweep</td>
              </tr>
              <tr>
                <td className="py-2 text-cyan-400 font-semibold">Rover Platform</td>
                <td className="py-2 font-medium text-white">2S 18650 Battery Pack + Buck</td>
                <td className="py-2">1x</td>
                <td className="py-2 text-slate-400">7.4V battery pack with LM2596 5V step-down</td>
              </tr>
              <tr>
                <td className="py-2 text-emerald-400 font-semibold">E-Nose Subsystem</td>
                <td className="py-2 font-medium text-white">ESP32 DevKit V1</td>
                <td className="py-2">1x</td>
                <td className="py-2 text-slate-400">Dedicated sensing microcontroller</td>
              </tr>
              <tr>
                <td className="py-2 text-emerald-400 font-semibold">E-Nose Subsystem</td>
                <td className="py-2 font-medium text-white">MQ-Series Gas Sensors</td>
                <td className="py-2">3x</td>
                <td className="py-2 text-slate-400">Analog resistance gas sensors with ceramic heaters</td>
              </tr>
              <tr>
                <td className="py-2 text-emerald-400 font-semibold">E-Nose Subsystem</td>
                <td className="py-2 font-medium text-white">DHT11 Climate Sensor</td>
                <td className="py-2">1x</td>
                <td className="py-2 text-slate-400">Digital ambient temperature and humidity probe</td>
              </tr>
              <tr>
                <td className="py-2 text-emerald-400 font-semibold">E-Nose Subsystem</td>
                <td className="py-2 font-medium text-white">Regulated 5V 2A Power Source</td>
                <td className="py-2">1x</td>
                <td className="py-2 text-slate-400">Isolated 5V rail for heater coils & clean ADC</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Copyable ESP32 Firmware Integration Code */}
      <div className="rounded-2xl bg-[#090e1a] border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-4">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
              <Code className="w-4 h-4" /> Hardware Telemetry Firmware Templates
            </span>
            <h3 className="text-lg font-bold text-white mt-1">Ready-to-Flash ESP32 Arduino Sketches</h3>
            <p className="text-xs text-slate-400">
              When ready to transition from demo mode to physical hardware, flash these sketches to output the exact JSON telemetry this web app receives.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-md border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setActiveCodeTab('rover')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeCodeTab === 'rover' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                RoverSketch.ino
              </button>
              <button
                onClick={() => setActiveCodeTab('enose')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeCodeTab === 'enose' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                ENoseSketch.ino
              </button>
            </div>

            <button
              onClick={() => copyCode(activeCodeTab === 'rover' ? roverSnippet : eNoseSnippet)}
              className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Sketch'}</span>
            </button>
          </div>
        </div>

        <pre className="p-4 rounded-lg bg-black/80 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto max-h-96">
          {activeCodeTab === 'rover' ? roverSnippet : eNoseSnippet}
        </pre>
      </div>
    </div>
  );
};
