// src/components/SearchVillages.tsx
import React, { useState } from "react";

// 🔹 Type definition for a village object
interface Village {
  name: string;
  population: number;
  farmers: number;
}

// 🔹 Mock village data with district keys
const villageDatabase: { [key: string]: Village[] } = {
  "lucknow": [
    { name: "Krishnapur", population: 2500, farmers: 180 },
    { name: "Ramgarh", population: 3200, farmers: 220 },
    { name: "Devipur", population: 1800, farmers: 120 },
    { name: "Sundarpur", population: 2100, farmers: 150 },
    { name: "Gopalpur", population: 2800, farmers: 200 }
  ],
  "kanpur": [
    { name: "Mahila Mandal", population: 3000, farmers: 250 },
    { name: "Green Valley", population: 2400, farmers: 180 },
    { name: "Lakshmipur", population: 1900, farmers: 140 },
    { name: "Shivapur", population: 2600, farmers: 190 },
    { name: "Gokulpur", population: 2200, farmers: 160 }
  ],
  "varanasi": [
    { name: "Prayagraj", population: 3500, farmers: 280 },
    { name: "Azamgarh", population: 2700, farmers: 210 },
    { name: "Jaunpur", population: 2300, farmers: 170 },
    { name: "Sultanpur", population: 2000, farmers: 150 },
    { name: "Gorakhpur", population: 3100, farmers: 240 }
  ],
  "prayagraj": [
    { name: "Karchana", population: 2800, farmers: 220 },
    { name: "Sagri", population: 2400, farmers: 180 },
    { name: "Shahganj", population: 1900, farmers: 140 },
    { name: "Kadipur", population: 2600, farmers: 200 },
    { name: "Sahjanwa", population: 2200, farmers: 170 }
  ],
  "gorakhpur": [
    { name: "Sundarpur", population: 3200, farmers: 250 },
    { name: "Devipur", population: 2100, farmers: 160 },
    { name: "Lakshmipur", population: 2800, farmers: 220 },
    { name: "Gopalpur", population: 2400, farmers: 180 },
    { name: "Krishnapur", population: 3000, farmers: 230 }
  ]
};

const SearchVillages: React.FC = () => {
  const [inputDistrict, setInputDistrict] = useState<string>("");
  const [results, setResults] = useState<Village[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  const handleSearch = () => {
    const districtKey = inputDistrict.trim().toLowerCase();

    if (!districtKey) {
      setFeedback("Please enter a valid district name.");
      setResults([]);
      return;
    }

    setLoading(true);
    setResults([]);
    setFeedback("");

    setTimeout(() => {
      const foundVillages = villageDatabase[districtKey];

      if (Array.isArray(foundVillages)) {
        setResults(foundVillages);
      } else {
        setFeedback("No data found for this district.");
      }

      setLoading(false);
    }, 400);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Village Finder</h1>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter district name"
          value={inputDistrict}
          onChange={(e) => setInputDistrict(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
  onClick={handleSearch}
  disabled={loading}
  className={`px-4 py-2 font-semibold text-white rounded-md transition-colors duration-300 ${
    loading
      ? "bg-green-300 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700 active:bg-green-800"
  }`}
>
  {loading ? "Searching..." : "Search"}
</button>

      </div>

      {feedback && <p className="text-red-600 text-center mb-4">{feedback}</p>}

      {!loading && results.length > 0 && (
        <ul className="space-y-2">
          {results.map((village, idx) => (
            <li
              key={idx}
              className="p-3 border border-gray-200 rounded-md bg-gray-50 shadow-sm"
            >
              <strong className="text-blue-700">{village.name}</strong> — Population:{" "}
              {typeof village.population === "number" ? village.population : "N/A"}, Farmers:{" "}
              {typeof village.farmers === "number" ? village.farmers : "N/A"}
            </li>
          ))}
        </ul>
      )}

      {!loading && !feedback && results.length === 0 && inputDistrict.trim() && (
        <p className="text-gray-500 text-center">No villages found for this district.</p>
      )}
    </div>
  );
};

export default SearchVillages;
