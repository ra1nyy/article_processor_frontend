import {Form} from "react-bootstrap";
import Select from "react-select";

export const Input = ({
                          label,
                          value,
                          name,
                          as,
                          feedback,
                          type,
                          className,
                          onChange
                      }) => {

    return <Form.Group className={className}>
        <Form.Label>{label}</Form.Label>
        <Form.Control value={value}
                      name={name}
                      as={as}
                      type={type}
                      onChange={onChange}/>
        <Form.Control.Feedback>{feedback}</Form.Control.Feedback>
    </Form.Group>
}


export const FormikSelect = ({
                                 options,
                                 field,
                                 form,
                                 label,
                                 small,
                                 id,
                                 style,
                                 placeholder = '',
                                 required = false,
                                 invalid = false,
                                 disabled = null,
                                 isSearchable = true,
                                 isClearable = true,
                                 isMulti = false,
                                 closeMenuOnSelect = true,
                                 menuPortalTarget
                             }) => {

    const customStyles = {
        control: (base, state) => ({
            ...base,
            boxShadow: "none",
            borderColor: state.isFocused ?
                '#ddd' : !form.errors[field.name] ?
                    '#ddd' : '#dc3545',
            backgroundColor: disabled ? '#e9ecef' : 'hsl(0, 0%, 100%)',
            '&:hover': {
                borderColor: state.isFocused ?
                    '#ddd' : !form.errors[field.name] ?
                        '#ddd' : '#dc3545'
            }
        }),
        indicatorSeparator: base => ({
            ...base,
            display: 'none'
        }),
    }

    const onChangeSelect = (new_value) => {
        if (isMulti) {
            form.setFieldValue(field.name,
                (new_value).map((item) => item.value)
            );
        } else {
            form.setFieldValue(field.name, new_value?.value ? new_value.value : null)
        }
    }

    return (
        <div className={`form-group ${required ? 'required' : ''}`}>
            <Form.Label>{label}</Form.Label>
            <Select
                onBlur={field.onBlur}
                onChange={onChangeSelect}
                options={options}
                value={(() => {
                    if (!options) return '';
                    if (isMulti) return options.filter(option => {
                        return field.value ? field.value.indexOf(option.value) >= 0 : false
                    })
                    for (let optionsLength = options.length, i = 0; i < optionsLength; i++) {
                        const option = options[i];
                        if (option.options) {
                            const valueCandidate = option.options.find(({value}) => value === field.value);
                            if (valueCandidate) return valueCandidate;
                        }
                        if (option.value === field.value) return option;
                    }
                    return '';
                })()}
                styles={{...customStyles, ...style}}
                selectID={id}
                placeholder={placeholder}
                isSearchable={isSearchable}
                menuPortalTarget={menuPortalTarget}
                aria-invalid={invalid}
                controlShouldRenderValue={true}
                hideSelectedOptions={false}
                closeMenuOnSelect={closeMenuOnSelect}
                isMulti={isMulti}
                isLoading={!options}
                isClearable={isClearable}
                isDisabled={disabled}
            />
            {form.errors[field.name] ?
                <small className="form-text text-danger">{form.errors[field.name]}</small> : null}
            {small ? <small className="form-text text-muted">{small}</small> : null}
        </div>
    );
}
