import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns:2fr 2fr 1fr;
  gap: 1rem;
  padding: 1.5rem 1.2rem;

 

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content:end;
    align-items:center;
    

  }
`;

const Label = styled.label`
  font-weight: 600;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;


function FormRow({label,error,children}) {
    return (
    <StyledFormRow>
        {label && <Label htmlFor={children.props.id}>{label}</Label>}
        {children}
        {error && <Error>{error}</Error>}
    </StyledFormRow>

    )
}

export default FormRow;
