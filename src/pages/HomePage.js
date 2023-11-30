import Navar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";

function HomePage() {
    return (  
        <Navar>
            <ProductList></ProductList>
        </Navar>
    );
}

export default HomePage;