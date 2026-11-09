import { useGetAllProductsQuery } from "../../api/dummyDataApi";

const DisplayAllProducts = () => {
    const { data, isLoading, isError } = useGetAllProductsQuery();

    const getProductsArray = (apiResponse) => {
        if (!apiResponse) return [];
        if (Array.isArray(apiResponse)) return apiResponse;
        if (Array.isArray(apiResponse.products)) return apiResponse.products;
        if (Array.isArray(apiResponse.data)) return apiResponse.data;
        return [];
    };

    const productsList = getProductsArray(data);

    const displayProducts = () => {
        if (isLoading) {
            return <p>Loading...</p>;
        }

        if (isError) {
            return <p>Error fetching products</p>;
        }

        if (productsList.length === 0) {
            return <p>No products found</p>;
        }

        return (
            <div className="grid grid-cols-4 gap-4">
                {productsList.map((product) => (
                    <div key={product.id} className="w-full flex flex-col gap-2">
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
                            <span className="text-yellow-400 text-lg">★★★★☆</span>
                            <span className="text-black font-medium">
                                {typeof product.rating === 'object' ? product.rating?.rate : product.rating}/5
                            </span>
                        </div>
                        
                        <p className="text-2xl font-bold text-black">${product.price}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="p-10">
            {displayProducts()}
        </div>
    );
};

export default DisplayAllProducts;
