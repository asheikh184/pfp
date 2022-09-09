import React, { useState } from 'react';
import Select from 'react-select';
import eth from '../assets/images/eth.png';
import btc from '../assets/images/btc.png';
import wbtc from '../assets/images/wbtc.png';
import { IconOption, IconValue } from './IconOption';
const customStyles = {
    control: base => ({
        ...base,
        minWidth: 50,
        width: 70,
        height: 10,
        borderRadius: '15px',
        backgroundColor: '#000000e3',
    }),
};
const options = [

    { img: eth, label: 'ETH' },
    { img: wbtc, label: 'WBTC' },
    { img: btc, label: 'USDT' },
]

export default function App() {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="App">
            <Select
                // autoFocus={'none'}
                styles={customStyles}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder={''}
                components={{
                    Option: IconOption,
                    SingleValue: IconValue,
                }}
            />
        </div>
    );
}