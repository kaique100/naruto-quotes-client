import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import narutoImg from '../../images/naruto.png';
import jutsoSound from '../../sounds/jutso.mp3';
import { Quotes } from '../../components';
import { getQuote } from '../../services';

const audio = new Audio(jutsoSound);

export function App() {
  const isMounted = useRef(true);
  const [quote, setQuote] = useState({
    speaker: 'Loading speaker...',
    quote: 'Loading Quote'
  });

  const onUpdate = async () => {
    const resQuote = await getQuote();

    if (isMounted.current) {
      setQuote(resQuote);
      audio.play();
    }
  };

  useEffect(() => {
    onUpdate();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Content>
      <Quotes {...quote} onUpdate={onUpdate} />
      <NarutoImg alt="Naruto holding a kunai" src={narutoImg} />
    </Content>
  );
}

const Content = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  padding: 0 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const NarutoImg = styled.img`
  max-width: 44vw;
  align-self: flex-end;
`;
