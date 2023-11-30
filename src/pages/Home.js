import Navar from "../features/navbar/Navar";
import ProductList from "../features/product-list/ProductList";

function Home() {
    return (  
        <Navar>
            <ProductList></ProductList>
        </Navar>
    );
}

export default Home;