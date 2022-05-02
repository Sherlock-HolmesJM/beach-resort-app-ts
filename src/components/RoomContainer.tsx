import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
import { useBeachResortStrapiClient } from "../hooks/useBeachResortStrapiClient";
import { useState } from "react";
import styled from "styled-components";

const defaultFilters: TRoomFilter = {
  type: "all",
  breakfast: false,
  pets: false,
  capacity: 0,
  price: -1,
  size: 0,
  minPrice: 0,
  maxPrice: 1000,
  minSize: 0,
  maxSize: 1000,
};

function RoomContainer() {
  const [filters, setFilters] = useState(defaultFilters);
  let { breakfast, pets, price, capacity, maxPrice, type } = filters;

  let query: TBeachResortQuery = {};

  if (pets) query.filters = { ...query.filters, pets: { $eq: true } };
  if (breakfast) query.filters = { ...query.filters, breakfast: { $eq: true } };
  if (type && type !== "all")
    query.filters = { ...query.filters, type: { $eq: type } };
  if (capacity)
    query.filters = { ...query.filters, capacity: { $eq: capacity } };

  query.filters = {
    ...query.filters,
    price: { $gte: filters.minPrice, $lte: price === -1 ? maxPrice : price },
    size: { $gte: filters.minSize, $lte: filters.maxSize },
  };

  const { rooms } = useBeachResortStrapiClient(query);

  const handleChange = (filters: TRoomFilter) => {
    setFilters(filters);
  };

  return (
    <>
      <RoomFilter filterParam={filters} onChange={handleChange} />
      <RoomListWrapper>
        <RoomList rooms={rooms} />
      </RoomListWrapper>
    </>
  );
}

const RoomListWrapper = styled.div`
  min-height: 400px;
`;

export default RoomContainer;
