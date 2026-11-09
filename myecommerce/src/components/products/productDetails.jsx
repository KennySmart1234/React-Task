
// import { useParams, Link } from "react-router-dom";
// import { useGetProductByIdQuery } from "../../api/dummyDataApi";

// const ProductDetails = () => {

//   // Get the product ID from the URL
//   const { id } = useParams();

//   // Get that particular product
//   const {
//     data: product,
//     isLoading,
//     isError
//   } = useGetProductByIdQuery(id);

//   if (isLoading) {
//     return <h1>Loading product...</h1>;
//   }

//   if (isError) {
//     return <h1>Something went wrong.</h1>;
//   }

//   return (
//     <div className="p-8">

//       {/* Back to products */}
//       <Link
//         to="/products"
//         className="text-blue-600 hover:underline"
//       >
//         ← Back to Products
//       </Link>

//       <div className="max-w-4xl mx-auto mt-8">

//         <img
//           src={product.images[0]}
//           alt={product.title}
//           className="w-full max-w-md h-80 object-cover rounded-lg"
//         />

//         <h1 className="text-3xl font-bold mt-6">
//           {product.title}
//         </h1>

//         <p className="text-gray-600 mt-4">
//           {product.description}
//         </p>

//         <p className="text-2xl font-bold mt-4">
//           ${product.price}
//         </p>

//         <p className="mt-2">
//           <strong>Brand:</strong> {product.brand}
//         </p>

//         <p className="mt-2">
//           <strong>Category:</strong> {product.category}
//         </p>

//         <p className="mt-2">
//           <strong>Rating:</strong> {product.rating}
//         </p>

//         <p className="mt-2">
//           <strong>Stock:</strong> {product.stock}
//         </p>

//       </div>

//     </div>
//   );
// };

// export default ProductDetails;
