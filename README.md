# Middle Class Wage Calculator

A React application that shows how middle class wages and house prices have changed over time, adjusted for inflation.

## Features

- Enter birth year to see wage progression throughout career
- Shows median income and house prices for ages 18, 25, 35, 45, and current (2024)
- All amounts adjusted for inflation to 2024 dollars
- Includes house price to income ratio for affordability analysis
- Links to official government data sources

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/middle-class-wage-calculator.git
cd middle-class-wage-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

### Deploying to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub username
2. Run the deploy command:
```bash
npm run deploy
```

## Data Sources

- **Median House Prices**: FRED - Federal Reserve Economic Data
- **Median Household Income**: U.S. Census Bureau Historical Income Tables
- **Inflation Data**: Bureau of Labor Statistics Consumer Price Index

## License

This project is open source and available under the MIT License.