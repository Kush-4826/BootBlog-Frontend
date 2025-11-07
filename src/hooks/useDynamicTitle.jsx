import { useEffect } from "react"

const useDynamicTitle = title => {
  useEffect(() => {
    document.title = title;

    return (() => {
      document.title = 'BootBlog';
    })
  }, [title])
}

export default useDynamicTitle;
