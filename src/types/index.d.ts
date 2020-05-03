export type Reason =
  | 'travail'
  | 'courses'
  | 'sante'
  | 'famille'
  | 'sport'
  | 'judiciaire'
  | 'missions'

export interface FormState {
  firstname?: string;
  lastname?: string;
  birthday?: string;
  birthplace?: string;
  address?: string;
  town?: string;
  zipcode?: string;
  reasons?: Reason[];
  date?: string;
  time?: string;
}
