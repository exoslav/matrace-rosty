const formatePrice = (price) => {
  const p = price.toFixed();
  return p.split("").reverse().reduce((acc, price, i) => {
    return  price === "-"
      ? acc
      : price + (i && !(i % 3) ? " " : "") + acc;
  }, "");
}

export default formatePrice;
