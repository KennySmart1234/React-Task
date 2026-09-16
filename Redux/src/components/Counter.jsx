
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../slices/counterSlice.js'

const counter =() => {

    const dispatch = useDispatch()
    const count = useSelector((state) => state.counter.value)
    


    return ( 
        <div> 
            {/* <div>+</div> */}
            <button onClick={() => dispatch(increment())}>+</button>
            <h1>{count}</h1> 
            <button onClick={() => dispatch(decrement())}>-</button>
            

        </div>
    )
}

export default counter