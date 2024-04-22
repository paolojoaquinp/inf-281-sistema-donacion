import styled from 'styled-components';

export const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 300px;
  margin: 10px;
  overflow: hidden;
  .actions__container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    p {
      margin: 0 10px;
    }
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const CardBody = styled.div`
  padding: 10px;
`;

export const CardTitle = styled.h5`
  margin: 0;
  margin-bottom: 10px;
`;

export const CardText = styled.p`
  margin: 0;
  margin-bottom: 10px;
`;

export const CardPrice = styled.p`
  margin: 0;
  margin-bottom: 10px;
  color: #007BFF;
  font-weight: bold;
`;

export const AddToCartButton = styled.button`
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
`;