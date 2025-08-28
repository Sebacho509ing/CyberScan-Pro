#!/usr/bin/env python3
"""
Script para descargar e instalar SQLMap automáticamente
"""

import os
import subprocess
import sys
from pathlib import Path

def run_command(command, cwd=None):
    """Ejecuta un comando y maneja errores"""
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"Error ejecutando: {command}")
            print(f"Error: {result.stderr}")
            return False
        return True
    except Exception as e:
        print(f"Excepción ejecutando {command}: {e}")
        return False

def setup_sqlmap():
    """Descarga e instala SQLMap"""
    print("🔧 Configurando SQLMap...")
    
    # Crear directorio server si no existe
    server_dir = Path("server")
    server_dir.mkdir(exist_ok=True)
    
    # Cambiar al directorio server
    os.chdir(server_dir)
    
    # Verificar si SQLMap ya existe
    if Path("sqlmap").exists():
        print("✅ SQLMap ya está instalado")
        return True
    
    # Descargar SQLMap desde GitHub
    print("📥 Descargando SQLMap desde GitHub...")
    if not run_command("git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git"):
        print("❌ Error descargando SQLMap")
        return False
    
    # Verificar instalación
    if Path("sqlmap/sqlmap.py").exists():
        print("✅ SQLMap instalado correctamente")
        
        # Hacer ejecutable
        run_command("chmod +x sqlmap/sqlmap.py")
        
        # Crear directorio para escaneos
        Path("scans").mkdir(exist_ok=True)
        
        return True
    else:
        print("❌ Error en la instalación de SQLMap")
        return False

def install_python_dependencies():
    """Instala las dependencias de Python"""
    print("📦 Instalando dependencias de Python...")
    
    if Path("requirements.txt").exists():
        if run_command("pip install -r requirements.txt"):
            print("✅ Dependencias de Python instaladas")
            return True
        else:
            print("❌ Error instalando dependencias de Python")
            return False
    else:
        print("⚠️  Archivo requirements.txt no encontrado")
        return False

def main():
    """Función principal"""
    print("🚀 Iniciando configuración del escáner SQL...")
    
    # Verificar que estamos en el directorio correcto
    if not Path("package.json").exists():
        print("❌ Ejecuta este script desde el directorio raíz del proyecto")
        sys.exit(1)
    
    # Configurar SQLMap
    if not setup_sqlmap():
        print("❌ Error configurando SQLMap")
        sys.exit(1)
    
    # Instalar dependencias de Python
    if not install_python_dependencies():
        print("❌ Error instalando dependencias de Python")
        sys.exit(1)
    
    print("\n🎉 ¡Configuración completada!")
    print("\n📋 Próximos pasos:")
    print("1. Ejecuta: npm run dev:full")
    print("2. Abre http://localhost:5173 en tu navegador")
    print("3. ¡Comienza a escanear sitios web!")
    print("\n⚠️  Nota: Usa esta herramienta solo en sitios web que tengas permiso para probar")

if __name__ == "__main__":
    main()