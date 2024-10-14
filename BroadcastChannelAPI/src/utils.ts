import { UnoCard } from "./interfaces";

export const colors = ["red", "blue", "green", "yellow"];

export const generateRandomCard = (): UnoCard => {
  const numbers = Array.from({ length: 10 }, (_, index) => index);

  return {
    number: numbers[Math.floor(Math.random() * numbers.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
  };
};

export const generateRandomCards = (count: number): UnoCard[] =>
  Array.from({ length: count }, generateRandomCard);
