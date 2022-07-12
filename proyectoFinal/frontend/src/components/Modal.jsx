import { useState, useEffect } from 'react';
import axios from 'axios';

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

export const Modal = (props) => {
  const { product, show = false, setShow, getProducts } = props;
  const [form, setForm] = useState(product);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({
      ...form,
      [name]: value
    });
  };

  const canSubmit = () => Object.keys(form).length >= fields.length;

  const handleUpdateProduct = async () => {
    const response = await axios.put(`/api/productos/${form._id}`, form, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
    if (response.status === 200) {
      getProducts();
      setShow(false);
    };
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <div id="defaultModal" className={`flex overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal md:h-full md:inset-0 ${show ? '' : 'hidden'}`}>
        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex justify-between items-start p-5 rounded-t border-b ">
              <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl ">
                Editando Producto
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  dark:hover:text-white"
                data-modal-toggle="defaultModal"
                onClick={handleClose}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
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
                      value={form[field.name]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 ">
              <button
                data-modal-toggle="defaultModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                disabled={!canSubmit()}
                onClick={handleUpdateProduct}
              >
                Actualizar
              </button>
              <button
                data-modal-toggle="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                onClick={handleClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`h-screen w-full bg-black top-0 fixed opacity-20 ${show ? '' : 'hidden'}`}></div>
    </>
  )
}


