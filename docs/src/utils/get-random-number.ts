const getRandomNumber = (min: number, max: number, step: number): number => {
  const numSteps = Math.floor((max - min) / step);

  const stepIndex = Math.floor(Math.random() * (numSteps + 1));
  
  return min + stepIndex * step;
};

export { getRandomNumber };
