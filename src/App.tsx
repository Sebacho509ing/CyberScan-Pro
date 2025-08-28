import React, { useState, useEffect } from "react";
import { Shield, Search, AlertTriangle, CheckCircle, XCircle, Globe, Database, Lock, Zap, Eye, Terminal } from 'lucide-react';
import { scannerService, ScanResult } from './services/scannerService';

function App() {
  const [url, setUrl] = useState('');
  const [riskLevel, setRiskLevel] = useState(1);
  const [tamper, setTamper] = useState('');
  const [threads, setThreads] = useState(1);
  const [resultado, setResultado] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [hasScanned, setHasScanned] = useState(false);
  const [scanPhase, setScanPhase] = useState('');
  const [serverConnected, setServerConnected] = useState(false);
  const [currentScanId, setCurrentScanId] = useState<string | null>(null);

  // Verificar conexión con el servidor al cargar
  useEffect(() => {
    const verificarServidor = async () => {
      const conectado = await scannerService.verificarConexion();
      setServerConnected(conectado);
    };
    
    verificarServidor();
    const interval = setInterval(verificarServidor, 30000); // Verificar cada 30 segundos
    
    return () => clearInterval(interval);
  }, []);

  // Polling para obtener estado del escaneo
  useEffect(() => {
    if (!currentScanId || !isScanning) return;
    
    const interval = setInterval(async () => {
      try {
        const estado = await scannerService.obtenerEstadoEscaneo(currentScanId);
        
        setScanProgress(estado.progreso);
        setScanPhase(estado.fase);
        
        if (estado.completado) {
          setIsScanning(false);
          setCurrentScanId(null);
          
          if (estado.error) {
            console.error('Error en escaneo:', estado.error);
            setScanResults([]);
          } else if (estado.resultados) {
            if (estado.resultados.vulnerable && estado.resultados.vulnerabilidades) {
              const resultados = scannerService.convertirResultados(estado.resultados.vulnerabilidades);
              setScanResults(resultados);
            } else {
              setScanResults([]);
            }
          }
          
          setHasScanned(true);
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Error obteniendo estado:', error);
        setIsScanning(false);
        setCurrentScanId(null);
        clearInterval(interval);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [currentScanId, isScanning]);

  const startScan = async () => {
    setIsScanning(true);
    setResultado(null);
    setScanResults([]);
    setHasScanned(false);
    setScanPhase('Iniciando escaneo...');

    try {
      const res = await fetch('http://localhost:5000/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          risk_level: riskLevel,
          tamper: tamper || undefined,
          threads: threads || undefined
        }),
      });
      const data = await res.json();

      setIsScanning(false);
      setHasScanned(true);
      setScanPhase('Escaneo completado');

      if (data.resultado && data.resultado.vulnerabilidades) {
        setScanResults(scannerService.convertirResultados(data.resultado.vulnerabilidades));
      } else {
        setScanResults([]);
      }
    } catch (error) {
      console.error('Error iniciando escaneo:', error);
      setIsScanning(false);
      alert('Error al iniciar el escaneo. Verifica la URL y la conexión del servidor.');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      case 'medium': return <Eye className="w-5 h-5" />;
      case 'low': return <CheckCircle className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: 'http://ejemplo.com',
        risk_level: 1
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // Aquí puedes guardar el resultado en el estado y mostrarlo en pantalla
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800 bg-gray-900/90 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Shield className="w-8 h-8 text-green-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">CyberScan Pro</h1>
                  <p className="text-sm text-gray-400">SQL Injection Detector</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4" />
                  <span>v2.1.0</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${serverConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span>{serverConnected ? 'Servidor conectado' : 'Servidor desconectado'}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* Scan Input Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm mb-6 border border-blue-500/20">
              <Lock className="w-4 h-4" />
              <span>Escáner SQLMap Integrado - Análisis Real</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Escáner SQL Injection Real
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Utiliza SQLMap para detectar vulnerabilidades reales de SQL injection con análisis profundo
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://ejemplo.com"
                  className="w-full pl-12 pr-32 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  disabled={isScanning}
                />
                <button
                  onClick={startScan}
                  disabled={isScanning || !url.trim() || !serverConnected}
                  className="absolute inset-y-0 right-0 px-6 m-1 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-md hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 font-medium"
                >
                  {isScanning ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Escaneando</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Escanear</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Scanning Progress */}
          {isScanning && (
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">SQLMap Ejecutándose</h3>
                  <div className="text-green-400 font-mono text-sm">{Math.round(scanProgress)}%</div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">{scanPhase}</span>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {hasScanned && !isScanning && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Resultados del Escaneo</h3>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-400">
                    Escaneado: <span className="text-white font-mono">{url}</span>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-400 text-sm font-medium">Críticas</p>
                      <p className="text-2xl font-bold text-white">{scanResults.filter(r => r.severity === 'critical').length}</p>
                    </div>
                    <XCircle className="w-8 h-8 text-red-400" />
                  </div>
                </div>
                
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-400 text-sm font-medium">Altas</p>
                      <p className="text-2xl font-bold text-white">{scanResults.filter(r => r.severity === 'high').length}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-orange-400" />
                  </div>
                </div>
                
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-400 text-sm font-medium">Medias</p>
                      <p className="text-2xl font-bold text-white">{scanResults.filter(r => r.severity === 'medium').length}</p>
                    </div>
                    <Eye className="w-8 h-8 text-yellow-400" />
                  </div>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-400 text-sm font-medium">Bajas</p>
                      <p className="text-2xl font-bold text-white">{scanResults.filter(r => r.severity === 'low').length}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </div>
              </div>

              {/* Vulnerabilities List */}
              <div className="space-y-4">
                {scanResults.length > 0 ? scanResults.map((result, index) => (
                  <div 
                    key={result.id} 
                    className={`bg-gray-800 border rounded-lg p-6 transition-all duration-300 hover:bg-gray-750 animate-fade-in ${getSeverityColor(result.severity)}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getSeverityIcon(result.severity)}
                        <div>
                          <h4 className="font-semibold text-lg text-white">{result.vulnerability}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getSeverityColor(result.severity)}`}>
                              {result.severity}
                            </span>
                            <span className="text-gray-400 text-sm">•</span>
                            <span className="text-gray-400 text-sm font-mono">{result.location}</span>
                          </div>
                          {result.payload && (
                            <div className="mt-2">
                              <span className="text-xs text-gray-500">Payload: </span>
                              <code className="text-xs bg-gray-900 px-2 py-1 rounded text-green-400">{result.payload}</code>
                            </div>
                          )}
                        </div>
                      </div>
                      <Database className="w-5 h-5 text-gray-500" />
                    </div>
                    <p className="text-gray-300 leading-relaxed">{result.description}</p>
                  </div>
                )) : (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">¡Sitio Seguro!</h4>
                    <p className="text-gray-300">No se detectaron vulnerabilidades de SQL injection en esta URL.</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-8">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Generar Reporte</span>
                </button>
                <button 
                  onClick={() => {
                    setScanResults([]);
                    setHasScanned(false);
                    setUrl('');
                  }}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Nuevo Escaneo
                </button>
              </div>
            </div>
          )}

          {/* Feature Cards */}
          {!isScanning && !hasScanned && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-800/70 transition-all duration-200">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">SQLMap Integrado</h3>
                <p className="text-gray-400">Utiliza la herramienta SQLMap profesional para detectar vulnerabilidades reales de SQL injection.</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-800/70 transition-all duration-200">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Análisis Real</h3>
                <p className="text-gray-400">Escaneo real y exhaustivo de formularios, parámetros y endpoints con técnicas avanzadas.</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-800/70 transition-all duration-200">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Resultados Profesionales</h3>
                <p className="text-gray-400">Obtén resultados detallados con payloads específicos y clasificación de severidad profesional.</p>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;