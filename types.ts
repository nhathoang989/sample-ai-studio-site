
export interface UserInput {
  fullName: string;
  birthDate: string;
  birthHour: string;
  gender: 'Nam' | 'Nữ';
}

export interface PalaceInfo {
  name: string;
  meaning: string;
  description: string;
}

export interface HoroscopeData {
  summary: {
    lunarDate: string;
    destinyElement: string; // Mệnh
    zodiacAnimal: string;
    generalComment: string;
  };
  palaces: PalaceInfo[];
  career: string;
  wealth: string;
  love: string;
  health: string;
  currentYearForecast: string;
}

export enum LoadingStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
