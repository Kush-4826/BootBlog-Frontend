import useDynamicTitle from "../../hooks/useDynamicTitle";

const NotFound = () => {
  useDynamicTitle("404 Not Found | BootBlog")
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;