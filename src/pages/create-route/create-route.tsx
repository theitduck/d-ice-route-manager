import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './create-route.css';
import TrashIcon from "../../components/trash-icon/trash-icon";
import ChevrontLeft from "../../components/chevron-left-icon/chevron-left-icon";
import PlusIcon from "../../components/plus-icon/plus-icon";
import { useRouteContext } from "../../hooks/use-route-context/use-route-context";
import { Waypoint } from "../../types";

function CreateRoute() {
    const initialWaypoints = [
        {id: 1, latitude: 40, longitude: 3},
        {id: 2, latitude: 45, longitude: 3}
    ];
    const [name, setName] = useState('');
    const [waypoints, setWaypoints] = useState<Waypoint[]>([...initialWaypoints]);
    const { onCreateRoute } = useRouteContext();
    const navigate = useNavigate();

    const onButtonClick = () => {
        const currentWaypoints = [...waypoints];
        currentWaypoints.push({ id: currentWaypoints.length, latitude: 40, longitude: 3 })
        setWaypoints(currentWaypoints)
    }

    const onDeleteWaypointInput = (waypointIndex: number) => {
        const currentWaypoints = [...waypoints];
        const filteredWaypoints = currentWaypoints.filter((_, index) => index !== waypointIndex);
        setWaypoints(filteredWaypoints);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, waypointIndex: number, input: string) => {
        const updatedWaypoints = [...waypoints];
        const updatedWaypoint = { ...updatedWaypoints[waypointIndex] };
        updatedWaypoint[input] = event.target.value;
        updatedWaypoints[waypointIndex] = updatedWaypoint;
        setWaypoints(updatedWaypoints);
    }

    const onSubmit = (event: Event) => {
        event.preventDefault();
        if(name && waypoints.length >= 2) {
            onCreateRoute({ name, waypoints });
            navigate('/');
        } else {
            alert('Please fill correctly the name and the waypoints (2 at least) !');
        }
    }
    return (
        <>
            <div className="form-container__header">
                <Link to="/" className="form-container__header-button-back button">
                    <ChevrontLeft />
                </Link>&nbsp;
                <span className="form-container__header-title">New route</span>
                <button type="button" onClick={onSubmit} className="form-container__header-button button">
                    Send
                </button>
            </div>
            <div className="form-container__content">
                <div className="form-container__route">
                    <div className="form-container__route__name">
                        <label 
                            className="form-container__route__name__label" 
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input 
                            name="name" 
                            className="form-container__route__name__input"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
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
                                waypoints.map((waypoint, waypointIndex) => (
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
                                            />
                                            <span>° N</span>
                                        </td>
                                        <td>
                                            <input 
                                                type="number" 
                                                placeholder="3"
                                                name="longitude"
                                                className="form-container__route__table__input"
                                                value={waypoint.longitude}
                                                onChange={(event) => handleInputChange(event, waypointIndex, 'longitude')}
                                            />
                                            <span>° W</span>
                                        </td>
                                        <td>
                                            <button onClick={() => onDeleteWaypointInput(waypointIndex)}>
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
                    <button type="button" onClick={onButtonClick} className="button form-container__button-action">
                        <PlusIcon />&nbsp;Add new route
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreateRoute;