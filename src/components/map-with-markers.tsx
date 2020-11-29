import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Game from './game';

interface MapWithMarkersProps {
  markers: Array<{
    lat: number;
    long: number;
    game: string;
    links: string[];
  }>;
}

const MapWithMarkers: React.FC<MapWithMarkersProps> = ({ markers }) => {
  if (typeof window !== 'undefined') {
    return (
      <MapContainer
        center={[0, 0]}
        zoom={1}
        maxZoom={12}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        easeLinearity={0.35}
        style={{ height: 500 }}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {markers.map(({ lat, long, game, links }) => (
          <Marker position={[lat, long]}>
            <Popup>
              <Game gameName={game} />
              {links.length && (
                <>
                  <br />
                  {links.map(link => (
                    <>
                      <br />
                      <a href={link} target="_blank">
                        {link}
                      </a>
                    </>
                  ))}
                </>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }

  return null;
};

export default MapWithMarkers;
