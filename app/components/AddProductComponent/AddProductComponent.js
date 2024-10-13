import { addProduct } from '@/app/actions/action'

const AddProductComponent = () => {
    return (
        <>
            <form action={addProduct}>
                <div>
                    <label>Title</label>
                    <input name='title' type='text' />
                </div>
                <div>
                    <label>Description</label>
                    <textarea name='description' />
                </div>
                <div>
                    <label>ingredient</label>
                    <input name='ingredient' type='text' />
                </div>
                <div>
                    <label>Type</label>
                    <input name='type' type='text' />
                </div>
                <div>
                    <label>Size</label>
                    <input name='size' type='text' />
                </div>
                <div>
                    <label>Price</label>
                    <input name='price' type='number' />
                </div>
                <div>
                    <label>Stock</label>
                    <input name='stock' type='number' />
                </div>
                <button>Submit</button>
            </form>
        </>
    )
}

export default AddProductComponent