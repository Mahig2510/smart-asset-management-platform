export interface Asset {
  _id: string;
  assetId: string;
  name: string;
  description: string;

  category: {
    _id: string;
    name: string;
  };

  totalQuantity: number;

  availableQuantity: number;

  maintenanceNotes: string;

  serialNumber: string;

  purchaseCost: number;

  location: string;

  status: string;

  condition: string;

  createdAt: string;
  updatedAt: string;

  qrCode?: string;
}