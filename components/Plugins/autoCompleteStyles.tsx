
// const customSelectStyles = {
    export const customSelectStyles = {
        control: (provided, state) => ({
          ...provided,
          backgroundColor: '#ffffff', // light mode control background
          borderColor: state.isFocused ? '#94a3b8' : '#cbd5e1', // slate-500 / slate-300
          color: '#0f172a',
          boxShadow: 'none',
          '&:hover': {
            borderColor: '#94a3b8',
          },
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: '#ffffff', // light mode background
          color: '#0f172a',
          zIndex: 50,
          '@media (prefers-color-scheme: dark)': {
            backgroundColor: '#1e293b', // slate-800
            color: '#ffffff',
          },
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected
            ? '#e2e8f0' // slate-200 (light mode selected)
            : state.isFocused
            ? '#f1f5f9' // slate-100 (hover)
            : '#ffffff', // default light mode
          color: '#0f172a',
          cursor: 'pointer',
          '@media (prefers-color-scheme: dark)': {
            backgroundColor: state.isSelected
              ? '#334155' // slate-700
              : state.isFocused
              ? '#475569' // slate-600
              : '#1e293b', // slate-800
            color: '#ffffff',
          },
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#0f172a',
          '@media (prefers-color-scheme: dark)': {
            color: '#ffffff',
          },
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: '#e2e8f0',
          '@media (prefers-color-scheme: dark)': {
            backgroundColor: '#334155',
          },
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: '#0f172a',
          '@media (prefers-color-scheme: dark)': {
            color: '#ffffff',
          },
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: '#0f172a',
          ':hover': {
            backgroundColor: '#ef4444',
            color: 'white',
          },
          '@media (prefers-color-scheme: dark)': {
            color: '#ffffff',
            ':hover': {
              backgroundColor: '#b91c1c',
              color: '#ffffff',
            },
          },
        }),
      };
      