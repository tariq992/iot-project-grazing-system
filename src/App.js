
// App.js - Main Dashboard Component
import React, { useState } from 'react';
import { 
  Activity, 
  Thermometer, 
  MapPin, 
  Bell, 
  AlertCircle, 
  CheckCircle, 
  Wifi, 
  WifiOff,
  TrendingUp,
  Droplet,
  Zap,
  Clock
} from 'lucide-react';

const App = () => {
  // Static animal data - will be replaced with Firebase data later
  const [animals] = useState([
    {
      id: 1,
      name: 'Daisy',
      type: 'Cow',
      location: { lat: 37.7749, lng: -122.4194, address: 'North Pasture, Sector A' },
      temperature: 38.2,
      activity: 'grazing',
      status: 'normal',
      lastActive: '2 min ago',
      battery: 94,
      alerts: []
    },
    {
      id: 2,
      name: 'Bella',
      type: 'Cow',
      location: { lat: 37.7755, lng: -122.4188, address: 'North Pasture, Sector B' },
      temperature: 38.8,
      activity: 'resting',
      status: 'warning',
      lastActive: '5 min ago',
      battery: 87,
      alerts: ['Temperature elevated']
    },
    {
      id: 3,
      name: 'Charlie',
      type: 'Bull',
      location: { lat: 37.7762, lng: -122.4201, address: 'East Meadow' },
      temperature: 38.1,
      activity: 'moving',
      status: 'normal',
      lastActive: '1 min ago',
      battery: 78,
      alerts: []
    },
    {
      id: 4,
      name: 'Luna',
      type: 'Cow',
      location: { lat: 37.7742, lng: -122.4215, address: 'South Field' },
      temperature: 39.2,
      activity: 'inactive',
      status: 'critical',
      lastActive: '10 min ago',
      battery: 45,
      alerts: ['High fever detected', 'Low battery']
    },
    {
      id: 5,
      name: 'Rocky',
      type: 'Bull',
      location: { lat: 37.7771, lng: -122.418, address: 'West Pasture' },
      temperature: 38.4,
      activity: 'grazing',
      status: 'normal',
      lastActive: '3 min ago',
      battery: 91,
      alerts: []
    },
    {
      id: 6,
      name: 'Molly',
      type: 'Cow',
      location: { lat: 37.7735, lng: -122.4205, address: 'South Field' },
      temperature: 38.3,
      activity: 'moving',
      status: 'normal',
      lastActive: '4 min ago',
      battery: 88,
      alerts: []
    }
  ]);

  // Static notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      animal: 'Luna',
      type: 'temperature',
      message: 'High fever detected (39.2°C)',
      time: '10 minutes ago',
      read: false,
      severity: 'critical'
    },
    {
      id: 2,
      animal: 'Bella',
      type: 'temperature',
      message: 'Elevated temperature (38.8°C)',
      time: '15 minutes ago',
      read: false,
      severity: 'warning'
    },
    {
      id: 3,
      animal: 'Luna',
      type: 'battery',
      message: 'Low battery level (45%)',
      time: '1 hour ago',
      read: true,
      severity: 'warning'
    },
    {
      id: 4,
      animal: 'Daisy',
      type: 'movement',
      message: 'Unusual movement pattern detected',
      time: '2 hours ago',
      read: true,
      severity: 'info'
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [online] = useState(true); // Simulate online status

  const getActivityIcon = (activity) => {
    switch(activity) {
      case 'grazing': return <Activity className="w-4 h-4 text-green-500" />;
      case 'resting': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'moving': return <TrendingUp className="w-4 h-4 text-orange-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTemperatureColor = (temp) => {
    if (temp > 39) return 'text-red-600';
    if (temp > 38.5) return 'text-yellow-600';
    return 'text-green-600';
  };

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">IoT Grazing System</h1>
                <p className="text-sm text-gray-500">Real-time Animal Monitoring Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                {online ? (
                  <>
                    <Wifi className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Connected</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-gray-600">Offline</span>
                  </>
                )}
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition"
                >
                  <Bell className="w-5 h-5 text-gray-700" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 border">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <button 
                        onClick={markAllAsRead}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notifications.map(notif => (
                          <div 
                            key={notif.id}
                            onClick={() => markAsRead(notif.id)}
                            className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition ${!notif.read ? 'bg-blue-50' : ''}`}
                          >
                            <div className="flex items-start space-x-3">
                              {notif.severity === 'critical' && <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                              {notif.severity === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />}
                              {notif.severity === 'info' && <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />}
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{notif.animal}</p>
                                <p className="text-sm text-gray-600">{notif.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                              </div>
                              {!notif.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Animals</p>
                <p className="text-3xl font-bold text-gray-900">{animals.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Alerts</p>
                <p className="text-3xl font-bold text-red-600">{notifications.filter(n => !n.read).length}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Temperature</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(animals.reduce((acc, a) => acc + a.temperature, 0) / animals.length).toFixed(1)}°C
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Thermometer className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Animals</p>
                <p className="text-3xl font-bold text-gray-900">
                  {animals.filter(a => a.activity === 'grazing' || a.activity === 'moving').length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Animal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Animal Cards */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Animal Monitoring</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {animals.map(animal => (
                    <div 
                      key={animal.id}
                      onClick={() => setSelectedAnimal(animal)}
                      className={`bg-gray-50 rounded-lg p-4 border-2 transition cursor-pointer hover:shadow-md ${
                        selectedAnimal?.id === animal.id ? 'border-green-500 bg-green-50' : 'border-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{animal.name}</h3>
                          <p className="text-sm text-gray-500">{animal.type}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(animal.status)}`}>
                          {animal.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Thermometer className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Temperature:</span>
                          </div>
                          <span className={`font-medium ${getTemperatureColor(animal.temperature)}`}>
                            {animal.temperature}°C
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Location:</span>
                          </div>
                          <span className="text-gray-900 text-xs truncate max-w-[150px]">
                            {animal.location.address}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            {getActivityIcon(animal.activity)}
                            <span className="text-gray-600">Activity:</span>
                          </div>
                          <span className="text-gray-900 capitalize">{animal.activity}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Battery:</span>
                          </div>
                          <span className={`font-medium ${animal.battery < 50 ? 'text-red-600' : 'text-gray-900'}`}>
                            {animal.battery}%
                          </span>
                        </div>

                        {animal.alerts.length > 0 && (
                          <div className="mt-2 pt-2 border-t">
                            {animal.alerts.map((alert, idx) => (
                              <div key={idx} className="flex items-center space-x-1 text-xs text-red-600">
                                <AlertCircle className="w-3 h-3" />
                                <span>{alert}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Location & Sensor Panel */}
          <div className="space-y-6">
            {/* Location Map Simulation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Animal Locations</h2>
              </div>
              <div className="p-6">
                {selectedAnimal ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <MapPin className="w-5 h-5" />
                        <span className="text-xs opacity-90">{selectedAnimal.lastActive}</span>
                      </div>
                      <p className="font-semibold">{selectedAnimal.name}</p>
                      <p className="text-sm opacity-90">{selectedAnimal.location.address}</p>
                      <div className="mt-2 text-xs opacity-75">
                        Lat: {selectedAnimal.location.lat}<br />
                        Lng: {selectedAnimal.location.lng}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium mb-2">Sensor Readings:</p>
                      <ul className="space-y-1">
                        <li className="flex justify-between">
                          <span>PIR Motion:</span>
                          <span className="font-mono">{selectedAnimal.activity === 'moving' ? 'Active' : 'Inactive'}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Ultrasonic:</span>
                          <span className="font-mono">{Math.floor(Math.random() * 500) + 100} cm</span>
                        </li>
                        <li className="flex justify-between">
                          <span>GPS Signal:</span>
                          <span className="font-mono text-green-600">Strong</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Select an animal to view location</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {animals.slice(0, 3).map(animal => (
                    <div key={animal.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        {getActivityIcon(animal.activity)}
                        <span className="font-medium text-gray-900">{animal.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 capitalize">{animal.activity}</span>
                        <span className="text-gray-400 text-xs">{animal.lastActive}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;