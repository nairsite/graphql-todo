import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const PRODUCTS_QUERY = gql`
  query Query {
    products {
      id
      name
      price
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $price: Int!) {
    addProduct(name: $name, price: $price) {
      name
      price
    }
  }
`;

const Products = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const { loading, error, data,refetch } = useQuery(PRODUCTS_QUERY);

  const [addProduct] = useMutation(ADD_PRODUCT, {
    variables: { name: name, price: parseInt(price) },
  });



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;



  return (
    <div>
      <h2>Products</h2>
      <input
        type="text"
        placeholder="Enter Product"
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Enter Price"
        onChange={(e) => setPrice(e.target.value)}
      ></input>
      <button onClick={()=>{addProduct();refetch()}}>Add</button>

      {data.products.map((product) => (
        <div key={product.id}>
          {product.name} - {product.price}
        </div>
      ))}
    </div>
  );
};

export default Products;
