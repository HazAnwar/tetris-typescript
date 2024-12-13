import styled from '@emotion/styled';
import { useState } from 'react';

const Input = styled.input`
  padding: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem;
`;

const Form = styled.form`
  padding: 1rem 2rem;
`;

const CenteredDiv = styled.div`
  text-align: center;
`;

const Text = styled.p`
  text-align: center;
  margin: 1rem auto 0 auto;
  &.error {
    color: red;
  }
`;

interface InputFormProps {
  onSubmit: (text: string) => void;
}

const REGEX_MATCHER = /[IJLQSTZ][0-9]/g;

export const InputForm = ({ onSubmit }: InputFormProps) => {
  const [text, setText] = useState<string>('Add a new line');
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (formData: FormData) => {
    const userInput = formData.get('input')?.toString().toUpperCase().replace(/\s/g, '');

    if (!userInput) {
      setText('No input detected, please enter something and try again');
      setError(true);
      return;
    }

    if (!userInput.match(REGEX_MATCHER)) {
      setText('Unexpected input, please enter data in the correct format');
      setError(true);
      return;
    }

    setText('Add a new line');
    setError(false);
    onSubmit(userInput);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setText('No file detected, please select a file and try again');
      setError(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result?.toString().toUpperCase().replace(/\s/g, '');

      if (!fileContent) {
        setText('No content detected in the file, please try again');
        setError(true);
        return;
      }

      if (!fileContent.match(REGEX_MATCHER)) {
        setText('Unexpected input in the file, please enter data in the correct format');
        setError(true);
        return;
      }

      setText('Add a new line');
      setError(false);
      onSubmit(fileContent);
    };

    reader.readAsText(file);
  };

  return (
    <>
      <Text className={error ? 'error' : undefined}>{text}</Text>

      <Form action={handleSubmit}>
        <CenteredDiv>
          <Input type='text' name='input' autoComplete='off' />
          <Button type='submit'>Submit</Button>
        </CenteredDiv>
      </Form>

      <CenteredDiv>
        <Text>Or select a file</Text>
        <Input name='file' type='file' onChange={handleFileUpload} />
      </CenteredDiv>
    </>
  );
};
