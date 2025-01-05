import { all } from "axios";
import validator from "validator";

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export function refactorData(data) {
  const refactoredData = [];
  data.forEach(function (d, i) {
    const sample = { time: d.time };
    for (let i = 0; i < d.data.length; i++) {
      sample[`${d.data[i].keyword}(${d.data[i].website})`] = d.data[i].value;
    }
    refactoredData.push(sample);
  });
  return refactoredData;
}

export function isValidDomain(input) {
  return validator.isFQDN(input, {
    require_tld: true,
    allow_underscores: false,
    allow_trailing_dot: false,
  });
}

export function extractParenthesesContent(arr) {
  return arr
    .map((item) => {
      const match = item.match(/\((.*?)\)/);
      return match ? match[1] : null;
    })
    .filter(Boolean);
}

function aggregateData(data) {
  const result = [];

  data.forEach((item) => {
    // Find if the name already exists in the result array
    const existing = result.find((entry) => entry.name === item.name);

    if (existing) {
      // If it exists, sum the values
      existing.value += item.value;
    } else {
      // If not, add a new object to the result
      result.push({ name: item.name, value: item.value });
    }
  });

  return result;
}

export function filterBarChartData(data) {
  const filtered = [];
  for (let i = 0; i < data.length; i++) {
    const sample = { name: data[i].query, value: data[i].searchPairs.length };
    filtered.push(sample);
  }

  return aggregateData(filtered);
}

export function filterTableData(data) {
  const filtered = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].searchPairs.length > 0) {
      const sample = {
        keyWord: data[i].query,
        website: data[i].website,
        minRank: data[i].minRank,
        maxRank: data[i].maxRank,
        avgRank: data[i].avgRank,
        checkCount: data[i].searchPairs.length,
      };
      filtered.push(sample);
    }
  }
  return filtered;
}

function formatTimestampToDate(timestamp) {
  const date = new Date(timestamp);

  const month = date.getUTCMonth() + 1; // Months are 0-indexed, so add 1
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month}/${day}/${year}`;
}

function aggregateAndSortDates(dates) {
  // Use a Set to remove duplicates and retain unique dates
  const uniqueDates = [...new Set(dates)];

  // Sort the dates chronologically
  uniqueDates.sort((a, b) => new Date(a) - new Date(b));

  return uniqueDates;
}

export function filterLineChartData(data) {
  console.log(data);
  const filtered = [];
  let allDays = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].searchPairs.length; j++) {
      allDays.push(formatTimestampToDate(data[i].searchPairs[j].time));
    }
  }
  console.log(allDays);
  allDays = aggregateAndSortDates(allDays);
  console.log(allDays);

  for (let i = 0; i < allDays.length; i++) {
    const sample = { time: allDays[i], data: [] };
    for (let j = 0; j < data.length; j++) {
      for (let k = 0; k < data[j].searchPairs.length; k++) {
        if (formatTimestampToDate(data[j].searchPairs[k].time) === allDays[i]) {
          const sampleData = {
            keyword: data[j].query,
            website: data[j].website,
            value: data[j].searchPairs[k].rank,
          };
          sample.data.push(sampleData);
        }
      }
    }
    filtered.push(sample);
  }
  console.log(filtered);

  return filtered;
}
