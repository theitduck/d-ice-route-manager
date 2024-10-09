import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ChevrontLeft from "../../components/chevron-left-icon/chevron-left-icon";
import PlusIcon from "../../components/plus-icon/plus-icon";
import { useRouteContext } from "../../hooks/use-route-context/use-route-context";
import TrashIcon from "../../components/trash-icon/trash-icon";
import { useMapboxContext } from "../../hooks/use-mapbox-context/use-mapbox-context";
import { Route } from "../../types";

export default function EditRoute() {
    const [route, setRoute] = useState<Route | undefined>(undefined);
    const { routeName } = useParams();
    const { routes, onCreateWaypointRoute, onDeleteWaypointRoute, onUpdateWaypointsRoute } = useRouteContext();
    const { onFocusWaypoints, setDraggable, isDraggable } = useMapboxContext();
    
    useEffect(() => {
        const currentRoute = routes.find(route => route.name === routeName);
        setRoute(currentRoute);
        if(route && route.waypoints && route.waypoints.length > 0) {
            onFocusWaypoints({
                longitude: route.waypoints[0].longitude, 
                latitude: route.waypoints[0].latitude 
            });
        }
        if(!isDraggable) {
            setDraggable(true);
        }
    }, [routeName, routes, isDraggable, route, setDraggable]);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, waypointIndex: number, input: string) => {
        const updatedWaypoints = [...(route?.waypoints ?? [])];
        let updatedWaypoint = { ...updatedWaypoints[waypointIndex] };
        updatedWaypoint[input] = event.target.value;
        updatedWaypoints[waypointIndex] = updatedWaypoint;
        onUpdateWaypointsRoute({ routeName, waypoints: updatedWaypoints });
    };

    if(!route) {
        return (
            <>
                <div className="form-container__header">
                    <Link to="/" className="form-container__header-button-back button">
                        <ChevrontLeft />
                    </Link>&nbsp;
                    <span className="form-container__header-title">Edit route</span>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="form-container__header">
                <Link to="/" className="form-container__header-button-back button">
                    <ChevrontLeft />
                </Link>&nbsp;
                <span className="form-container__header-title">{route.name}</span>
            </div>
            <div className="form-container__content">
                <div className="form-container__route">
                    <table className="form-container__route__table">
                        <thead>
                            <tr>
                                <th>Step</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                route.waypoints && route.waypoints.map((waypoint, waypointIndex) => (
                                    <tr key={waypointIndex}>
                                        <td>{`WP${waypointIndex + 1}`}</td>
                                        <td>
                                            <input 
                                                type="number" 
                                                placeholder="40" 
                                                className="form-container__route__table__input"
                                                name="latitude"
                                                value={waypoint.latitude}
                                                onChange={(event) => handleInputChange(event, waypointIndex, "latitude")}
                                                required
                                            />
                                            <span>° N</span>
                                        </td>
                                        <td>
                                            <input 
                                                type="number" 
                                                placeholder="3"
                                                name="longitude"
                                                value={waypoint.longitude}
                                                className="form-container__route__table__input"
                                                onChange={(event) => handleInputChange(event, waypointIndex, 'longitude')}
                                                required
                                            />
                                            <span>° W</span>
                                        </td>
                                        <td>
                                            <button type="button" onClick={() => onDeleteWaypointRoute({ routeName, waypointIndex })}>
                                                <TrashIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="form-container__button-actions">
                    <button onClick={() => onCreateWaypointRoute(routeName)} type="button" className="button form-container__button-action">
                        <PlusIcon />&nbsp;Add new route
                    </button>
                </div>
            </div>
        </>
    )
}