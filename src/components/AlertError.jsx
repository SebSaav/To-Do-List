const AlertError = ({ children }) => {
  return (
    <div className="mr-4 uppercase font-black text-center outline-none bg-rose-700 p-4 mb-5 border-2 border-solid rounded-lg text-white font-blod shadow-lg shadow-bg-rose-700/60 border-black">
      {children}
    </div>
  );
};

export default AlertError;
