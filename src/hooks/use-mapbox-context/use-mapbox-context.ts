import { useContext } from "react";
import { MapboxContext } from "../../contexts/mapbox-context/mapbox-context";

export const useMapboxContext = () => {
    const context = useContext(MapboxContext);
    if (!context) {
      throw new Error('useMapboxContext must be used within a MapboxProvider');
    }
    return context;
}