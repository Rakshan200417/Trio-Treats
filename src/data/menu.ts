export type Variant = { label: string; price: number };
export type MenuGroup = {
  id: string;
  name: string;
  description: string;
  priceLabel: string;
  variants?: Variant[];
  image: string;
  accent: string; // showcase background colour for this item
};

export const menu: MenuGroup[] = [
  { id: "vanilla-cake", name: "Vanilla Cake", description: "Soft, fluffy vanilla sponge for birthdays and little celebrations.", priceLabel: "from Rs. 1,500", image: "/images/vanilla-cake.jpg", accent: "#4A2A20" },
  { id: "chocolate-cake", name: "Chocolate Cake", description: "Rich chocolate cake with custom white chocolate lettering and hearts.", priceLabel: "from Rs. 1,800", image: "/images/chocolate-cake.jpg", accent: "#3A1F17" },
  { id: "cupcakes", name: "Cupcakes", description: "Vanilla and chocolate cupcakes, priced each.", priceLabel: "from Rs. 100",
    variants: [{ label: "Vanilla", price: 100 }, { label: "Chocolate", price: 120 }], image: "/images/cupcakes.jpg", accent: "#5A2F3A" },
  { id: "brownies", name: "Brownies ×6", description: "Fudgy, crackly brownies in a box of six.", priceLabel: "from Rs. 1,000",
    variants: [{ label: "Regular", price: 1000 }, { label: "Choco chip", price: 1200 }, { label: "Chocolate coated", price: 1200 }, { label: "Nut coated", price: 1600 }], image: "/images/brownies.jpg", accent: "#33241A" },
  { id: "blondies", name: "Blondies ×6", description: "Golden, buttery blondies, baked fresh.", priceLabel: "Rs. 1,000", image: "/images/blondies.jpg", accent: "#3F4A2F" },
  { id: "brownie-cake", name: "Brownie Cake ½ kg", description: "A brownie cake built for celebrations, with your own message and toppings.", priceLabel: "Rs. 3,500", image: "/images/brownie-cake.jpg", accent: "#2F1C16" },
];
