import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteProvider } from './contexts/route-context/route-context';
import { MapboxProvider } from './contexts/mapbox-context/mapbox-context';
import Layout from './layouts/layout';
import RouteList from './pages/route-list/route-list';
import CreateRoute from './pages/create-route/create-route';
import EditRoute from './pages/edit-route/edit-route';

function App() {
    return (
        <RouteProvider>
            <MapboxProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<RouteList />} />
                        <Route path="new-route" element={<CreateRoute />} />
                        <Route path="edit-route/:routeName" element={<EditRoute />} />
                        <Route path="*" element={<RouteList />} />
                    </Route>
                </Routes>
            </MapboxProvider>
        </RouteProvider>
    );
}
export default App;