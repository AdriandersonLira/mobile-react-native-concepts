import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data)
      setProjects(response.data)
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `New Project ${Date.now()}`,
      owner: "Adrianderson Lira"
    });

    setProjects([...projects, response.data]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor='#7159c1'/>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.title}>{project.title}</Text>
          )}
        />

        <TouchableOpacity 
          activeOpacity={0.7} 
          style={styles.button} 
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar um projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    paddingTop: 20,
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  title: {
    color: '#fff',
    paddingLeft: 15,
    fontSize: 32,
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})