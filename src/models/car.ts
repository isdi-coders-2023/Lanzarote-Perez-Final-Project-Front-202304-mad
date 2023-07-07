export type Car = {
  id: string;
  carPhoto: CarPhoto;
  carBrand: string;
  carModel: string;
  carYear: string;
  carFuel: "gasoline" | "diesel" | "hybrid" | "electric" | "bioFuel";
  carHP: string;
};

export type CarPhoto = {
  urlOriginal: string;
  url: string;
  imageUrl: string;
  mimetype: string;
  size: number;
};
