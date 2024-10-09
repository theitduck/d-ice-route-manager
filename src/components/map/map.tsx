import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMapbox } from '../../hooks/use-mapbox/use-mapbox';
import { useRouteContext } from '../../hooks/use-route-context/use-route-context';
import { useMapboxContext } from '../../hooks/use-mapbox-context/use-mapbox-context';
import 'mapbox-gl/dist/mapbox-gl.css';
import './map.css';

const API_URL = 'http://localhost:3000';

function Map() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const { routes, onUpdateWaypointRoute } = useRouteContext();
  const { onMapLoad } = useMapbox({ mapRef });
  const { center, zoom, isDraggable } = useMapboxContext();

  const fetchToken = async () => {
    try {
      const response = await fetch(`${API_URL}/mapbox-token`, { method: 'POST' });
      return await response.json();
    } catch (error) {
      console.error('Error fetching Mapbox token from backend:', error);
      return null;
    }
  };

  useEffect(() => {
    const initMap = async () => {
      const { token } = await fetchToken();
      if (!token) {
        console.error('Mapbox token not available.');
        return;
      }

      if (mapContainerRef.current) {
        mapboxgl.accessToken = token;

        mapRef.current = new mapboxgl.Map({
          style: 'mapbox://styles/mapbox/dark-v11',
          container: mapContainerRef.current,
          center,
          zoom,
        });

        mapRef.current.on('load', () => {
          onMapLoad({ routes, onUpdateWaypointRoute, isDraggable });
        });
      } else {
        console.error('Map container is not available.');
      }
    };

    initMap();

    return () => {
        if (mapRef.current) {
          try {
            mapRef.current.remove();
            mapRef.current = null;
          } catch (error) {
            console.error('Error removing the Mapbox map:', error);
          }
        }
      };
  }, [onMapLoad, routes, center, zoom, isDraggable, onUpdateWaypointRoute]);

  return <div id="map-container" ref={mapContainerRef} />;
}

export default Map;
