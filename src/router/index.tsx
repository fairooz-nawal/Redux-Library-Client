import { lazy} from "react";

const Root = lazy(() => import("@/component/Root"));
const BookList = lazy(() => import("@/page/BookList"));
const BorrowSummary = lazy(() => import("@/page/BorrowSummary"));
const Home = lazy(() => import("@/page/Home"));

import {createBrowserRouter} from "react-router";

  

  
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Root,
      children: [
        {
            index: true,
            Component: Home,
        },

        {
         path: "all-books",
         Component: BookList,
        },
        {
          path: "borrow-summary",
          Component: BorrowSummary,
        }
          

      ]
    
    },
  ]);

  export default router;