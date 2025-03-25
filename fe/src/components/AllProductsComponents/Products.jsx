import { Grid, Image } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import CardSkeleton from "./CardSkeleton";
import { useLocation, useSearchParams, useSubmit } from "react-router-dom";
import { ProductCard } from "./ProductCard.tsx";
import Pagination from "./Pagination.jsx";
import { AuthContext } from "../../Context/AuthContext.jsx";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  const { isAuth, logout, user, token } = useContext(AuthContext);

  const categoryParamas = {
    category_values: searchParams.getAll("category_values"),
    brand_name: searchParams.getAll("brand_name"),
    _sort: searchParams.get("order") && "price",
    _order: searchParams.get("order"),
    _page: searchParams.get("page") || 1,
    _limit: 9,
  };

  const getProduct = async (categoryParams) => {
    setLoading(true);
    setError(false);
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/getproducts?category_values=${categoryParams.category_values}&brand_name=${categoryParams.brand_name}&_sort=${categoryParams._sort}&_order=${categoryParams._order}&_page=${categoryParams._page}&_limit=${categoryParams._limit}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setProducts(response.data);
        setTotalProductsCount(response.total);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    document.title = "Products Page";
    if(isAuth){
     getProduct(categoryParamas);
    }
  }, [isAuth,location.search]);

  return loading ? (
    <>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap={2}
        rowGap={6}
        mt={8}
        mx={"auto"}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <CardSkeleton key={item} />
        ))}
      </Grid>
    </>
  ) : error ? (
    <Image
      width={"200px"}
      display={"flex"}
      margin={"100px auto"}
      src={
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGMyanI4bjIzZ3Zib2MxYTZoZTludndqdDZud2d6NDg2Y3dwcXZocSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TqiwHbFBaZ4ti/giphy.gif"
      }
      alt={"Error Image"}
    />
  ) : (
    <>
      {products?.length && (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1,1fr)",
            md: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          }}
          gap={2}
          rowGap={6}
          mt={8}
          mx={"auto"}
        >
          {products?.map(
            (item, idx) =>
              item.id !== "0z5ON4w" && <ProductCard key={item.id} {...item} />
          )}
        </Grid>
      )}
      {totalProductsCount > 0 && <Pagination total={totalProductsCount} />}
      
    </>
  );
};

export default Products;