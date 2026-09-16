import { useEffect, useState } from 'react';
import styles from './booklist.module.css';
import { mockBookList } from './mockBookList';


const BookList = () => {

    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState("");

    useEffect(() =>{
            const fetchBooks = async () => {
                try{

                    const data = await mockBookList();
                    setBooks(data);
                    console.log(books);

                } catch (error) {
                    console.error('Error fetching books:', error);
                }
    }

    fetchBooks();
    }, [])

    const deleteBook = (id) => {
        let filterBook = books.filter((book) => (book.id !== id));
        setBooks(filterBook);    
    }

    function addBook(event){
        event.preventDefault(); 

        if (!newBook.trim())
            return alert("Please enter a book title");
          
       
        setBooks((prev)=>[...prev, { id: books.length + 1, title: newBook }]);
        setNewBook("");
           
    }
    return (


    <div className={styles.wrapper}>
	    <header>
	    	<div className={styles.pageBanner}>
	    		<h1 className={styles.title}> Book Collections</h1>
          <p>Books</p>
          <form className={styles.searchBooks}>
            <input type="text" placeholder="Search books..." />
          </form>
	    	</div>
	    </header>
	    <div className={styles.bookList}>
	    	<h2 className={styles.title}>Books to Read</h2>
	    	<ul>


                {

                    books.map(({id, title}) =>(
	    		<li key={id}>
	    			<span className={styles.name}>{title}</span>
	    			<span onClick={() => deleteBook(id)} className={styles.delete}>delete</span>
	    		</li>

                    ))
                    
                }
	    	</ul>
	    </div>
         <form onSubmit={addBook} className={styles.addBook}>  
	    	<input type="text" value={newBook} onChange={(event) =>setNewBook(event.target.value)} placeholder="Add a book..." />
	    	<button type="submit">Add</button>
	    </form>
        </div>
    )}


export default BookList    
