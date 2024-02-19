export const usePrice = () => {
  const price = process.env.NEXT_PUBLIC_PRICE;

  if (!price) throw new Error("NEXT_PUBLIC_PRICE is not set");

  return parseFloat(price);
};
