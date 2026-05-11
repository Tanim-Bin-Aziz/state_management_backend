export type Property = {
  id: number;
  title: string;
  lat: number;
  lng: number;

  plotDetails: {
    plotOwnerName: string;
    plotSize: string;
    address: string;
    plotPhoto: string;
  };

  flatDetails: {
    flatSize: {
      type: string;
      size: string;
    }[];
    flatPlan: string[];
  };

  salesInformation: {
    totalFlats: number;
    soldFlats: number;
  };
};
