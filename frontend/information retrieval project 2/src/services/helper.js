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
