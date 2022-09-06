import Swal from "sweetalert2";

const Tarea = ({ tarea, setTarea, eliminarTarea }) => {
  const { titulo, fecha, descripcion, id } = tarea;

  const handleEliminar = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      timer: 5000,
      timerProgressBar: true,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminala!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminada!",
          text: "Tu tarea ha sido eliminada correctamente!",
          icon: "success",
          timer: "5000",
          timerProgressBar: true,
          showCloseButton: true,
          confirmButtonText:"Perfecto!",
          confirmButtonColor: "green",
        });
        eliminarTarea(id);
      }
    });
  };

  return (
    <div className="bg-teal-50 shadow-md rounded-lg py-10 px-5 mb-10 mt-5">
      <p className="mb-4 text-teal-600 uppercase font-bold">
        Titulo:
        <span className="text-black normal-case"> {titulo}</span>
      </p>
      <p className="mb-3 text-teal-600 uppercase font-bold">
        Fecha:
        <span className="text-black normal-case"> {fecha}</span>
      </p>
      <p className="text-teal-600 uppercase font-bold">
        Descripción:
        <span className="text-black normal-case"> {descripcion}</span>
      </p>

      <div className="flex justify-between">
        <button
          className="font-black cursor-pointer text-center outline-none bg-lime-600 hover:bg-lime-500 active:bg-lime-700 py-2 px-8 mt-4 border-2 border-solid rounded-lg text-white font-blod shadow-lg shadow-lime-600/60 border-black"
          type="button"
          onClick={() => setTarea(tarea)}
        >
          Actualizar ⚙️
        </button>
        <button
          className="font-black cursor-pointer text-center outline-none bg-red-600 hover:bg-red-500 active:bg-red-700 py-2 px-8 mt-4 border-2 border-solid rounded-lg text-white font-blod shadow-lg shadow-red-600/60 border-black"
          type="button"
          onClick={handleEliminar}
        >
          Eliminar 🗑️
        </button>
      </div>
    </div>
  );
};

export default Tarea;
