import { getAllCategories } from "@/lib/actions/product.actions";
import SearchContent from "./search-content-client";

export default async function Search() {
  // Fetch data on the server exactly as you did with the Select
  const categories = await getAllCategories();

  return <SearchContent categories={categories} />;
}
