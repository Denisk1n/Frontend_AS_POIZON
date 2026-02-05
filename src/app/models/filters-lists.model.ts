export interface Price{
   min: number;
   max: number;
}

export interface FiltersList{
   sizes:  number[];
   brands: string[];
   available: string[];
   price: Price;
   sorted: string; 
}