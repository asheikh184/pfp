import { Button, HStack, IconButton, Img, Input, Link, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ethers } from "ethers";
import pfplogo from '../assets/images/pfplogo.png'
import eth from '../assets/images/eth.png'
import { FiSettings } from 'react-icons/fi'
import SelectCurrency from './SelectCurrency'
import { BsArrowDownShort, BsChevronDown, BsThreeDots } from 'react-icons/bs'
import { MdDashboard, MdLanguage } from 'react-icons/md'
import { AiOutlineTwitter, AiOutlineYoutube } from 'react-icons/ai'
import { FaTelegramPlane } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'


const Swap = () => {
    const [useraddress, setUseraddress] = useState()
    var val1 = 0.0, val2 = 0.0
    var currentValue1 = 1710, balance = 0
    const connectWallet = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const address = await provider.send("eth_requestAccounts", []);
        setUseraddress(address)
        console.log("🚀 ~ file: Swap.jsx ~ line 20 ~ connectWal ~ address", address)
    }
    return (
        <Stack align={'center'} justify={'center'}>
            <Stack bgColor={'#23242A'} h={'80vh'} w={'fit-content'} borderRadius="2xl" justify={'space-between'} pb={'6'} px={'2'}>
                <Stack>
                    {/* Header */}
                    <Stack direction={'row'} alignItems='center' w={'100%'} justify={'space-between'} px={'2'} py={'2'}>
                        <Img src={pfplogo} boxSize={{ base: '6', lg: '12' }} objectFit={'cover'} />
                        <HStack>
                            <SelectCurrency />
                            <Button
                                bgColor={'rgba(21, 61, 111, 0.44)'}
                                border={'1px solid rgba(21, 61, 111, 0.44)'}
                                color={'rgb(80, 144, 234)'}
                                borderRadius={'2xl'}
                                _hover={{ border: '1px solid rgba(49, 95, 154, 0.44)', color: 'rgb(57, 130, 231)' }}
                                onClick={() => connectWallet()}
                                size={{ base: 'sm', lg: 'md' }}
                            >
                                {useraddress ? (
                                    <Text
                                        textOverflow={'ellipsis'}
                                        overflow={'hidden'}
                                        w={'14'}
                                    >
                                        {useraddress}
                                    </Text>
                                ) : (
                                    <Text
                                        textOverflow={'ellipsis'}
                                        overflow={'hidden'}
                                        w={'fit-content'}
                                        fontSize={'xs'}
                                    >
                                        Connect Wallet
                                    </Text>
                                )}


                            </Button>
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<BsThreeDots />}
                                    variant='outline'
                                    borderRadius={'2xl'}
                                    bgColor={'#191B1F'}
                                    color={'white'}
                                    border={'none'}
                                    _hover={{ border: '1px solid rgb(64, 68, 79)' }}
                                    _focus={{}}
                                    _active={{}}
                                />
                                <MenuList bgColor={'#212429'} border={'none'} borderRadius={'2xl'}>
                                    <MenuItem as={Button} rightIcon={<MdDashboard />} justifyContent={'space-between'} bgColor={'transparent'} color={'rgb(195, 197, 203)'} _hover={{ color: 'white', bgColor: 'transparent' }} _focus={{}} _active={{}}>
                                        HEX Dashboard
                                    </MenuItem>
                                    <MenuItem as={Button} rightIcon={<AiOutlineTwitter />} justifyContent={'space-between'} bgColor={'transparent'} color={'rgb(195, 197, 203)'} _hover={{ color: 'white', bgColor: 'transparent' }} _focus={{}} _active={{}}>
                                        HEX Twitter
                                    </MenuItem>
                                    <MenuItem as={Button} rightIcon={<AiOutlineYoutube />} justifyContent={'space-between'} bgColor={'transparent'} color={'rgb(195, 197, 203)'} _hover={{ color: 'white', bgColor: 'transparent' }} _focus={{}} _active={{}}>
                                        HEX Videos
                                    </MenuItem>
                                    <MenuItem as={Button} rightIcon={<FaTelegramPlane />} justifyContent={'space-between'} bgColor={'transparent'} color={'rgb(195, 197, 203)'} _hover={{ color: 'white', bgColor: 'transparent' }} _focus={{}} _active={{}}>
                                        HEX Telegram
                                    </MenuItem>
                                    <MenuItem as={Button} rightIcon={<MdLanguage />} justifyContent={'space-between'} bgColor={'transparent'} color={'rgb(195, 197, 203)'} _hover={{ color: 'white', bgColor: 'transparent' }} _focus={{}} _active={{}}>
                                        Language
                                    </MenuItem>
                                    <MenuItem as={Button} rightIcon={<CgNotes />} justifyContent={'space-between'} bgColor={'transparent'} color={'rgb(195, 197, 203)'} _hover={{ color: 'white', bgColor: 'transparent' }} _focus={{}} _active={{}}>
                                        Legal and Privacy
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </HStack>
                    </Stack>
                    {/* Swap Converter */}
                    <Stack px={'2'}>
                        <Stack bgColor={'#191B1F'} borderRadius={'2xl'} px="3" py={'4'} h={'auto'}>
                            <HStack color={'white'} px={'3'} justify={"space-between"}>
                                <Text fontWeight={'bold'}>Swap</Text>
                            </HStack>
                            <Stack spacing={'-3'}>
                                <Stack bgColor={'#23242A'} minH={'20'} border={'none !important'} borderRadius={'2xl'} color={'#B2B9D2'} px={'6'} py={'2'}>
                                    <HStack fontWeight={'bold'}>
                                        <Input value={val1} variant={'unstyled'} />
                                        <HStack as={Button} rightIcon={<BsChevronDown />} minW={'auto'} borderRadius={'2xl'} bgColor={'rgb(44, 47, 54)'} boxShadow={'rgb(0 0 0 / 8%) 0px 6px 10px'} _hover={{ bgColor: 'rgb(64, 68, 79)' }} spacing={'4'} px={'6'}>
                                            <Img src={eth} w={'6'} />
                                            <Text>ETH</Text>
                                        </HStack>
                                    </HStack>
                                    <HStack justify={'space-between'}>
                                        <Text>${currentValue1}</Text>
                                        <Text>Balance {balance}</Text>
                                    </HStack>
                                </Stack>

                                <Stack position={'relative'} borderRadius={'xl'} bgColor={'#191B1F'} boxSize={'8'} alignSelf={'center'} p={'1px'}>
                                    <Stack w={'fit-content'} bgColor={'#212429'} borderRadius={'xl'} alignSelf={'center'} color={'white'} position={'absolute'}>
                                        <BsArrowDownShort fontSize={'1.9rem'} />
                                    </Stack>
                                </Stack>

                                <Stack bgColor={'#23242A'} minH={'20'} border={'none !important'} borderRadius={'2xl'} color={'#B2B9D2'} px={'6'} py={'2'}>
                                    <HStack fontWeight={'bold'}>
                                        <Input value={val2} variant={'unstyled'} />
                                        <HStack as={Button} rightIcon={<BsChevronDown />} minW={'auto'} borderRadius={'2xl'} bgColor={'rgb(44, 47, 54)'} boxShadow={'rgb(0 0 0 / 8%) 0px 6px 10px'} _hover={{ bgColor: 'rgb(64, 68, 79)' }} spacing={'4'} px={'6'}>
                                            <Img src={pfplogo} boxSize={'6'} />
                                            <Text>ETH</Text>
                                        </HStack>
                                    </HStack>
                                    <HStack justify={'space-between'}>
                                        <Text>${currentValue1}</Text>
                                        <Text>Balance {balance}</Text>
                                    </HStack>
                                </Stack>
                            </Stack>
                            <Button onClick={() => connectWallet()} bgColor={'rgba(21, 61, 111, 0.44)'} color={'rgb(80, 144, 234)'} _hover={{ bgColor: 'rgba(19, 54, 98, 0.44)' }} borderRadius={'2xl'} size={'lg'}>
                                {useraddress ?
                                    "Swap"
                                    :
                                    "Connect Wallet"
                                }
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack rounded={'2xl'} py={'1'} px={'1'} alignSelf={'center'} w={'30%'} bgColor={'#191B1F'} alignItems={'center'}>
                    <Button _hover={{}} bg='rgb(33, 36, 41)' width={'full'} color={'white'} fontWeight='600' size='md' rounded={'xl'} >Buy</Button>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Swap