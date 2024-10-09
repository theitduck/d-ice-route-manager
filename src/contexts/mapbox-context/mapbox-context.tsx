import { createContext, ReactNode, SetStateAction, useState, Dispatch } from 'react';

const INITIAL_CENTER = [3.1510, 46.6417];
const INITIAL_ZOOM = 3;

type MapboxContextType = {
    center: number[];
    zoom: number;
    isDraggable: boolean;
    onFocusWaypoints: (props: { longitude: number; latitude: number }) => void;
    onResetFocus: () => void;
    setDraggable: Dispatch<SetStateAction<boolean>>;
};

const MapboxContext = createContext<MapboxContextType | undefined>(undefined);

const MapboxProvider = ({ children }: { children: ReactNode }) => {
    const [center, setCenter] = useState<number[]>(INITIAL_CENTER);
    const [zoom, setZoom] = useState(INITIAL_ZOOM);
    const [isDraggable, setDraggable] = useState(false);

    const onFocusWaypoints = ({longitude, latitude}: { longitude: number, latitude: number }) => {
        setCenter([longitude, latitude]);
        setZoom(7);
    };

    const onResetFocus = () => {
        setCenter(INITIAL_CENTER);
        setZoom(INITIAL_ZOOM);
    };

    return (
        <MapboxContext.Provider value={{ 
            center, 
            zoom, 
            isDraggable, 
            onFocusWaypoints, 
            onResetFocus, 
            setDraggable 
        }}>
            {children}
        </MapboxContext.Provider>
    );
};

export { MapboxContext, MapboxProvider };