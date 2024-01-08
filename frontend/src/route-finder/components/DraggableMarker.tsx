import { useCallback, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Marker, MarkerProps, Popup } from 'react-leaflet';

import { Marker as LeafletMarker } from 'leaflet';

interface DraggableMarkerProps extends MarkerProps {}

const DraggableMarker = (props: DraggableMarkerProps) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(props.position);

  const markerRef = useRef<LeafletMarker>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );
  const toggleDraggable = useCallback(() => {
    setDraggable(d => !d);
  }, []);

  return (
    <Marker
      {...props}
      position={position}
      ref={markerRef}
      eventHandlers={eventHandlers}
      draggable={true}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable ? 'Marker is draggable' : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  );
};

export { DraggableMarker };
