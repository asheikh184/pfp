import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Swap from './components/Swap';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Swap />
    </ChakraProvider>
  );
}

export default App;
