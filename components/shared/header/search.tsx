import { getAllCategories } from "@/lib/actions/product.actions";
import SearchContent from "./search-content-client";

export default async function Search() {
  const categories = await getAllCategories();

  return <SearchContent categories={categories} />;
}
