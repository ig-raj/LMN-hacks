export const Input = ({ placeholder, value, onChange }) => (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border rounded-lg p-2 w-full"
    />
  );
  