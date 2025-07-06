
import { Button } from "@/components/ui/button";
import { BookOpenCheck, Search, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 flex items-center justify-center px-6 py-12 mt-[5%]">
      <div className="max-w-4xl w-full  text-center text-white space-y-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Welcome to <span className="text-indigo-400">Library Central</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Manage your books, track borrowings, and explore a seamless digital library experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center hover:bg-white/20 transition-all">
            <Search size={36} className="text-indigo-300 mb-4" />
            <h3 className="text-lg font-semibold">Search Catalog</h3>
            <p className="text-sm text-gray-300 mt-2">Quickly browse and find books in the collection.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center hover:bg-white/20 transition-all">
            <BookOpenCheck size={36} className="text-indigo-300 mb-4" />
            <h3 className="text-lg font-semibold">Manage Books</h3>
            <p className="text-sm text-gray-300 mt-2">Add, edit, or remove books with ease.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center hover:bg-white/20 transition-all">
            <Users size={36} className="text-indigo-300 mb-4" />
            <h3 className="text-lg font-semibold">Borrower Stats</h3>
            <p className="text-sm text-gray-300 mt-2">Track borrowing history and borrower information.</p>
          </div>
        </div>

        <div className="mt-12">
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white text-lg px-6 py-3 rounded-xl">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
