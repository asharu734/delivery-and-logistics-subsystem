import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

export default function MapComponent() {
  const position = { lat: 14.0667, lng: 121.3239 };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={position}
          defaultZoom={14}
          style={{ width: "100%", height: "100%" }}
          mapId={dc7a76c6ce28daf146017fda}
        >
          <AdvancedMarker position={position}>
            <Pin />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
}