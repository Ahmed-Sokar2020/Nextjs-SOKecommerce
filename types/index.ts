import {
  CartSchema,
  OrderItemSchema,
  ProductInputSchema,
  ShippingAddressSchema,
} from "@/lib/validator";
import { z } from "zod";

export type IProductInput = z.infer<typeof ProductInputSchema>;

export type Data = {
  // settings: ISettingInput[]
  // webPages: IWebPageInput[]
  // users: IUserInput[]
  // reviews: {
  //   title: string
  //   rating: number
  //   comment: string
  // }[]
  products: IProductInput[];
  headerMenus: {
    name: string;
    href: string;
  }[];
  carousels: {
    image: string;
    url: string;
    title: string;
    buttonCaption: string;
    isPublished: boolean;
  }[];
};

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Cart = z.infer<typeof CartSchema>;

export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;
