const Unauthorized = () => {
  return (
    <div className="max-h-[100vh] flex justify-center flex-col">
      <img src="/notFound.svg" alt="stop" className="max-h-[30rem]" />
      <p className="text-slate-500 text-[1.3rem] text-center">Access denied!</p>
    </div>
  );
};

export default Unauthorized;
