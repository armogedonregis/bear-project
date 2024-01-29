// Wrapper

type WrapperProps = {
  children: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
  const Container =
    "mx-auto h-full min-h-screen pb-20 max-w-full lg:px-28 px-3 w-screen";
  return <div className={Container}>{children}</div>;
};