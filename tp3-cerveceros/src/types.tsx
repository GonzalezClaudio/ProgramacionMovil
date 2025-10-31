export interface Conference {
    id: string;
    title: string;
    speaker: string;
    startTime: string;
    endTime: string;
    image: string | number;
    description: string;
    location: { latitude: number; longitude: number }; // nueva propiedad
  }