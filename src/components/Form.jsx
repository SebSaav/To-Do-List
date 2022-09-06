import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AlertError from "./alertError";

const Form = ({ tareas, setTareas, tarea, setTarea }) => {
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(tarea).length > 0) {
      setTitulo(tarea.titulo);
      setFecha(tarea.fecha);
      setDescripcion(tarea.descripcion);
    }
  }, [tarea]);

  const Actualizar = () => {
    let timerInterval;
    Swal.fire({
      title: "Tu tarea ha sido editada exitosamente",
      icon: "success",
      timer: 1200,
      timerProgressBar: true,
      showCloseButton: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  };

  const generarId = () => {
    const id = Math.random().toString(20).substr(2);

    return id;
  };

  /* Validación Formulario */
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([titulo, fecha, descripcion].includes("")) {
      setError(true);
      return;
    }

    setError(false);

    const objetoTareas = {
      titulo,
      fecha,
      descripcion,
    };

    if (tarea.id) {
      objetoTareas.id = tarea.id;

      const tareasActualizadas = tareas.map((tareaState) =>
        tareaState.id === tarea.id ? objetoTareas : tareaState
      );

      setTareas(tareasActualizadas);
      setTarea({});
    } else {
      /* Limpiar Form */
      objetoTareas.id = generarId();
      setTareas([...tareas, objetoTareas]);
    }

    /* Limpiar Form */
    setTitulo("");
    setFecha("");
    setDescripcion("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-bold text-3xl text-center mb-10">
        Creación de Tareas
      </h2>

      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="bg-teal-100 shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && (
          <AlertError>
            <p>Todos los campos son obligatorios</p>
          </AlertError>
        )}

        {/* Titulo Div */}
        <div className="mb-5">
          <label
            htmlFor="titulo"
            className="block text-teal-600 uppercase font-bold"
          >
            Titulo
          </label>
          <input
            id="titulo"
            type="text"
            placeholder="Titulo de la tarea"
            className="bg-teal-50 border-2 w-full p-2 mt-2 rounded-md placeholder-gray-300"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        {/* Fecha Div */}
        <div className="mb-5">
          <label
            htmlFor="fecha"
            className="block text-teal-600 uppercase font-bold"
          >
            Fecha
          </label>
          <input
            id="fecha"
            type="date"
            className="bg-teal-50 border-2 w-full p-2 mt-2 rounded-md placeholder-gray-300"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        {/* Descripción Div */}
        <div className="mb-5">
          <label
            htmlFor="descripcion"
            className="block text-teal-600 uppercase font-bold"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            type="text"
            placeholder="Descripción de la tarea"
            className="bg-teal-50 border-2 w-full p-2 mt-2 rounded-md placeholder-gray-300"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        {!tarea.id ? (
          <input
            type="submit"
            className="w-full transition-colors font-black uppercase cursor-pointer text-center outline-none bg-teal-600 hover:bg-teal-500 active:bg-teal-700 py-2 px-8 mt-4 border-2 border-solid rounded-2xl text-white font-blod shadow-xl shadow-teal-600/50 border-black"
            value="Crear Tarea"
          />
        ) : (
          <input
            type="submit"
            className="w-full transition-colors font-black uppercase cursor-pointer text-center outline-none bg-indigo-700 hover:bg-indigo-700 active:bg-indigo-700 py-2 px-8 mt-4 border-2 border-solid rounded-2xl text-white font-blod shadow-xl shadow-bg-indigo-700/70 border-black"
            value="Actualizar Tarea"
            onClick={Actualizar}
          />
        )}
      </form>
    </div>
  );
};

export default Form;
