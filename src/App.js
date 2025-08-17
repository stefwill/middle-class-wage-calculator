import React, { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';

const App = () => {
  const [birthYear, setBirthYear] = useState('');
  const [results, setResults] = useState(null);

  // Historical median household income data (approximate values)
  const wageData = {
    1940: 1231,
    1950: 3300,
    1960: 5600,
    1970: 8734,
    1980: 17710,
    1990: 29943,
    2000: 41990,
    2010: 49445,
    2020: 67521,
    2024: 70784
  };

  // Historical median house prices (approximate values)
  const housePriceData = {
    1940: 2938,
    1950: 7354,
    1960: 11900,
    1970: 17000,
    1980: 62200,
    1990: 122900,
    2000: 169000,
    2010: 221800,
    2020: 329000,
    2024: 420800
  };

  // CPI inflation multipliers (2024 base)
  const inflationMultipliers = {
    1940: 20.6,
    1950: 12.0,
    1960: 9.7,
    1970: 7.3,
    1980: 3.5,
    1990: 2.2,
    2000: 1.7,
    2010: 1.3,
    2020: 1.1,
    2024: 1.0
  };

  const calculateWages = () => {
    const year = parseInt(birthYear);
    if (!year || year < 1940 || year > 2010) {
      alert('Please enter a birth year between 1940 and 2010');
      return;
    }

    // Find the closest data points
    const years = Object.keys(wageData).map(Number).sort((a, b) => a - b);
    let closestYear = years.reduce((prev, curr) => 
      Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
    );

    // Calculate ages for different life stages (treating birth year as work age)
    const age18Year = year;
    const age25Year = year + 7;
    const age35Year = year + 17;
    const age45Year = year + 27;

    // Function to get wage for a specific year
    const getWageForYear = (targetYear) => {
      let dataYear = years.reduce((prev, curr) => 
        Math.abs(curr - targetYear) < Math.abs(prev - targetYear) ? curr : prev
      );
      
      // Don't extrapolate too far into the future
      if (targetYear > 2024) dataYear = 2024;
      if (targetYear < 1940) dataYear = 1940;
      
      const historicalWage = wageData[dataYear];
      const adjustedWage = historicalWage * inflationMultipliers[dataYear];
      
      return {
        year: targetYear,
        dataYear: dataYear,
        historicalWage: historicalWage,
        adjustedWage: Math.round(adjustedWage)
      };
    };

    // Function to get house price for a specific year
    const getHousePriceForYear = (targetYear) => {
      const houseYears = Object.keys(housePriceData).map(Number).sort((a, b) => a - b);
      let dataYear = houseYears.reduce((prev, curr) => 
        Math.abs(curr - targetYear) < Math.abs(prev - targetYear) ? curr : prev
      );
      
      // Don't extrapolate too far into the future
      if (targetYear > 2024) dataYear = 2024;
      if (targetYear < 1940) dataYear = 1940;
      
      const historicalPrice = housePriceData[dataYear];
      const adjustedPrice = historicalPrice * inflationMultipliers[dataYear];
      
      return {
        year: targetYear,
        dataYear: dataYear,
        historicalPrice: historicalPrice,
        adjustedPrice: Math.round(adjustedPrice)
      };
    };

    const lifeStages = [
      { age: 18, label: 'Starting Career', wageData: getWageForYear(age18Year), houseData: getHousePriceForYear(age18Year) },
      { age: 25, label: 'Early Career', wageData: getWageForYear(age25Year), houseData: getHousePriceForYear(age25Year) },
      { age: 35, label: 'Mid Career', wageData: getWageForYear(age35Year), houseData: getHousePriceForYear(age35Year) },
      { age: 45, label: 'Peak Earning Years', wageData: getWageForYear(age45Year), houseData: getHousePriceForYear(age45Year) },
      { age: 'Current', label: '2024 Data', wageData: getWageForYear(2024), houseData: getHousePriceForYear(2024) }
    ];

    setResults({
      birthYear: year,
      lifeStages: lifeStages
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">
              Middle Class Wage Calculator
            </h1>
          </div>
          
          <p className="text-gray-600 mb-8">
            Enter the year of your birth to see what middle class wages looked like throughout the career of someone who was just entering the workforce the year you were born. We calculate for 18, 25, 35, and 45, adjusted for inflation to 2024 dollars.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-end mb-8">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Birth Year
              </label>
              <input
                type="number"
                min="1940"
                max="2010"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                placeholder="e.g., 1975"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="button"
              onClick={calculateWages}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <TrendingUp size={16} />
              Calculate
            </button>
          </div>
        </div>

        {results && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="text-green-600" />
              Career Wage History for Someone Born in {results.birthYear}
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {results.lifeStages.map((stage, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <div className="text-sm font-medium text-blue-600 mb-1">
                    {stage.age === 'Current' ? 'Current (2024)' : `Age ${stage.age} (${stage.wageData.year})`}
                  </div>
                  <div className="text-lg font-bold text-gray-800 mb-4">
                    {stage.label}
                  </div>
                  
                  {/* Wages */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                      Median Income
                    </div>
                    <div className="text-xs text-gray-500">
                      Historical ({stage.wageData.dataYear}): {formatCurrency(stage.wageData.historicalWage)}
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      In 2024 dollars: {formatCurrency(stage.wageData.adjustedWage)}
                    </div>
                  </div>

                  {/* House Prices */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                      Median House Price
                    </div>
                    <div className="text-xs text-gray-500">
                      Historical ({stage.houseData.dataYear}): {formatCurrency(stage.houseData.historicalPrice)}
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      In 2024 dollars: {formatCurrency(stage.houseData.adjustedPrice)}
                    </div>
                  </div>

                  {/* Affordability Ratio */}
                  <div className="pt-3 border-t border-blue-200">
                    <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                      House Price to Income Ratio
                    </div>
                    <div className="text-sm font-bold text-purple-600">
                      {(stage.houseData.adjustedPrice / stage.wageData.adjustedWage).toFixed(1)}x annual income
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <h3 className="font-semibold text-yellow-800 mb-2">Notes:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Wages are based on median U.S. household income data</li>
                <li>• House prices are based on median U.S. home sales prices</li>
                <li>• All amounts adjusted to 2024 purchasing power using CPI inflation data</li>
                <li>• Data points are approximated from the closest available years</li>
                <li>• House price to income ratio shows housing affordability (lower is more affordable)</li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Data Sources:</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Median House Prices:</strong>
                  <br />
                  <a 
                    href="https://fred.stlouisfed.org/series/MSPUS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    FRED - Median Sales Price of Houses Sold for the United States
                  </a>
                </div>
                <div>
                  <strong>Median Household Income:</strong>
                  <br />
                  <a 
                    href="https://www.census.gov/data/tables/time-series/demo/income-poverty/historical-income-households.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    U.S. Census Bureau - Historical Income Tables
                  </a>
                </div>
                <div>
                  <strong>Inflation Data (CPI):</strong>
                  <br />
                  <a 
                    href="https://www.bls.gov/cpi/tables/supplemental-files/historical-cpi-u-202412.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Bureau of Labor Statistics - Consumer Price Index
                  </a>
                </div>
                <div>
                  <strong>Additional Reference:</strong>
                  <br />
                  <a 
                    href="https://fred.stlouisfed.org/series/MEHOINUSA646N" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    FRED Economic Data - Median Household Income
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;