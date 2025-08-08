import React, { useState, useEffect } from "react";

// Energy unit definitions (all values in Joules)
const ENERGY_UNITS = {
  J: { name: "Joules", factor: 1 },
  kJ: { name: "Kilojoules", factor: 1000 },
  cal: { name: "Calories", factor: 4.184 },
  kcal: { name: "Kilocalories", factor: 4184 },
  BTU: { name: "British Thermal Units", factor: 1055.06 },
  Wh: { name: "Watt-hours", factor: 3600 },
  kWh: { name: "Kilowatt-hours", factor: 3600000 },
} as const;

// Data unit definitions (all values in bits)
const DATA_UNITS = {
  b: { name: "Bits", factor: 1 },
  B: { name: "Bytes", factor: 8 },
  Kb: { name: "Kilobits", factor: 1000 },
  KB: { name: "Kilobytes", factor: 8000 },
  Mb: { name: "Megabits", factor: 1000000 },
  MB: { name: "Megabytes", factor: 8000000 },
  Gb: { name: "Gigabits", factor: 1000000000 },
  GB: { name: "Gigabytes", factor: 8000000000 },
  Tb: { name: "Terabits", factor: 1000000000000 },
  TB: { name: "Terabytes", factor: 8000000000000 },
  KiB: { name: "Kibibytes (Binary)", factor: 8192 },
  MiB: { name: "Mebibytes (Binary)", factor: 8388608 },
  GiB: { name: "Gibibytes (Binary)", factor: 8589934592 },
  TiB: { name: "Tebibytes (Binary)", factor: 8796093022208 },
} as const;

// Distance unit definitions (all values in meters)
const DISTANCE_UNITS = {
  mm: { name: "Millimeters", factor: 0.001 },
  cm: { name: "Centimeters", factor: 0.01 },
  m: { name: "Meters", factor: 1 },
  km: { name: "Kilometers", factor: 1000 },
  in: { name: "Inches", factor: 0.0254 },
  ft: { name: "Feet", factor: 0.3048 },
  yd: { name: "Yards", factor: 0.9144 },
  mi: { name: "Miles", factor: 1609.344 },
  nmi: { name: "Nautical Miles", factor: 1852 },
} as const;

// Weight unit definitions (all values in grams)
const WEIGHT_UNITS = {
  mg: { name: "Milligrams", factor: 0.001 },
  g: { name: "Grams", factor: 1 },
  kg: { name: "Kilograms", factor: 1000 },
  t: { name: "Metric Tons", factor: 1000000 },
  oz: { name: "Ounces", factor: 28.3495 },
  lb: { name: "Pounds", factor: 453.592 },
  st: { name: "Stones", factor: 6350.29 },
  ton: { name: "Imperial Tons", factor: 1016046.9 },
} as const;

// Volume unit definitions (all values in liters)
const VOLUME_UNITS = {
  ml: { name: "Milliliters", factor: 0.001 },
  l: { name: "Liters", factor: 1 },
  "m³": { name: "Cubic Meters", factor: 1000 },
  "cm³": { name: "Cubic Centimeters", factor: 0.001 },
  "fl oz": { name: "Fluid Ounces (US)", factor: 0.0295735 },
  cup: { name: "Cups (US)", factor: 0.236588 },
  pt: { name: "Pints (US)", factor: 0.473176 },
  qt: { name: "Quarts (US)", factor: 0.946353 },
  gal: { name: "Gallons (US)", factor: 3.78541 },
  "fl oz (UK)": { name: "Fluid Ounces (UK)", factor: 0.0284131 },
  "pt (UK)": { name: "Pints (UK)", factor: 0.568261 },
  "gal (UK)": { name: "Gallons (UK)", factor: 4.54609 },
} as const;

