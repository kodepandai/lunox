const Dummy = ({ message, title }: { message: string; title: string }) => {
  return (
    <>
      <h1>{title}</h1>
      <p>This is mail message: {message}</p>
    </>
  );
};
export default Dummy;
