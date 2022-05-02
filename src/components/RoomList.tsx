import { useEffect, useState } from "react";
import Room from "./Room";

function RoomsList({ rooms }: { rooms: any[] }) {
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsEmpty(rooms.length === 0);
    }, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [rooms.length]);

  if (isEmpty) {
    return (
      <div className="empty-search">
        <h3>unfortunately, no rooms matched your search parameters</h3>
      </div>
    );
  }

  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {rooms.map((item) => (
          <Room key={item.id} room={item} />
        ))}
      </div>
    </section>
  );
}

export default RoomsList;
