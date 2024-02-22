import styled from "styled-components";

export const ImageAndTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  img {
    height: 100px;
  }

  > div {
    display: flex;
    gap: 0.5rem;

    strong {
      color: ${({ theme }) => theme.blue_900};
      font-size: 1.4rem;
    }

    span {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.blue_900};
      font-weight: bold;
    }
  }

  @media (min-width: 610px) {
    flex: 1;
    max-width: 250px;
    gap: 2rem;

    align-items: center;

    > div {
      flex-direction: column;
    }
  }

  @media (min-width: 910px) {
    flex: 1;
    max-width: 300px;
    gap: 4rem;

    align-items: center;

    > div {
      flex-direction: column;
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  input {
    border: 1px solid ${({ theme }) => theme.grey_200};
    border-radius: ${({ theme }) => theme.border_radius};
    color: ${({ theme }) => theme.blue_900};
    padding: 6px;
    width: 50px;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: 0;
  padding: 0.6rem;

  svg {
    color: ${({ theme }) => theme.blue_500};
    transition: color 0.2s;
  }
`;

export const InputAndSubTotal = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const SubTotalContainer = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.grey_500};
    font-weight: bold;
  }

  strong {
    color: ${({ theme }) => theme.blue_900};
    font-size: 1.6rem;
  }

  @media (min-width: 540px) {
    flex-direction: row;

    span {
      display: none;
      visibility: hidden;
      opacity: 0;
    }
  }
`;
