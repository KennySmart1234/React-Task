import { useGetAllProductsQuery } from "../../api/dummyDataApi";


const DisplayAllProducts = () => {

    const {data, isLoading, isError} = useGetAllProductsQuery();

    const displayProducts = () => {
        if(isLoading){
            return <p>Loading...</p>
        }

        if(isError){
            return <p>Error fetching products</p>
        }

        return data?.map((product)=>(
            <ul key={product.id} className="w-full flex flex-col gap-2">
                <div className="w-full h-[300px] bg-[#F2F0F1] rounded-2xl flex items-center justify-center p-6">
                    <img 
                    src={product.image} 
                    alt={product.title}  
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                    />
                </div>
                
                <h2 className="text-xl font-bold text-black mt-2 truncate">
                    {product.title}
                </h2>
                
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-400 text-lg">★★★★☆</span>
                    <span className="text-black font-medium">{product.rating.rate}/5</span>
                </div>
                
                <p className="text-2xl font-bold text-black">${product.price}</p>
            </ul>
        ))
    }

  return (
    <div className="p-10">
        {displayProducts()}
    </div>
  )
}

export default DisplayAllProducts