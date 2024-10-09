export type Route = {
    name: string;
    waypoints: Waypoint[];
}

export type Waypoint = {
    id: number;
    latitude: number;
    longitude: number;
}