import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import styles from './TipStyle';

const tipValue = [
    {id: 1, text: 'No tip', price: 0},
    {id: 2, text: '$1', price: 100},
    {id: 3, text: '$3', price: 300},
    {id: 4, text: '$5', price: 500},
]

export function Tip(props) {
    const [selectedTip, setSelectedTip] = useState(0);

    useEffect(()=>{
        props.changeTip(selectedTip);
    },[selectedTip])

    const _renderTipPrice = (item, index) => {
        return(
            <View style={styles.textContainer} >
                <TouchableOpacity onPress={()=> setSelectedTip(item.price)} style={item.price === selectedTip ? styles.selectedText : styles.text } >
                    <Text weight='medium' >{item.text}</Text>
                </TouchableOpacity>
                {item.price != 5 && <View style={styles.verticalLine} />}
            </View>
        )
    }

    return(
        <View style={styles.container} >
            {tipValue.map((item, index)=> _renderTipPrice(item, index))}
        </View>
    )
}