import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRouteContext } from "../../hooks/use-route-context/use-route-context";
import PencilIcon from "../../components/pencil-icon/pencil-icon";
import TrashIcon from "../../components/trash-icon/trash-icon";
import PlusIcon from "../../components/plus-icon/plus-icon";
import { useMapboxContext } from "../../hooks/use-mapbox-context/use-mapbox-context";

function RouteList() {
    const { routes, onDeleteRoute } = useRouteContext();
    const { onResetFocus, setDraggable } = useMapboxContext();

    useEffect(() => {
        onResetFocus();
        setDraggable(false);
    }, [onResetFocus, setDraggable]);

    const onRemoveRoute = (routeName: string) => {
        if(window.confirm("Do you really want to delete this route ?")) {
            onDeleteRoute(routeName);
        }
    }

    return (
        <>
            <div className="form-container__header">
                <span className="form-container__header-title">Routes</span>
            </div>
            <div className="form-container__content">
                {
                    routes.map((route, index) => (
                        <div key={index} className="container__route">
                            <div className="form-container__route-title">
                                {route.name}
                            </div>
                            <div className="form-container__route-actions">
                                <Link to={`/edit-route/${route.name}`} className="form-container__route-action form-container__route-action--edit">
                                    <PencilIcon />
                                </Link>
                                <button onClick={() => onRemoveRoute(route.name)} className="form-container__route-action form-container__route-action--delete">
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    ))
                }
                <div className="form-container__button-actions">
                    <Link to="/new-route" className="button form-container__button-action">
                        <PlusIcon />&nbsp;
                        Add new route
                    </Link>
                </div>
            </div>
        </>
    )
}

export default RouteList;