export type DocumentType = "DNI" | "RUC" | "CE" | "OTHER";

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  active: boolean;
  documentType: DocumentType;
  documentNumber: string;
  email?: string;
  phone?: string;
  address?: string;
}
