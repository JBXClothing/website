const VariantPicker = ({ variants, ...props }) => {
  if (variants.length <= 1) return null;

  const groupedVariants = variants.reduce((acc, { name, color, external_id, size }) => {
    const key = `${name} | ${color}`;
    acc[key] = acc[key] || [];
    acc[key].push({ external_id, size });
    return acc;
  }, {});

  return (
    <select
      {...props}
      className="form-select appearance-none w-full mb-3 sm:mb-0 flex-grow sm:mr-3 pl-3 py-2 bg-white border border-gray-300 focus:border-gray-500 shadow-sm text-gray-500 text-sm focus:outline-none focus:text-gray-900 rounded ring-0 focus:ring-0"
    >
      {Object.keys(groupedVariants).map((group) => (
        <optgroup key={group} label={group}>
          {groupedVariants[group].map(({ external_id, size }) => (
            <option key={external_id} value={external_id}>
              {size}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

export default VariantPicker;
