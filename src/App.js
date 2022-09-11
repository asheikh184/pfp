import React from 'react';
import {
  ChakraProvider,
  Grid,
  Stack,
  theme,
} from '@chakra-ui/react';
import Swap from './components/Swap';
import PFPBalanceCard from './components/PFPBalanceCard';
import BNBBalanceCard from './components/BNBBalanceCard';
import WBTCBalanceCard from './components/WBTCBalanceCard';
import USDTBalanceCard from './components/USDTBalanceCard';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Stack bgColor={'#F7F7F7'}>
        <Stack direction={{ base: 'column', lg: 'row' }} p={'8'} >
          <Grid templateColumns={{ lg: 'repeat(2, 1fr)' }} gap={2}>
            <PFPBalanceCard />
            <BNBBalanceCard />
            <WBTCBalanceCard />
            <USDTBalanceCard />
          </Grid>
          <Swap />
        </Stack>
        <Stack align={'center'} >
          <iframe title="Crypto Currencies" src="https://widget.coinlib.io/widget?type=full_v2&theme=dark&cnt=100&pref_coin_id=1505&graph=yes" height="700px" width="90%"></iframe>
        </Stack>
      </Stack>
    </ChakraProvider>
  );
}

export default App;
