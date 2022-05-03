import React, {useState, useCallback, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput, } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import Listtarefa from './src/components/Listtarefa/Listtarefa';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function App() {

  const [tarefa, setTarefa] = useState([]);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('')
  
  useEffect(() => {
    async function carregarTarefa(){
      const tarefaAmar = await AsyncStorage.getItem('@tarefa');

      if(tarefaAmar){
        setTarefa(JSON.parse(tarefaAmar));
      }
    }

    carregarTarefa();

  }, []);

  useEffect(()=> {
    async function salvarTarefa(){
      await AsyncStorage.setItem('@tarefa', JSON.stringify(tarefa))
    }

    salvarTarefa();
  },[tarefa]);

function Cadastrar(){
  if(input === '') return;

  const data ={
    key:input,
    tarefa:input
  };

  setTarefa([...tarefa, data]);
  setOpen(false);
  setInput('')
}

  const tarefaDel = useCallback((data) => { 
    const find = tarefa.filter(r => r.key !== data.key);
    setTarefa(find);
  })
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor= "#171d31" barStyle="light-content"/>

      <View>
        <Text style={styles.txtTitulo}>Minhas Tarefas</Text>
      </View>

   <FlatList style={styles.lista}showsHorizontalScrollIndicator={false} data={tarefa} keyExtractor={ (item) => String(item.key) } renderItem={ ({item}) => <Listtarefa data={item} tarefaDel={tarefaDel} />} 
   
   />
  

   <Modal animationType='fade' transparent={false} visible={open}>
      <SafeAreaView style={styles.modal}  >
        <View style={styles.modalHeader}>
          
          <TouchableOpacity onPress={()=> setOpen(false)}  >
            <Ionicons style={styles.btnvoltar}name='md-arrow-back' size={40} />
          </TouchableOpacity>
          <Text style={styles.titlemodal}>Nova tarefa</Text>
        </View>
          
        <View style={styles.modalbody}>
        <TextInput placeholder="O que precisa fazer hoje?" placeholderTextColor="#747474"style={styles.inpunt} multiline={true} autoCorrect={false} value={input} onChangeText={(texto)=> setInput(texto)}
          >

          </TextInput>

          <TouchableOpacity style={styles.btnCadastrar} onPress={Cadastrar}>
            <Text style={styles.btnCadastrarTxt}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

    </Modal>
  


      <TouchableOpacity style={styles.btnMais} onPress={( )=> setOpen(true)}>
        <Ionicons name="ios-add" size={30} color="white"/>

      </TouchableOpacity>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171d31",
    
  },
  txtTitulo:{
    marginTop: 15,
    paddingBottom: 30,
    color: 'white',
    fontSize: 25,
    textAlign:'center',
  },
  btnMais:{
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25, 
    elevation: 2, 
    zIndex: 9,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset:{
      width: 1,
      height: 3,
    }
  },
  lista: {
    marginHorizontal:10,
    
  },
  btnvoltar:{
    color:'#FFF',
  },
  modal:{
    flex: 1,
    backgroundColor: "#171d31",
  },
  titlemodal: {
    fontSize: 23,
    color:'#FFf',
    marginLeft: 50
    
  },
  modalHeader:{
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalbody:{
    marginTop: 15.
  },
  inpunt:{
    fontSize: 15,
    marginLeft:10,
    marginRight:10,
    marginTop:15,
    backgroundColor:'#fff',
    padding: 9,
    height: 85,
    textAlignVertical: 'top',
    color:'#000',
    borderRadius: 5,

  },
  btnCadastrar:{
    backgroundColor: '#fff',
    marginTop: 10,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40, 
    borderRadius: 5,
    padding: 5,
   
    
  },
  btnCadastrarTxt:{
    fontSize:20,
  }

});
