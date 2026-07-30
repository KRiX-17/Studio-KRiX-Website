export type Discipline = {
  number: string;
  name: string;
  description: string;
};

export const disciplines: readonly Discipline[] = [
  {
    number: "01",
    name: "Engineering",
    description: "Automotive systems, electronics and workshop technology.",
  },
  {
    number: "02",
    name: "Software",
    description: "Focused tools for Apple platforms and the web.",
  },
  {
    number: "03",
    name: "Music",
    description: "Sound shaped with the same care as code and hardware.",
  },
  {
    number: "04",
    name: "Photography",
    description: "Observing detail, material and motion.",
  },
];
