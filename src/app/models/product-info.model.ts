export interface ProductInfoModel{
   title: string;
   brand: string;
   category: string;
   description: string;
   price: number;
   main_image: string;
   available: string;
   images: ProductImages[];
   sizes: ProductSizes[];
}

export interface ProductImages{
   image: string;
   position: number;
   delete: boolean;
}

export interface ProductSizes{
   ru: Float32Array;
   us: Float32Array;
   sm: Float32Array;
}


export interface ProductCreateModel{
   id: number;
   title: string;
   brand: string;
   category: string;
   description: string;
   price: number;
   main_image: string;
   available: string;
   images: ProductImages[];
   sizes: ProductSizes[];
}