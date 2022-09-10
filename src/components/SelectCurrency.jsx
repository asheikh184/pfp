import React, { useState } from 'react';
import eth from '../assets/images/eth.png';
import btc from '../assets/images/btc.png';
import wbtc from '../assets/images/wbtc.png';
import { Button, HStack, Img, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { GoPrimitiveDot } from 'react-icons/go';
import { BsChevronDown } from 'react-icons/bs';


export default function App() {
    const [option, setOption] = useState(eth)

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown color='white' />} bgColor={'#181A1E'} borderRadius={'2xl'} _hover={{ bgColor: '#181A1E', borderColor: '1px solid rgb(64, 68, 79)' }} _focus={{ bgColor: '#181A1E' }} _active={{ bgColor: '#181A1E' }}>
                <Img src={option} boxSize={'6'} />
            </MenuButton>
            <MenuList borderRadius={'2xl'} bgColor={'#191B1F'} p={'4'} color={'#B2B9D2'} border={'none'}>
                <Text>Select a Network</Text>
                <MenuItem px={'0 !important'} _hover={{ bgColor: 'transparent' }} _focus={{ bgColor: 'transparent' }} _active={{ bgColor: 'transparent' }} onClick={() => setOption(eth)}>
                    <HStack justify={'space-between'} bgColor={'#212429'} w={'full'} p={'2'} borderRadius={'2xl'}>
                        <HStack>
                            <Img src={eth} boxSize={'4'} />
                            <Text>Etherium</Text>
                        </HStack>
                        <GoPrimitiveDot color='green' />
                    </HStack>
                </MenuItem>
                <MenuItem px={'0 !important'} _hover={{ bgColor: 'transparent' }} _focus={{ bgColor: 'transparent' }} _active={{ bgColor: 'transparent' }} onClick={() => setOption(wbtc)}>
                    <HStack justify={'space-between'} bgColor={'#212429'} w={'full'} p={'2'} borderRadius={'2xl'}>
                        <HStack>
                            <Img src={wbtc} boxSize={'4'} />
                            <Text>W BTC</Text>
                        </HStack>
                        <GoPrimitiveDot color='green' />
                    </HStack>
                </MenuItem>
                <MenuItem px={'0 !important'} _hover={{ bgColor: 'transparent' }} _focus={{ bgColor: 'transparent' }} _active={{ bgColor: 'transparent' }} onClick={() => setOption(btc)}>
                    <HStack justify={'space-between'} bgColor={'#212429'} w={'full'} p={'2'} borderRadius={'2xl'}>
                        <HStack>
                            <Img src={btc} boxSize={'4'} />
                            <Text>USDT</Text>
                        </HStack>
                        <GoPrimitiveDot color='green' />
                    </HStack>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}