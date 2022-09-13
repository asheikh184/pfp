import { HStack, Img, Stack, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import card2 from '../assets/images/card3.jpg'
import coin from '../assets/images/bnb.png'
// import ContextWallet from '../context/ContextConnect';


const BalanceCard = ({ balance, validDate, cardHolder, img }) => {
    // const { getBalance } = useContext(ContextWallet)

    return (
        <>
            <Stack bgImage={card2} justify={'space-between'} bgPos={'center'} bgSize={'cover'} h={'56'} w={{ lg: '23rem' }} borderRadius={'lg'} p={'8'} color={'white'}>
                <Stack spacing={'-1'}>
                    <Text>Wallet Balance</Text>
                    <HStack justify={'space-between'}>
                        {balance ? (
                            <Text>{balance}</Text>
                        ) : (
                            <Text fontWeight={'bold'} fontSize={'3xl'}> BNB</Text>
                        )
                        }
                        <Img src={coin} objectFit={'cover'} boxSize={'10'} />
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
                            <Text fontSize={'sm'} textOverflow={'clip'} overflow={'hidden'}>
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