import { createContext, ReactNode, useState } from 'react';
import { Route, Waypoint } from '../../types';

const INITIAL_ROUTES = [
    {
        name: 'Route 1',
        waypoints: [
            {id: 1, latitude: 47, longitude: 10},
            {id: 2, latitude: 45, longitude: 11}
        ]
    },
    {
        name: 'Route 2',
        waypoints: [
            {id: 1, latitude: 20, longitude: 10},
            {id: 2, latitude: 30, longitude: 20},
            {id: 3, latitude: 40, longitude: 30},
            {id: 4, latitude: 50, longitude: 40},
            {id: 5, latitude: 60, longitude: 50}
        ]
    }
];

type RouteContextType = {
    routes: Route[];
    onCreateRoute: (route: Route) => void;
    onUpdateRoute: (routeName: string, route: Route) => void;
    onDeleteRoute: (routeName: string) => void;
    onCreateWaypointRoute: (routeName: string) => void;
    onUpdateWaypointRoute: (props: { routeName: string; waypointIndex: number; waypoint: Waypoint }) => void;
    onUpdateWaypointsRoute: (props: { routeName: string; waypoints: Waypoint[] }) => void;
    onDeleteWaypointRoute: (props: { routeName: string; waypointIndex: number }) => void;
};

const RouteContext = createContext<RouteContextType | undefined>(undefined);

const RouteProvider = ({ children }: { children: ReactNode }) => {
    const [routes, setRoutes] = useState(INITIAL_ROUTES);

    const onCreateRoute = (route: Route) => {
        const currentRoutes = [...routes];
        currentRoutes.push(route);
        setRoutes(currentRoutes);
    }

    const onUpdateRoute = (routeName: string, route: Route) => {
        const updatedRoutes = [...routes];
        const routeIndex = routes.findIndex(route => route.name === routeName);
        updatedRoutes[routeIndex] = route;
        setRoutes(updatedRoutes);
    }

    const onDeleteRoute = (routeName: string) => {
        const updatedRoutes = [...routes].filter(route => route.name !== routeName);
        setRoutes(updatedRoutes);
    }

    const onCreateWaypointRoute = (routeName: string) => {
        const currentRoute = routes.find(route => route.name === routeName);
        const waypoints = [...(currentRoute?.waypoints ?? [])];
        waypoints.push({ id: waypoints.length, latitude: 40, longitude: 3 });
        const routeWithUpdatedWaypoints = {...currentRoute, waypoints} as Route;
        onUpdateRoute(currentRoute.name, routeWithUpdatedWaypoints);
    }

    const onUpdateWaypointsRoute = ({ routeName, waypoints }: { routeName: string, waypoints: Waypoint[] }) => {
        const currentRoute = routes.find(route => route.name === routeName);
        const updatedRoute = { ...currentRoute, waypoints } as Route;
        onUpdateRoute(routeName, updatedRoute);
    }

    const onUpdateWaypointRoute = ({ routeName, waypointIndex, waypoint }: { routeName: string, waypointIndex: number, waypoint: Waypoint }) => {
        const currentRoute = routes.find(route => route.name === routeName);
        let currentWaypoints = [...(currentRoute?.waypoints ?? [])];
        const { latitude, longitude } = waypoint;

        const updatedWaypoint = { ...currentWaypoints[waypointIndex], longitude, latitude };
        currentWaypoints[waypointIndex] = updatedWaypoint;
        
        const updatedRoute = { ...currentRoute, waypoints: currentWaypoints } as Route;
        onUpdateRoute(routeName, updatedRoute);
    }

    const onDeleteWaypointRoute = ({ routeName, waypointIndex }: { routeName: string, waypointIndex: number }) => {
        const currentRoute = routes.find(route => route.name === routeName);
        let currentWaypoints = [...(currentRoute?.waypoints ?? [])];
        const filteredWaypoints = currentWaypoints.filter((_, index) => index !== waypointIndex);
        const updatedRoute = {...currentRoute, waypoints: filteredWaypoints} as Route;
        onUpdateRoute(routeName, updatedRoute);
    }

    return (
        <RouteContext.Provider value={{ 
            routes, 
            onCreateRoute, 
            onUpdateRoute, 
            onDeleteRoute, 
            onCreateWaypointRoute, 
            onUpdateWaypointsRoute, 
            onUpdateWaypointRoute, 
            onDeleteWaypointRoute 
        }}>
            {children}
        </RouteContext.Provider>
    );
};

export { RouteContext, RouteProvider };