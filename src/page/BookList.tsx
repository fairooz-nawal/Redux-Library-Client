import { useState,useCallback } from "react";
import { Pencil, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type BookMock from "@/type-interfaces";
import { useAddBooksMutation, useDeleteBooksMutation, useEditBooksMutation, useGetBooksQuery } from "@/features/booksApi";
import { useAddBorrowBooksMutation } from "@/features/borrowApi";
import { toast } from 'react-toastify';


export default  function BookList() {
  const [selectedBook, setSelectedBook] = useState<BookMock | null>(null);
  // const [viewstate, setViewstate] = useState<Boolean>(true);

  const { data: books = [] } = useGetBooksQuery();
  const [addBook] = useAddBooksMutation();
  const [editBook] = useEditBooksMutation();
  const [deleteBooks] = useDeleteBooksMutation();
  const [addBorrow] = useAddBorrowBooksMutation();

  
  
 
 

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    copies: 0,
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewBook((prev) => ({
        ...prev,
        [name]: name === "copies" ? parseInt(value) : value,
      }));
    },
    [] 
  );


  
  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteBooks({ id }).unwrap();
        toast.warning("Book deleted successfully!");
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    },
    [deleteBooks] 
  );

  
  

  const handleAddBorrow = useCallback(async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedBook) return;

      if(selectedBook.available === false) {
        toast.error("Book is not available for borrowing");
        return;
      }

   const form = e.currentTarget as HTMLFormElement;

  const quantity = parseInt((form.elements.namedItem("quantity") as HTMLInputElement).value);
  const due_date = (form.elements.namedItem("due_date") as HTMLInputElement).value;

  if(quantity > selectedBook.copies) {
    toast.error("Quantity exceeds available copies");
    form.reset();
    return;
  }

  if(quantity <= 0) {
    toast.error("Quantity must be greater than 0");
    form.reset();
    return;
  }

  if(!due_date) {
    toast.error("Due date is required");
    form.reset();
    return;
  }


  
   const borrowData = {...selectedBook, quantity, due_date};
      
  
      try {
        await addBorrow(borrowData).unwrap();
        toast.success("Book borrowed successfully!");
      } catch (error) {
        console.log(error)
        toast.error("Error borrowing book");
      } 
    },
    [selectedBook] 
  );
  
  const handleAddBook = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
  
      const bookToAdd: BookMock = {
        serial_id: books.length + 1,
        title: newBook.title,
        author: newBook.author,
        genre: newBook.genre,
        isbn: newBook.isbn,
        copies: newBook.copies,
        available: newBook.copies > 0 ? true : false,
        quantity: 0
      };
  
      try {
        await addBook(bookToAdd).unwrap();
        toast.success("Book added successfully!");
        setNewBook({
          title: "",
          author: "",
          genre: "",
          isbn: "",
          copies: 0,
        });
      } catch (error) {
        console.log(error)
        toast.error("Error adding book");
       

      } 
    },
    [addBook, newBook] 
  );


  const handleedit = async (book: BookMock, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
  
    const updatedBook = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      author: (form.elements.namedItem("author") as HTMLInputElement).value,
      genre: (form.elements.namedItem("genre") as HTMLInputElement).value,
      isbn: (form.elements.namedItem("isbn") as HTMLInputElement).value,
      copies: parseInt((form.elements.namedItem("copies") as HTMLInputElement).value),
    };
  
    try {

      if(book.title === updatedBook.title && book.author === updatedBook.author && book.genre === updatedBook.genre && book.isbn === updatedBook.isbn && book.copies === updatedBook.copies) {
        toast.error("No changes made");
        return;
      }
      await editBook({ id: book.serial_id, data: updatedBook }).unwrap();
      toast.success("Book updated successfully!");
  
      
    } catch (error) {
      console.log(error)
      toast.error("Error occured");
     
    }
  };
  

  

  return (
    <div className="p-4 w-full mt-20 min-h-[800px] bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-300">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-white">All Books</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-800 hover:bg-blue-600 text-white" variant="outline">
              ADD BOOKS
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleAddBook}>
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>Fill in the book details below.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    name="title"
                    value={newBook?.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Atomic Habits"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    name="author"
                    value={newBook?.author}
                    onChange={handleInputChange}
                    placeholder="e.g., James Clear"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    name="genre"
                    value={newBook?.genre}
                    onChange={handleInputChange}
                    placeholder="e.g., Self-help"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="isbn">ISBN(Unique)</Label>
                  <Input
                    name="isbn"
                    value={newBook?.isbn}
                    onChange={handleInputChange}
                    placeholder="e.g., 9780735211292"
                  />
                </div>


                

                <div className="grid gap-2">
                  <Label htmlFor="copies">Available Copies</Label>
                  <Input
                    name="copies"
                    type="number"
                    min={0}
                    value={newBook?.copies}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-green-700 text-white hover:bg-green-600">
                  Save Book
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="overflow-x-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-xl">
        <CardContent className="p-0">
          <table className="min-w-full text-white">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-left">Genre</th>
                <th className="px-4 py-3 text-left">ISBN</th>
                <th className="px-4 py-3 text-left">Copies</th>
                <th className="px-4 py-3 text-left">Availability</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>

              {books.length>0 ? books.map((book: BookMock) => (
                <tr key={book?.serial_id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">{book?.title}</td>
                  <td className="px-4 py-3">{book?.author}</td>
                  <td className="px-4 py-3">{book?.genre}</td>
                  <td className="px-4 py-3">{book?.isbn}</td>
                  <td className="px-4 py-3">{book?.copies}</td>
                  <td className="px-4 py-3">
                    {book?.available ? (
                      <span className="text-green-400">Available</span>
                    ) : (
                      <span className="text-red-400">Unavailable</span>
                    )}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    



                    <Dialog>
          <DialogTrigger asChild>
             <Button variant="ghost" size="icon" className="hover:text-yellow-400">
                      <Pencil size={18} />
                    </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={(e) =>handleedit(book, e)}>
              <DialogHeader>
                <DialogTitle>Edit Book</DialogTitle>
                <DialogDescription>Fill in the book details below.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    name="title"
                    defaultValue={book?.title}
                    required
                    onChange={handleInputChange}
                    placeholder="e.g., Atomic Habits"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    name="author"
                    defaultValue={book?.author}
                    required
                    onChange={handleInputChange}
                    placeholder="e.g., James Clear"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    name="genre"
                    defaultValue={book?.genre}
                    required
                    onChange={handleInputChange}
                    placeholder="e.g., Self-help"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="isbn">ISBN(Unique)</Label>
                  <Input
                    name="isbn"
                    defaultValue={book?.isbn}
                    required
                    onChange={handleInputChange}
                    placeholder="e.g., 9780735211292"
                  />
                </div>


                

                <div className="grid gap-2">
                  <Label htmlFor="copies">Available Copies</Label>
                  <Input
                    name="copies"
                    type="number"
                    required
                    min={0}
                    defaultValue={book?.copies}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-green-700 text-white hover:bg-green-600">
                  Edit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>


                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-red-500"
                      onClick={() => handleDelete(book?.serial_id)}
                    >
                      <Trash2 size={18} />
                    </Button>


    <Dialog>
          <DialogTrigger asChild>
           
            <Button onClick={() => setSelectedBook(book)} variant="ghost" size="icon" className="hover:text-blue-400">
                      <BookOpen size={18} />
                    </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit= {(e) =>handleAddBorrow (e)}>
              <DialogHeader>
                <DialogTitle>Borrow Book</DialogTitle>
                <DialogDescription>Fill in the book details below.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    name="title"
                    value={book?.title}
                   
                    placeholder="e.g., Atomic Habits"
                    readOnly
                  />
                </div>


                <div className="grid gap-2">
                  <Label htmlFor="title">Due Date</Label>
                  <Input
                    name="due_date"
                   
                   
                    type="date"
                    
                    placeholder="ex:02/02/2023"
                    
                  />
                </div>
                
                
                

                <div className="grid gap-2">
                  <Label htmlFor="copies">Quantity</Label>
                  <Input
                    name="quantity"
                    type="number"
                    min={0}
                                 
                   
                  />
                </div>
              </div>

              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-green-700 text-white hover:bg-green-600">
                  Complete Borrow Book
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
  
                    



                  </td>
                </tr>

              )): <tr><td className="px-4 py-3 text-2xl text-red-400 text-center" colSpan={7}> No books found</td></tr>}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
