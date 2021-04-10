import {
    EuiFormRow,
    EuiFieldText,
    EuiTextArea,
    EuiFieldPassword,
} from '@elastic/eui';

export const renderEuiField = (FieldTypeComponent) => {
    return ({
        label,
        input,
        value,
        meta: { touched, invalid, error },
        ...custom
    }) => {
        return (
        <EuiFormRow 
            label={label}
            isInvalid={touched && invalid}
            error={error}
            fullWidth={custom.fullWidth}
        >
            <FieldTypeComponent
                placeholder={label}
                isInvalid={touched && invalid}
                value={value}
                {...input}
                {...custom}
            />
        </EuiFormRow>
    )};
};

export const renderEuiFieldText = renderEuiField(EuiFieldText);
export const renderEuiFieldTextArea = renderEuiField(EuiTextArea);
export const renderEuiFieldPassword = renderEuiField(EuiFieldPassword);