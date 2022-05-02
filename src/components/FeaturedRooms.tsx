import { useBeachResortStrapiClient } from "../hooks/useBeachResortStrapiClient";
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";

function FeaturedRooms() {
  const { rooms, loading } = useBeachResortStrapiClient({
    filters: {
      featured: {
        $eq: true,
      },
    },
  });

  return (
    <section className="featured-rooms">
      <Title title="featured rooms" />

      <div className="featured-rooms-center">
        {loading && <Loading />}

        {rooms.map((room) => (
          <Room key={room.id} room={room} />
        ))}

        {rooms.length === 0 && (
          <div>There's no featured room at the moment</div>
        )}
      </div>
    </section>
  );
}

export default FeaturedRooms;
