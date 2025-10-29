// src/AnimatedMarker.jsx
import  { useEffect, useRef } from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

function AnimatedMarker({ position, icon, duration = 2000 }) {
    const markerRef = useRef(null);
    const map = useMap(); // Use map context to access Leaflet methods

    useEffect(() => {
        if (markerRef.current && position) {
            const marker = markerRef.current;
            const startLatLng = marker.getLatLng();
            const endLatLng = L.latLng(position);

            // If it's the first move, just set the position
            if (startLatLng.lat === 0 && startLatLng.lng === 0) {
                marker.setLatLng(endLatLng);
                return;
            }

            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(1, elapsedTime / duration); // 0 to 1

                // Interpolation function (simple linear)
                const lat = startLatLng.lat + (endLatLng.lat - startLatLng.lat) * progress;
                const lng = startLatLng.lng + (endLatLng.lng - startLatLng.lng) * progress;

                marker.setLatLng([lat, lng]);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Ensures the marker is exactly at the final point
                    marker.setLatLng(endLatLng);
                }
            };

            requestAnimationFrame(animate);

            // Optionally pan the map to follow the vehicle
            map.panTo(endLatLng, { animate: true, duration: 1 });
        }
    }, [position, duration, map]);

    return <Marker ref={markerRef} position={position} icon={icon} />;
}
export default AnimatedMarker;