export type Car = {
  id: string;
  carPhoto: CarPhoto;
  carBrand: string;
  carModel: string;
  carYear: string;
  carHP: string;
};

export type CarPhoto = {
  urlOriginal: string;
  url: string;
  mimetype: string;
  size: number;
};
