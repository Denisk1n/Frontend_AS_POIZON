export interface ProductInfoModel{
   title: string;
   brand: string;
   category: string;
   price: number;
   main_image: string;
   available: string;
   images: ProductImages[];
   sizes: ProductSizes[];
}

export interface ProductImages{
   image: string;
   position: number;
}

export interface ProductSizes{
   ru: Float32Array;
   us: Float32Array;
   sm: Float32Array;
}