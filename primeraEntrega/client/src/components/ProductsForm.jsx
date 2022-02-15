import { useState } from 'react';

const fields = [
    {
        name: 'name',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Nombre del producto',
    },
    {
        name: 'description',
        label: 'Descripción',
        type: 'text',
        placeholder: 'Descripción del producto',
    },
    {
        name: 'price',
        label: 'Precio',
        type: 'text',
        placeholder: 'Precio del producto',
    },
    {
        name: 'thumbnail',
        label: 'Imagen',
        type: 'text',
        placeholder: 'URL de la imagen',
    },
    {
        name: 'sku',
        label: 'SKU',
        type: 'text',
        placeholder: 'SKU del producto',
    },
    {
        name: 'stock',
        label: 'Stock',
        type: 'text',
        placeholder: 'Stock del producto',
    }
];

export const ProductsForm = () => {
    const [form, setForm] = useState({});

    const canSubmit = () => {
        return Object.keys(form).length === fields.length;
    };

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-100">
            <h1 className="font-bold text-3xl mb-10">Ingrese Producto</h1>
            <div>
                <form className="w-full max-w-lg p-6">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        {fields.map(field => (
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0" key={field.name}>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={field.name}>
                                    {field.label}
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id={field.name}
                                    type={field.type}
                                    name={field.name}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        id="submitProductButton"
                        disabled={!canSubmit()}
                        onClick={handleSubmit}
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    )
}
