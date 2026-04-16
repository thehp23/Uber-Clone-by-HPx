import React from "react";

const LocationPanel = ({ suggestions, setValue, closePanel }) => {
  return (
    <div className="absolute w-full bg-white shadow-md rounded mt-1 max-h-40 overflow-y-auto z-10">
      {suggestions && suggestions.length > 0 ? (
        suggestions.map((loc, index) => (
          <div
            key={index}
            onClick={() => {
              setValue(loc.name);
              closePanel();
            }}
            className="p-2 hover:bg-gray-100 cursor-pointer border-b"
          >
            {loc.name}
          </div>
        ))
      ) : (
        <div className="p-2 text-gray-500 text-sm">
          No results found
        </div>
      )}
    </div>
  );
};

export default LocationPanel;