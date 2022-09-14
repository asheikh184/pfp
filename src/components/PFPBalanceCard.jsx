import { HStack, Img, Stack, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import ContextWallet from '../context/ContextConnect'

const BalanceCard = ({ validDate, cardHolder, img, balance, address, network,coin }) => {
    console.log("🚀 ~ file: PFPBalanceCard.jsx ~ line 7 ~ BalanceCard ~ balance", balance)
    const { walletAddress} = useContext(ContextWallet)
    return (
        <>
            <Stack _hover={{cursor:'pointer',transform:'Scale(1.05)',transition:'0.8s'}} bgImage={img} justify={'space-between'} bgPos={'center'} bgSize={'cover'} h={'56'} w={{ base: 'full', xl: '100%', '2xl': '60%' }} borderRadius={'lg'} p={'8'} color={'white'} maxW={'100%'}>
                <Stack spacing={'-1'}>
                    <Text>{network} Balance</Text>
                    <HStack justify={'space-between'}>
                        {balance ? (
                            <Text fontWeight={'bold'} fontSize={'3xl'}>{balance} {network}</Text>
                        ) : (
                            <Text fontWeight={'bold'} fontSize={'3xl'}>0 {network}</Text>
                        )
                        }
                        <Img src={coin} objectFit={'cover'} boxSize={'10'} />
                    </HStack>
                </Stack>



                <Stack spacing={'0'}>
                    <Text opacity={'0.6'} fontSize={'xs'}>Wallet Address</Text>
                    {
                        walletAddress ? (
                            (<Text fontSize={'sm'}>
                                {address}
                            </Text>)
                        ) : ''
                    }
                </Stack>
            </Stack>


        </>
    )
}

export default BalanceCard