import SlidesWelcome from "../components/SlidesWelcome/SlidesWelcome";
import { Slides } from "../utils/Mockup/SlidesWelcome";

const Home = () => {
  return (
    <SlidesWelcome slides={Slides}/>
  )
}

export default Home;