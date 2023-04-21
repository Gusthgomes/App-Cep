import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import api from './src/services/api';

export default function App() {

  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  function limpar(){
    setCep('')
    inputRef.current.focus();
    setCepUser(null);
  }

  async function buscar() {
    if(cep == '') {
      alert('Digite um Cep válido!')
      setCep('');
      return;
    }

    try{

      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data);
      Keyboard.dismiss();

    }catch(error){
      console.log("ERROR: " + error)
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center',}}>
        <Text style={styles.text}>Digite o cep desejado: </Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 92726884"
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType = 'numeric'
          ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity 
        style={[styles.Areabotao, {backgroundColor: '#1d75cd'}]}
        onPress={buscar}
        >
          <Text style={styles.btnText}>BUSCAR</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.Areabotao, {backgroundColor: '#ff0010'}]}
        onPress={limpar}
        >
          <Text style={styles.btnText}>LIMPAR</Text>
        </TouchableOpacity>
      </View>

      {cepUser && 
            
            <View style={styles.resultado}>
              <Text style={styles.result}> Cep: {cepUser.cep}</Text>
              <Text style={styles.result}> Logradouro: {cepUser.logradouro}</Text>
              <Text style={styles.result}> Bairro: {cepUser.bairro}</Text>
              <Text style={styles.result}> Cidade:  {cepUser.localidade}</Text>
              <Text style={styles.result}> Estado:  {cepUser.uf}</Text>
            </View>
      }



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 45,
    marginBottom: 20,
  },
  input: {
    padding: 10,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: '#DDD',
    width: '90%',
    fontSize: 18,
    borderRadius: 5,
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  Areabotao: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 17,
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  result: {
    fontSize: 22,
  }
});
