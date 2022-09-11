import { HStack, Img, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import card1 from '../assets/images/card2.jpg'
import usdt from '../assets/images/usdt.png'

const BalanceCard = ({ balance, validDate, cardHolder, img }) => {
    return (
        <>
            <Stack bgImage={card1} justify={'space-between'} bgPos={'center'} bgSize={'cover'} h={'56'} w={{lg:'23rem'}} borderRadius={'lg'} p={'8'} color={'white'}>
                <Stack spacing={'-1'}>
                    <Text>Wallet Balance</Text>
                    <HStack justify={'space-between'}>
                        {balance ? (
                            <Text>{balance}</Text>
                        ) : (
                            <Text fontWeight={'bold'} fontSize={'3xl'}>0 USDT</Text>
                        )
                        }
                        <Img src={usdt} objectFit={'cover'} boxSize={'10'} />
                    </HStack>
                </Stack>

                

                <Stack spacing={'0'}>
                    <Text opacity={'0.6'} fontSize={'xs'}>Wallet Address</Text>
                    {
                        cardHolder ? (
                            <Text fontSize={'sm'}>
                                {cardHolder}
                            </Text>
                        ) : (
                            <Text fontSize={'sm'} textOverflow={'clip'}  overflow={'hidden'}>
                            0x319F54A7d519f073eCE0fef9097F142b0767F3C3
                            </Text>
                        )
                    }
                </Stack>
            </Stack>

            
        </>
    )
}

export default BalanceCard