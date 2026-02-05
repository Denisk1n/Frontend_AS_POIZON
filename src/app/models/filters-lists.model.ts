export interface Price{
   min: number;
   max: number;
}

export interface FiltersList{
   sizes:  string[];
   brands: string[];
   available: string[];
   prices: Price;
   sorted: string; 
}