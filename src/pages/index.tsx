import * as React from "react";
import { GetStaticProps } from "next";
import shuffle from "lodash.shuffle";
import { printful } from "../lib/printful-client";
import { formatVariantName } from "../lib/format-variant-name";
import { PrintfulProduct } from "../types";
import ProductGrid from "../components/ProductGrid";

type IndexPageProps = {
  products: PrintfulProduct[];
};

const IndexPage: React.FC<IndexPageProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedGender, setSelectedGender] = React.useState("All");

  const filteredProducts = products.filter((product) => {
    const name = product.name.toLowerCase();
    const genderFilter =
      selectedGender === "All" ||
      name.startsWith(`${selectedGender} |`.toLowerCase());
    return genderFilter && name.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded px-4 py-2 w-full md:w-1/2 lg:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="border rounded pr-10 py-2"
          >
            <option value="All">All</option>
            <option value="Mens">Mens</option>
            <option value="Womens">Womens</option>
          </select>
        </div>

        <div
          className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
          style={{ backgroundImage: `url(/images/Untitled-1.png)` }}
        >
          <div className="h-full w-full flex flex-col justify-center items-center text-center">
            <div className="font-bold text-3xl sm:text-4xl lg:text-6xl sm:max-w-xl max-w-xs">
              Discover Your Next Favorite Style!
            </div>
          </div>
        </div>
      </div>

      <ProductGrid products={filteredProducts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { result: productIds } = await printful.get("sync/products");

  const allProducts = await Promise.all(
    productIds.map(async ({ id }) => await printful.get(`sync/products/${id}`))
  );

  const products: PrintfulProduct[] = allProducts.map(
    ({ result: { sync_product, sync_variants } }) => ({
      ...sync_product,
      variants: sync_variants.map(({ name, ...variant }) => ({
        name: formatVariantName(name),
        ...variant,
      })),
    })
  );

  return {
    props: {
      products: shuffle(products),
    },
  };
};

export default IndexPage;
