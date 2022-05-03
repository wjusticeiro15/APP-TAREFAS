import React, {useState} from 'react';
import { Animated,View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';


export default function Listtarefa({data, tarefaDel}){

    return(
        <View style={styles. container} >
         <TouchableOpacity onPress = {( )=> tarefaDel (data)}>
             <Ionicons name= "md-checkmark-circle" size={30} color= "#121212" />
             </TouchableOpacity>  
        <View>
            <Text style={styles.tarefa}>{data.tarefa}</Text>
            </View>      
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin: 8,
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 7,
        elevation: 1.5,
        shadowColor:'#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 1,
            height:3,
        }
    },
    tarefa:{

        color: '#121212',
        fontSize: 20,
        paddingLeft: 20,
        paddingRight: 20,
    }

});
    
    
