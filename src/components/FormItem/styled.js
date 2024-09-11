import styled from 'styled-components'

export const FormField = styled.div`
  margin-bottom: 15px;
  position: relative;

  & > label {
    display: block;
    width: 100%;
    margin-bottom: 5px;
    font-family: Mohave;
    font-size: 16px;
    font-weight: 400;
    line-height: 17.6px;
    text-align: left;
    color: black;
  }

  & > input,
  & > textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    border: none;
    outline: none;
    box-sizing: border-box;
    resize: none;
    min-height: 50px;
  }

  & > select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    resize: none;
    min-height: 50px;
  }
`;