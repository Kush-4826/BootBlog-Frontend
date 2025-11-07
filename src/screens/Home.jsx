import useDynamicTitle from "../hooks/useDynamicTitle";

const Home = () => {
  useDynamicTitle("Home | BootBlog");
  return <div>Home Page</div>;
}
export default Home;