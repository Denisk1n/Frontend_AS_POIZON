export interface Price{
   min: number;
   max: number;
}

export interface FiltersList{
   sizes_list:  Set<string>;
   brand_list: Set<string>;
   status_list: Set<string>;
   prices: Price;
   sorted: string; 
}