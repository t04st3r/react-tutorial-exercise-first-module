interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

function InputField({ value, onChange, onSubmit }: InputFieldProps) {
  return (
    <div className="input-group">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Book title"
        className="url-input"
      />
      <button onClick={onSubmit} className="fetch-button">
        Search Books
      </button>
    </div>
  );
}

export default InputField;