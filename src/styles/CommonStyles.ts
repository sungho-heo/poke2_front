import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 20px;
  width: 100%;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const authSection = styled.section`
  display: block;
  padding: 300px 0 280px;
  background-color: #f7f7f7 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

export const Logo2 = styled.div`
  vertical-align: top;
  max-width: 100%;
`;

export const TitileContainer = styled.div`
    padding: 0 55px;
    max-width: 580px;
    margin: 0 auto;
    text-align: center !important;
}`;

export const FormContainer = styled.div`
  display: block;
  unicode-bidi: isolate;
`;

export const Input = styled.input`
  height: auto;
  padding: 15px 20px;
  border: 1px solid #bbb;
  border-radius: 0;
  background: #fff;
  color: #000 !important;
  font-size: 18px;
  display: block;
  width: 100%;
  font-weight: 400;
  line-height: 1.5;
`;

export const Label = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const FormGroup = styled.div`
  margin: 10px 0;
`;

export const Button = styled.button`
  margin-top: 20px;
  width: 95%;
  cursor: pointer;
  border-color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  border-radius: 0;
  transform: skew(-20deg);
  padding: 20px 125px;
  font-size: 21px;
  font-weight: 700;
`;

// 포켓몬 css
export const PokemonList = styled.li`
  padding-left: 10px;
  padding-right: 10px;
  margin: 40px 0;
`;

export const ImageContainer = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  transition: 0.5s;
  width: 100%;
`;

export const PokemonImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 235px;
  height: 235px;
`;

export const PokemonImage = styled.img`
  width: 80%;
  height: auto;
  max-height: 100%;
  &:hover {
    transition: transform 0.5s;
    transform: scale(1.05) translate(0, -5%);
  }
`;
