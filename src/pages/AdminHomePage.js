import AdminProductList from "../features/admin/components/AdminProductList";
import Navar from "../features/navbar/Navbar";

function AdminHomePage() {
    return (  
        <Navar>
            <AdminProductList></AdminProductList>
        </Navar>
    );
}

export default AdminHomePage;