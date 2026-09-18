import { useGetAllProductsQuery } from "../../api/dummyDataApi"

const Products = () =>{

    const data = useGetAllProductsQuery();

    console.log(data);


    return (

        
        <>

        <h1>Products</h1>
        {
            data.data?.products?.map((product) => (
                <div key={product.id} className="flex">
                    <img src={product.images[0]} alt="" />
                    <p>{product.title}</p>
                    <h2>{product.description}</h2>
                    <p>{product.price}</p>
                </div>
            ))
        }

        </>
    )

}

export default Products;