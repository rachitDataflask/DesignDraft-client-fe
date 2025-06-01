export default function RightModal({ children }) {
  return (
    <div className="h-[91vh] fixed right-0 bottom-0 bg-white w-[400px]">
      {children}
    </div>
  );
}
