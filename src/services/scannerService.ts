const API_URL = "http://localhost:5000/api";

export const scannerService = {
  verificarConexion: async () => {
    try {
      const res = await fetch(`${API_URL}/ping`);
      return res.ok;
    } catch {
      return false;
    }
  },
  iniciarEscaneo: async (url: string) => {
    const res = await fetch(`${API_URL}/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, risk_level: 1 }),
    });
    if (!res.ok) throw new Error("No se pudo iniciar el escaneo");
    const data = await res.json();
    // Si tu backend devuelve un ID de escaneo, retorna ese ID
    return data.scan_id || null;
  },
  obtenerEstadoEscaneo: async (scanId: string) => {
    const res = await fetch(`${API_URL}/scan_status/${scanId}`);
    if (!res.ok) throw new Error("No se pudo obtener el estado");
    return await res.json();
  },
  convertirResultados: (vulnerabilidades: any[]) => {
    // Tu lógica para transformar los resultados
    return vulnerabilidades.map((vuln, idx) => ({
      ...vuln,
      id: idx,
    }));
  },
};