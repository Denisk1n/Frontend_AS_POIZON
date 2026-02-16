export interface StaticData{
   
   brands: AllBrands[];
   sneakerSizes: AllSneakerSizes[];
   clotheSizes: string[];
   

}

export interface AllBrands{
   brand: string;
}

export interface AllSneakerSizes{
   ru: Float32Array;
   us: Float32Array;
   sm: Float32Array;
}