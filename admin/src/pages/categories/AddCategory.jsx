import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import CategoryForm from "../../components/categories/CategoryForm";

const AddCategory = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <Link
                        to="/categories"
                        className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300"
                    >
                        <FiArrowLeft />
                        Back to Categories
                    </Link>
                    <h1 className="mt-4 text-4xl font-black text-white">Add Category</h1>
                    <p className="mt-2 text-slate-400">Create a new product category.</p>
                </div>
            </div>

            {/* Form */}
            <CategoryForm isEdit={false} />
        </div>
    );
};

export default AddCategory;
