import Title from "../components/Title";
import { useBeachResortStrapiClient } from "../hooks/useBeachResortStrapiClient";

// Get all unique values
const getUnique = (items: TBeachResortRoom[], value) => [
  ...new Set(items.map((item) => item[value])),
];

const nums: TRoomFilterKey[] = ["price", "capacity", "maxSize", "minSize"];

const bools: TRoomFilterKey[] = ["breakfast", "pets"];

export default function RoomsFilter({
  filterParam: state,
  onChange,
}: {
  filterParam: TRoomFilter;
  onChange: (state: TRoomFilter) => void;
}) {
  const { rooms } = useBeachResortStrapiClient();

  let {
    price,
    type,
    breakfast,
    pets,
    capacity,
    maxPrice,
    minPrice,
    maxSize,
    minSize,
  } = state;

  maxSize = Math.max(...rooms.map((r) => r.size));
  maxPrice = Math.max(...rooms.map((r) => r.price));

  if (minSize > maxSize) minSize = maxSize;
  if (price === -1) price = maxPrice;

  // Get unique types and add 'all'
  const types = ["all", ...getUnique(rooms, "type")];
  const people = getUnique(rooms, "capacity").sort((a, b) => a - b);
  people.unshift(0);

  const raiseChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let newState = { ...state };

    if (nums.includes(name)) newState[name] = +value;
    else if (bools.includes(name)) newState[name] = !newState[name];
    else newState[name] = value;

    onChange(newState);
  };

  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/*Select type*/}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={raiseChange}
          >
            {types.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {/*End of select type*/}
        {/* Guest */}
        <div className="form-group">
          <label htmlFor="capacity">room capacity</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className="form-control"
            onChange={raiseChange}
          >
            {people.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {/* End of guest */}
        {/* Room price */}
        <div className="form-group">
          <label htmlFor="capacity">room price ${price}</label>
          <input
            type="range"
            name="price"
            id="price"
            value={price}
            className="form-control"
            onChange={raiseChange}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        {/* End of room price */}
        {/* Size */}
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              min="0"
              id="size"
              value={minSize}
              onChange={raiseChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              id="size"
              value={maxSize}
              onChange={raiseChange}
              className="size-input"
            />
          </div>
        </div>
        {/* End of size */}
        {/* Extras */}
        <div className="form-g">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={raiseChange}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={raiseChange}
            />
            <label htmlFor="pets">pets</label>
          </div>
        </div>
        {/* End of extras */}
      </form>
    </section>
  );
}
