import { addProduct } from '@/app/actions/crud'

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
                    <label>totalStock</label>
                    <input name='totalStock' type='number' />
                </div>
                <div>
                    <label>reservedStock</label>
                    <input name='reservedStock' type='number' />
                </div>
                <div>
                    <label>availableStock</label>
                    <input name='availableStock' type='number' />
                </div>
                <div>
                    <label>slug</label>
                    <input name='slug' type='string' />
                </div>
                <button>Submit</button>
            </form>
        </>
    )
}

export default AddProductComponent