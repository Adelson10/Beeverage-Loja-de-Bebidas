import ListProductShow from "../components/ListProductShow/ListProductShow";
import SlidesWelcome from "../components/SlidesWelcome/SlidesWelcome";
import { ProdutoMockup } from "../utils/Mockup/ProductPromo";
import { Slides } from "../utils/Mockup/SlidesWelcome";

const Home = () => {
  return (
    <>
      <SlidesWelcome slides={Slides}/>
      <ListProductShow title={"Promoções"} productModal={ProdutoMockup} />
    </>
  )
}

export default Home;