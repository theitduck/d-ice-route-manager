import mapboxgl from 'mapbox-gl';
import StartIcon from '../../assets/start-line-flag.png';
import EndIcon from '../../assets/finish-line-flag.png';
import { Route, Waypoint } from '../../types';

type onUpdateWaypointRouteProps = {
    routeName: string;
    waypointIndex: number;
    waypoint: Waypoint;
}

type onMapLoadProps = {
    routes: Route[];
    onUpdateWaypointRoute: (props: onUpdateWaypointRouteProps) => void;
    isDraggable: boolean;
};

export function useMapbox({ mapRef }) {
    const onMapLoad = ({ routes, onUpdateWaypointRoute, isDraggable }: onMapLoadProps) => {
        const map = mapRef.current;
        routes.forEach((route, routeIndex) => {
            const { waypoints } = route;
            waypoints && waypoints.forEach((waypoint, waypointIndex) => {
                let markerElement = document.createElement('div');
                markerElement.className = 'marker';
    
                if (waypointIndex === 0) {
                    markerElement.style.backgroundImage = `url(${StartIcon})`;
                    markerElement.style.width = '30px';
                    markerElement.style.height = '30px';
                    markerElement.style.backgroundSize = 'cover';
                } 
                else if (waypointIndex === waypoints.length - 1) {
                    markerElement.style.backgroundImage = `url(${EndIcon})`;
                    markerElement.style.width = '30px';
                    markerElement.style.height = '30px';
                    markerElement.style.backgroundSize = 'cover';
                } else {
                    markerElement = undefined
                }

                const marker = new mapboxgl.Marker({ element: markerElement, draggable: isDraggable })
                    .setLngLat([waypoint.longitude, waypoint.latitude])
                    .addTo(map);
                
                if (isDraggable) {
                    marker.on('dragend', () => {
                        const newCoords = marker.getLngLat();
                        const waypoint = { id: waypoints.length, latitude: newCoords.lat, longitude: newCoords.lng };
                        onUpdateWaypointRoute({ routeName: route.name, waypointIndex, waypoint });
                    });
                }

                const label = document.createElement('div');
                label.className = 'marker-label';
                label.textContent = `${waypointIndex + 1}`;
                label.style.color = 'white';
                label.style.fontSize = '14px';
                label.style.fontWeight = 'bold';
                label.style.textAlign = 'center';
                label.style.marginBottom = '5px';
          
                new mapboxgl.Marker({ element: label, anchor: 'top' })
                    .setLngLat([waypoint.longitude, waypoint.latitude])
                    .addTo(map);
            });
    
            const routeGeoJSON = {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: waypoints && waypoints.map((waypoint) => [waypoint.longitude, waypoint.latitude])
                }
            };

            const routeSourceId = `route-${routeIndex}`;
    
            if (map.getSource(routeSourceId)) {
                map.removeLayer(routeSourceId);
                map.removeSource(routeSourceId);
            }
    
            map.addSource(routeSourceId, {
                type: 'geojson',
                data: routeGeoJSON
            });
    
            map.addLayer({
                id: routeSourceId,
                type: 'line',
                source: routeSourceId,
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#1DB954',
                    'line-width': 4
                }
            });
        });
    };
    
    return { onMapLoad }
}