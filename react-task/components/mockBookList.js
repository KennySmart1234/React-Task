


export const mockBookList = () =>{

    
    return new Promise((resolve, reject) => {
        resolve([
            { id: 1, title: "Name of the Wind"},
            { id: 2, title: "The Wise Man's Fear"},
            { id: 3, title: "Kafka on the Shore"},
            { id: 4, title: "The Master and the Margarita"},
        ])


    })
}