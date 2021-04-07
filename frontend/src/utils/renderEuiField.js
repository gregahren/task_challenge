import {
    EuiFieldText,
    EuiFormRow,
} from '@elastic/eui';

export const renderEuiFieldText = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
}) => (
    <EuiFormRow 
        label={label}
        isInvalid={touched && invalid}
        error={error}
    >
        <EuiFieldText
            placeholder={label}
            isInvalid={touched && invalid}
            {...input}
            {...custom}
        />
    </EuiFormRow>
);