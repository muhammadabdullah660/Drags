import { CategoryContainer, Title } from "./category-style.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/productCard";
import { useSelector } from "react-redux";
import Spinner from "../../Components/Spinner/spinner";
import {
  selectCategoriesMap,
  selectIsLoading,
} from "../../Store/Categories/categorySelector";
export default function Category() {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);

  const { category } = useParams();
  const [categoryItems, setCategoryItems] = useState(categoriesMap[category]);
  useEffect(() => {
    setCategoryItems(categoriesMap[category]);
  }, [categoriesMap, category]);
  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {categoryItems &&
            categoryItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </>
  );
}
