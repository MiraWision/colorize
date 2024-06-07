const getRandomHexColor = () => {
  const randomColor = Math.floor(Math.random() * 0xFFFFFF);

  return `#${randomColor.toString(16).padStart(6, '0').toLowerCase()}`;
};

const getRandomHexaColor = () => {
  const randomColor = Math.floor(Math.random() * 0xFFFFFF);
  const opacity = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');

  return `#${randomColor.toString(16).padStart(6, '0').toLowerCase()}${opacity.toLowerCase()}`;
};

const getRandomRgbColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
};

const getRandomRgbaColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = Math.random().toFixed(2);

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export { getRandomHexColor, getRandomHexaColor, getRandomRgbColor, getRandomRgbaColor };
