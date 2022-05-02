import axios from "axios";
import useSWR from "swr";
const qs = require("qs");

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

const formatData = (data): TBeachResortRoom => {
  if (!data) return null;

  return {
    id: data.id,
    ...data.attributes,
  };
};

export const useBeachResortStrapiClient = (query?: TBeachResortQuery) => {
  let queryString = "";

  if (query && Object.keys(query).length > 0) {
    queryString = `?${qs.stringify(query, {
      encodeValuesOnly: true,
    })}`;
  }

  const { data, error, isValidating } = useSWR(
    `http://localhost:1337/api/beach-resort-rooms${queryString}`,
    fetcher,
  );

  let rooms: TBeachResortRoom[] = [];
  let room: TBeachResortRoom | null = null;

  const isArray = Array.isArray(data);

  if (isArray) rooms = data.map(formatData);
  if (!isArray) room = formatData(data);

  return {
    rooms,
    room,
    error,
    loading: isValidating,
  };
};
