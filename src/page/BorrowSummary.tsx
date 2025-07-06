
import { Card, CardContent } from "@/components/ui/card";
import type BookMock from "@/type-interfaces";
import { useCallback} from "react";
import { Pencil, Trash2, } from "lucide-react";
import { Button } from "@/components/ui/button";


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
import { useGetBorrowBooksQuery, useDeleteBorrowBooksMutation, useEditBorrowBooksMutation } from "@/features/borrowApi";
import { toast } from 'react-toastify';




export default function BorrowSummary() {
  // const [books, setBooks] = useState<(BookMock & { quantity: number })[]>([]);

  const { data: books = []  } = useGetBorrowBooksQuery();

  const [deleteBorrowBooks] = useDeleteBorrowBooksMutation();
  const [editBorrowBooks] = useEditBorrowBooksMutation();


 


  
  const handleedit = async (book: BookMock, e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;

  const updatedBook = {
    title: (form.elements.namedItem("title") as HTMLInputElement).value,
    isbn: (form.elements.namedItem("isbn") as HTMLInputElement).value,
    quantity: parseInt((form.elements.namedItem("quantity") as HTMLInputElement).value),
  };

  try {

    if(book.title === updatedBook.title && book.isbn === updatedBook.isbn && book.quantity === updatedBook.quantity) {
      toast.error("No changes made");
      return;
    }
    await editBorrowBooks({ id: book.serial_id, data: updatedBook }).unwrap();
    toast.success("Book updated successfully!");

    
  } catch (error) {
    console.log(error)
    toast.error("Error updating book");
  }
};



const handleDelete = useCallback(
  async (id: number) => {
    try {
      await deleteBorrowBooks({ id }).unwrap();
      toast.success("Book deleted successfully!");
    } catch (error) {
      console.log(error)
      toast.error("Error deleting book");
    }
  },
  [deleteBorrowBooks]
);

    
  
  return (
    <div className="mt-20 min-h-screen  md:p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-300 p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Borrowed Books Summary</h1>

      <Card className="overflow-x-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-xl">
        <CardContent className="p-0">
          <table className="min-w-full text-white">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 text-left">Book Title</th>
                <th className="px-4 py-3 text-left">ISBN</th>
                <th className="px-4 py-3 text-left">Total Quantity Borrowed</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? books.map((book, index) => (
                <tr key={index} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">{book?.title}</td>
                  <td className="px-4 py-3">{book?.isbn}</td>
                  <td className="px-4 py-3">{book?.quantity}</td>
                  { <td className="px-4 py-3">


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
           
            <Button  variant="ghost" size="icon" className="hover:text-blue-400">
                      <Pencil size={18} />
                    </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={(e)=> handleedit(book,e)}>
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
                   
                    placeholder="e.g., Atomic Habits"
                  
                  />
                </div>
                

                
                <div className="grid gap-2">
                  <Label htmlFor="isbn">ISBN(Unique)</Label>
                  <Input
                    name="isbn"
                    defaultValue={book?.isbn}
                   
                    placeholder="e.g., 9780735211292"
                   
                  />
                </div>


                

                <div className="grid gap-2">
                  <Label htmlFor="copies">Total Quantity</Label>
                  <Input
                    name="quantity"
                    type="number"
                    min={0}
                    defaultValue={book?.quantity}
                    
                   
                  />
                </div>
              </div>

              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-green-700 text-white hover:bg-green-600">
                  Edit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>


                    </td> }
                </tr>
              )):  
               <tr className="border-t border-white/10 hover:bg-white/5">

                <td className="px-4 py-3">No Borrowed Books</td>
                <td className="px-4 py-3">No Borrowed Books</td>
                <td className="px-4 py-3">No Borrowed Books</td>
               </tr>
               }
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
