import { HStack, Img, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import card1 from '../assets/images/card1.jpg'
import png1 from '../assets/images/PNG-1.png'

const BalanceCard = ({ balance, validDate, cardHolder, img }) => {
    return (
        <>
            <Stack bgImage={card1} justify={'space-between'} bgPos={'center'} bgSize={'cover'} h={'56'} w={{lg:'23rem'}} borderRadius={'lg'} p={'8'} color={'white'}>
                <Stack spacing={'-1'}>
                    <Text>Main Balance</Text>
                    <HStack justify={'space-between'}>
                        {balance ? (
                            <Text>{balance}</Text>
                        ) : (
                            <Text fontWeight={'bold'} fontSize={'3xl'}>$673,412.66</Text>
                        )
                        }
                        <Img src={png1} objectFit={'cover'} boxSize={'10'} />
                    </HStack>
                </Stack>

                <Stack spacing={'0'}>
                    <Text opacity={'0.6'} fontSize={'xs'}>CARD HOLDER</Text>
                    {
                        cardHolder ? (
                            <Text fontSize={'sm'}>
                                {cardHolder}
                            </Text>
                        ) : (
                            <Text fontSize={'sm'} textOverflow={'clip'}  overflow={'hidden'}>
                                0xaF556c9748bea108fB93aBa8C26F4Ab44F8b0B3c
                            </Text>
                        )
                    }
                </Stack>
            </Stack>
        </>
    )
}

export default BalanceCard