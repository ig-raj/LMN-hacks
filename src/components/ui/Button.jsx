export const Button = ({ children, onClick, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-500 text-white py-2 px-4 rounded-lg ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
  