type ConversionCategory = "energy" | "data" | "distance" | "weight" | "volume";
type EnergyUnit = keyof typeof ENERGY_UNITS;
type DataUnit = keyof typeof DATA_UNITS;
type DistanceUnit = keyof typeof DISTANCE_UNITS;
type WeightUnit = keyof typeof WEIGHT_UNITS;
type VolumeUnit = keyof typeof VOLUME_UNITS;

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<ConversionCategory>("energy");
  const [inputValue, setInputValue] = useState<string>("");
  const [sourceUnit, setSourceUnit] = useState<
    EnergyUnit | DataUnit | DistanceUnit | WeightUnit | VolumeUnit
  >("kJ");
  const [targetUnit, setTargetUnit] = useState<
    EnergyUnit | DataUnit | DistanceUnit | WeightUnit | VolumeUnit
  >("kcal");
  const [result, setResult] = useState<string>("");

  // Reset units when category changes
  useEffect(() => {
    if (category === "energy") {
      setSourceUnit("kJ");
      setTargetUnit("kcal");
    } else if (category === "data") {
      setSourceUnit("B");
      setTargetUnit("KB");
    } else if (category === "distance") {
      setSourceUnit("m");
      setTargetUnit("km");
    } else if (category === "weight") {
      setSourceUnit("kg");
      setTargetUnit("lb");
    } else if (category === "volume") {
      setSourceUnit("l");
      setTargetUnit("gal");
    }
    setResult("");
  }, [category]);

  // Auto-convert whenever input or units change
  useEffect(() => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue) || inputValue.trim() === "") {
      setResult("");
      return;
    }

    try {
      let convertedValue: number;

      if (category === "energy") {
        // Convert through Joules as base unit
        const sourceInJoules =
          numValue * ENERGY_UNITS[sourceUnit as EnergyUnit].factor;
        convertedValue =
          sourceInJoules / ENERGY_UNITS[targetUnit as EnergyUnit].factor;
      } else if (category === "data") {
        // Convert through bits as base unit
        const sourceInBits =
          numValue * DATA_UNITS[sourceUnit as DataUnit].factor;
        convertedValue =
          sourceInBits / DATA_UNITS[targetUnit as DataUnit].factor;
      } else if (category === "distance") {
        // Convert through meters as base unit
        const sourceInMeters =
          numValue * DISTANCE_UNITS[sourceUnit as DistanceUnit].factor;
        convertedValue =
          sourceInMeters / DISTANCE_UNITS[targetUnit as DistanceUnit].factor;
      } else if (category === "weight") {
        // Convert through grams as base unit
        const sourceInGrams =
          numValue * WEIGHT_UNITS[sourceUnit as WeightUnit].factor;
        convertedValue =
          sourceInGrams / WEIGHT_UNITS[targetUnit as WeightUnit].factor;
      } else if (category === "volume") {
        // Convert through liters as base unit
        const sourceInLiters =
          numValue * VOLUME_UNITS[sourceUnit as VolumeUnit].factor;
        convertedValue =
          sourceInLiters / VOLUME_UNITS[targetUnit as VolumeUnit].factor;
      } else {
        setResult("Conversion error occurred");
        return;
      }

      // Format result with appropriate precision
      const formattedResult =
        convertedValue < 0.001
          ? convertedValue.toExponential(6)
          : convertedValue.toLocaleString(undefined, {
              maximumFractionDigits: 8,
              minimumFractionDigits: convertedValue % 1 === 0 ? 0 : 2,
            });

      setResult(formattedResult);
    } catch {
      setResult("Conversion error occurred");
    }
  }, [inputValue, sourceUnit, targetUnit, category]);

  const swapUnits = () => {
    const temp = sourceUnit;
    setSourceUnit(targetUnit);
    setTargetUnit(temp);
  };

  const clearAll = () => {
    setInputValue("");
    setResult("");
  };

  const copyResult = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
      } catch (err) {
        console.error("Failed to copy result:", err);
      }
    }
  };

  const getCurrentUnits = () => {
    switch (category) {
      case "energy":
        return ENERGY_UNITS;
      case "data":
        return DATA_UNITS;
      case "distance":
        return DISTANCE_UNITS;
      case "weight":
        return WEIGHT_UNITS;
      case "volume":
        return VOLUME_UNITS;
      default:
        return ENERGY_UNITS;
    }
  };

  const currentUnits = getCurrentUnits();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Unit Converter</h1>
      <p className="text-gray-600 mb-8">
        Convert between different units of measurement across multiple
        categories in real-time. Supports Energy, Data Storage, Distance,
        Weight, and Volume units with high precision calculations.
      </p>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Conversion Category
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { value: "energy", label: "Energy Units", icon: "⚡" },
              { value: "data", label: "Data/Storage Units", icon: "💾" },
              { value: "distance", label: "Distance Units", icon: "📏" },
              { value: "weight", label: "Weight Units", icon: "⚖️" },
              { value: "volume", label: "Volume Units", icon: "🧊" },
            ].map((cat) => (
              <label key={cat.value} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={cat.value}
                  checked={category === cat.value}
                  onChange={(e) =>
                    setCategory(e.target.value as ConversionCategory)
                  }
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-lg mr-2">{cat.icon}</span>
                <span className="text-gray-700">{cat.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Input Value */}
        <div className="mb-6">
          <label
            htmlFor="input-value"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Value to Convert
          </label>
          <input
            type="number"
            id="input-value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a number..."
            step="any"
          />
        </div>

        {/* Unit Selection */}
        <div className="mb-6">
          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-5 gap-3 items-end">
            {/* Source Unit */}
            <div className="col-span-2">
              <label
                htmlFor="source-unit"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                From Unit
              </label>
              <select
                id="source-unit"
                value={sourceUnit}
                onChange={(e) =>
                  setSourceUnit(
                    e.target.value as
                      | EnergyUnit
                      | DataUnit
                      | DistanceUnit
                      | WeightUnit
                      | VolumeUnit
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(currentUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {key} - {unit.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="col-span-1 flex justify-center">
              <button
                onClick={swapUnits}
                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-gray-300 hover:border-blue-300"
                aria-label="Swap units"
                title="Swap units"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </button>
            </div>

            {/* Target Unit */}
            <div className="col-span-2">
              <label
                htmlFor="target-unit"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                To Unit
              </label>
              <select
                id="target-unit"
                value={targetUnit}
                onChange={(e) =>
                  setTargetUnit(
                    e.target.value as
                      | EnergyUnit
                      | DataUnit
                      | DistanceUnit
                      | WeightUnit
                      | VolumeUnit
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(currentUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {key} - {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {/* Source Unit */}
            <div>
              <label
                htmlFor="source-unit-mobile"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                From Unit
              </label>
              <select
                id="source-unit-mobile"
                value={sourceUnit}
                onChange={(e) =>
                  setSourceUnit(
                    e.target.value as
                      | EnergyUnit
                      | DataUnit
                      | DistanceUnit
                      | WeightUnit
                      | VolumeUnit
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(currentUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {key} - {unit.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-gray-300 hover:border-blue-300"
                aria-label="Swap units"
                title="Swap units"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
                <span className="text-sm">Swap</span>
              </button>
            </div>

            {/* Target Unit */}
            <div>
              <label
                htmlFor="target-unit-mobile"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                To Unit
              </label>
              <select
                id="target-unit-mobile"
                value={targetUnit}
                onChange={(e) =>
                  setTargetUnit(
                    e.target.value as
                      | EnergyUnit
                      | DataUnit
                      | DistanceUnit
                      | WeightUnit
                      | VolumeUnit
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(currentUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {key} - {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Result Display */}
        {result && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Conversion Result
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={copyResult}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy
                </button>
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-600 hover:text-gray-700 flex items-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Clear
                </button>
              </div>
            </div>
            <div className="p-4 rounded-md border text-lg font-mono bg-green-50 border-green-200 text-green-800">
              <span>
                <strong>
                  {inputValue} {sourceUnit}
                </strong>{" "}
                ={" "}
                <strong>
                  {result} {targetUnit}
                </strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            ⚡ Energy Units
          </h3>
          <p className="text-blue-700 text-sm">
            Converts between Joules, calories, BTU, and watt-hours. Useful for
            physics calculations, nutrition planning, and energy consumption
            analysis.
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-green-900 mb-2">
            💾 Data Storage Units
          </h3>
          <p className="text-green-700 text-sm">
            Handles both decimal (1000-based) and binary (1024-based) data
            units. Perfect for file sizes, storage capacity, and bandwidth
            calculations.
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-purple-900 mb-2">
            📏 Distance Units
          </h3>
          <p className="text-purple-700 text-sm">
            Converts between metric and imperial distance measurements including
            meters, kilometers, feet, miles, and nautical miles.
          </p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-orange-900 mb-2">
            ⚖️ Weight Units
          </h3>
          <p className="text-orange-700 text-sm">
            Handles metric and imperial weight conversions including grams,
            kilograms, pounds, ounces, stones, and tons.
          </p>
        </div>

        <div className="bg-cyan-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-cyan-900 mb-2">
            🧊 Volume Units
          </h3>
          <p className="text-cyan-700 text-sm">
            Converts between metric and imperial volume measurements including
            liters, cubic meters, gallons, cups, and fluid ounces.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 lg:col-span-1">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            🔧 More Categories
          </h3>
          <p className="text-gray-700 text-sm">
            This converter supports comprehensive unit conversions across
            multiple measurement categories with high precision calculations.
          </p>
        </div>
      </div>

      {/* Usage Tips */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          💡 Usage Tips
        </h3>
        <ul className="text-gray-700 text-sm space-y-1">
          <li>• Conversion happens automatically as you type</li>
          <li>• Use the swap button ⇄ to quickly exchange units</li>
          <li>
            • Select different categories: Energy, Data, Distance, Weight,
            Volume
          </li>
          <li>• Use decimal points for fractional values (e.g., 1.5, 0.25)</li>
          <li>• Results show up to 8 decimal places for precision</li>
          <li>
            • Binary units (KiB, MiB, GiB, TiB) use 1024-based calculations
          </li>
          <li>• Volume units include both US and UK imperial measurements</li>
          <li>• Click "Copy" to quickly copy results to your clipboard</li>
          <li>• Very small numbers are displayed in scientific notation</li>
        </ul>
      </div>
    </div>
  );
};

export default UnitConverter;
