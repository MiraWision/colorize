const getRandomHexColor = () => {
  const randomColor = Math.floor(Math.random() * 0xFFFFFF);

  return `#${randomColor.toString(16).padStart(6, '0').toUpperCase()}`;
};

export { getRandomHexColor };