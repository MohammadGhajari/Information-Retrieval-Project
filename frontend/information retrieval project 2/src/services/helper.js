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
  console.log("----");
  console.log(data);
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
