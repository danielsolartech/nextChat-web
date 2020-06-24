import * as React from 'react';
import './select.scss';

interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

export interface SelectProps {
  name: string;
  options: SelectOption[];
  defaultOption?: string;

  onChange?: (option: SelectOption) => void;
}

const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const [selectedOption, setSelectedOption] = React.useState<SelectOption | null>(null);
  const [showingOptions, setShowingOptions] = React.useState<boolean>(false);

  if (!props.options.length) {
    throw new Error('You need put options.');
  }

  if (!selectedOption) {
    if (props.defaultOption) {
      const option: SelectOption | undefined = props.options.find((option) => option.value === props.defaultOption);
      if (!option) {
        throw new Error('The default value is not valid.');
      }

      setSelectedOption(option);
    } else {
      setSelectedOption(props.options[0]);
    }
  }

  const onClick = (option: SelectOption): void => {
    setSelectedOption(option);

    if (props.onChange) {
      props.onChange(option);
    }
  };

  document.body.addEventListener('click', () => setShowingOptions(false));

  return (
    <div className={`nextChat-select-form ${showingOptions ? 'active' : ''}`}>
      <div className="select-selected" onClick={() => setShowingOptions(!showingOptions)}>
        <div className="selected-value">
          {selectedOption?.icon && <div className="value-icon">
            <i className={selectedOption?.icon} />
          </div>}
          <div className="value-label">
            {selectedOption?.label}
          </div>
        </div>
        <div className="selected-arrow">
          <i className="fas fa-angle-down" />
        </div>
      </div>
      <ul className="select-options">
        {props.options.map((option) => (
          <li className={option.value === selectedOption?.value ? 'active' : ''} onClick={() => onClick(option)}
            key={`${props.name}_${option.value}`}>
            {option.icon && <div className="option-icon">
              <i className={option.icon} />
            </div>}
            <span>
              {option.label}
            </span>
          </li>
        ))}
      </ul>
    </div >
  );
};

export default Select;
