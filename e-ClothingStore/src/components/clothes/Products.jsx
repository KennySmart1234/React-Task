import { useState } from 'react'
import { useGetAllProductsQuery } from '../../api/dummyDataApi'

const Products = () => {
    const { data, error, isLoading } = useGetAllProductsQuery();
    const [showAll, setShowAll] = useState(false);

    const getProductsArray = (apiResponse) => {
        if (!apiResponse) return [];
        if (Array.isArray(apiResponse)) return apiResponse;
        if (Array.isArray(apiResponse.products)) return apiResponse.products;
        if (Array.isArray(apiResponse.data)) return apiResponse.data;
        return [];
    };

    const productsList = getProductsArray(data);
    const fetchProducts = showAll ? productsList : productsList.slice(0, 4);

    const view = () => {
        setShowAll(!showAll);
    };

    const displayProducts = () => {
        if (isLoading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>Error fetching products</p>;
        }

        if (productsList.length === 0) {
            return <p>No products found</p>;
        }

        return fetchProducts.map((product) => (
            <li key={product.id} className="w-full flex flex-col gap-2 list-none">
                <div className="w-full h-[300px] bg-[#F2F0F1] rounded-2xl flex items-center justify-center p-6">
                    <img 
                        src={product.image || product.thumbnail} 
                        alt={product.title}  
                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                    />
                </div>
                
                <h2 className="text-xl font-bold text-black mt-2 truncate">
                    {product.title}
                </h2>
                
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-400 text-2xl">****</span>
                    <span className="text-black font-medium">
                        {typeof product.rating === 'object' ? product.rating?.rate : product.rating}/5
                    </span>
                </div>
                
                <p className="text-2xl font-bold text-black">${product.price}</p>
            </li>
        ));
    };

    return (
        <div className='grid grid-cols-4 gap-4 bg-white-600 p-10'>
            {displayProducts()}
            
            {productsList.length > 4 && (
                <button onClick={view}
                    className='col-span-4 text-black px-12 py-4 rounded-full mt-10 w-55 text-center justify-center border hover:bg-black hover:text-white transition-all duration-300 mx-auto'
                >
                    {showAll ? 'VIEW LESS' : 'VIEW ALL'}
                </button>
            )}
        </div>
    );
};

export default Products;
