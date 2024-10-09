import { useContext } from "react";
import { RouteContext } from "../../contexts/route-context/route-context";

export const useRouteContext = () => {
    const context = useContext(RouteContext);
    if (!context) {
      throw new Error('useRouteContext must be used within a RouteProvider');
    }
    return context;
}