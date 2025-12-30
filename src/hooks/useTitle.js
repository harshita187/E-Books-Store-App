import { useEffect } from "react";

export const useTitle = (title) => {

    useEffect(() => {
        document.title = `${title} - e-books-store-app`;
    }, [title]);

  return null;
}