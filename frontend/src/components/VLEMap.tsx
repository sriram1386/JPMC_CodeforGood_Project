import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different marker types
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 10px;
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

interface VLE {
  id: string;
  name: string;
  village: string;
  district: string;
  totalIncome: number;
  monthlyIncome: number;
  machinesOwned: number;
  customersServed: number;
  status: string;
  coordinates: [number, number]; // [latitude, longitude]
}

interface PotentialVillage {
  name: string;
  district: string;
  population: number;
  farmers: number;
  coordinates: [number, number];
  priority: string;
}

interface VLEMapProps {
  vles: VLE[];
  potentialVillages?: PotentialVillage[];
  height?: string;
}

const VLEMap = ({ vles, potentialVillages = [], height = "400px" }: VLEMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Madhya Pradesh
    const map = L.map(mapRef.current).setView([23.5937, 78.9629], 7);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add VLE markers (blue markers)
    vles.forEach((vle) => {
      const marker = L.marker(vle.coordinates, {
        icon: createCustomIcon('#3b82f6')
      }).addTo(map);
      
      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; color: #2563eb; font-weight: 600;">${vle.name}</h3>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Village:</strong> ${vle.village}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>District:</strong> ${vle.district}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Monthly Income:</strong> ₹${vle.monthlyIncome.toLocaleString()}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Machines:</strong> ${vle.machinesOwned}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Customers:</strong> ${vle.customersServed}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Status:</strong> <span style="color: #059669;">${vle.status}</span></p>
        </div>
      `;
      
      marker.bindPopup(popupContent);
    });

    // Add potential village markers (orange/red markers)
    potentialVillages.forEach((village) => {
      const markerColor = village.priority === 'High' ? '#ef4444' : '#f97316';
      const marker = L.marker(village.coordinates, {
        icon: createCustomIcon(markerColor)
      }).addTo(map);
      
      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; color: ${village.priority === 'High' ? '#dc2626' : '#ea580c'}; font-weight: 600;">${village.name}</h3>
          <p style="margin: 4px 0; font-size: 14px;"><strong>District:</strong> ${village.district}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Population:</strong> ${village.population.toLocaleString()}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Farmers:</strong> ${village.farmers.toLocaleString()}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Priority:</strong> <span style="color: ${village.priority === 'High' ? '#dc2626' : '#ea580c'}; font-weight: 600;">${village.priority}</span></p>
          <p style="margin: 4px 0; font-size: 12px; color: #6b7280;"><em>Potential expansion area - No VLEs nearby</em></p>
        </div>
      `;
      
      marker.bindPopup(popupContent);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [vles, potentialVillages]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        height, 
        width: '100%', 
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }} 
    />
  );
};

export default VLEMap; 