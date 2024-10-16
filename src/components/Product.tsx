import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import useWishlistDispatch from "../hooks/useWishlistDispatch";
import useWishlistState from "../hooks/useWishlistState";

import VariantPicker from "./VariantPicker";
import { Heart } from "lucide-react";

const Product = (product) => {
  const { addItem } = useWishlistDispatch();
  const { isSaved } = useWishlistState();

  const { id, name: originalName, variants } = product;
  const isMens = originalName.startsWith("Mens |"); // Check if the product is "Mens"
  const baseName = originalName.replace(/^Mens \| /, ""); // Remove "Mens |" from name
  const [firstVariant] = variants;
  const oneStyle = variants.length === 1;

  const [activeVariantExternalId, setActiveVariantExternalId] = useState(
    firstVariant.external_id
  );

  const activeVariant = variants.find(
    (v) => v.external_id === activeVariantExternalId
  );

  const activeVariantFile = activeVariant.files.find(
    ({ type }) => type === "preview"
  );

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: activeVariant.currency,
  }).format(activeVariant.retail_price);

  const addToWishlist = () => {
    addItem(product);
  };

  const onWishlist = isSaved(id);

  return (
    <article className="border border-gray-200 rounded bg-white flex flex-col relative">
      <button
        aria-label="Add to wishlist"
        className="appearance-none absolute top-0 right-0 mt-3 mr-3 text-gray-300 focus:text-gray-500 hover:text-red-500 transition focus:outline-none"
        onClick={addToWishlist}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: onWishlist ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Heart
            color={onWishlist ? "red" : "gray"}
            fill={onWishlist ? "red" : "none"}
          />
        </motion.div>
      </button>
      <div className="flex items-center justify-center flex-1 sm:flex-shrink-0 w-full p-6">
        {activeVariantFile && (
          <Image
            src={activeVariantFile.preview_url}
            width={250}
            height={250}
            alt={`${activeVariant.name} ${baseName}`}
            title={`${activeVariant.name} ${baseName}`}
          />
        )}
      </div>
      <div className="flex-1 p-6 pt-0">
        <div className="text-center">
          <p className="mb-1 font-semibold text-gray-900">{baseName}</p>
          <p className="text-sm text-gray-500">{formattedPrice}</p>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center space-x-4">
        {isMens && (
          <div className="text-center text-sm font-semibold text-blue-600">
            <p>Mens</p>
          </div>
        )}

        <div className="text-center text-sm font-medium text-gray-500 bg-gray-100 rounded px-2">
          Worldwide Shipping
        </div>
      </div>

      <div className="p-3 flex flex-col sm:flex-row justify-center items-center">
        <VariantPicker
          value={activeVariantExternalId}
          onChange={({ target: { value } }) =>
            setActiveVariantExternalId(value)
          }
          variants={variants}
          disabled={oneStyle}
        />
        <button
          className="snipcart-add-item w-full md:w-auto transition flex-shrink-0 py-2 px-4 border border-gray-300 hover:border-transparent shadow-sm text-sm font-medium bg-white text-gray-900 focus:text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:outline-none rounded"
          data-item-id={activeVariantExternalId}
          data-item-price={activeVariant.retail_price}
          data-item-url={`/api/products/${activeVariantExternalId}`}
          data-item-description={activeVariant.name}
          data-item-image={activeVariantFile.preview_url}
          data-item-name={originalName}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default Product;
