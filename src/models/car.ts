export type Car = {
  id: string;
  carPhoto: CarPhoto;
  carBrand: string;
  carModel: string;
  carYear: string;
  carFuel: string;
  carHP: string;
};

export type CarPhoto = {
  urlOriginal: string;
  url: string;
  imageUrl: string;
  mimetype: string;
  size: number;
};
