import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons'
import { View, Text } from 'react-native'
import api from '../services/api'
import categoryList from '../utils/categories';
import agentsList from '../utils/agents';



export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Agentes")
  const [agents, setAgents] = useState([''])
  const [loading, setLoading] = useState(false)

  const agentsRef = useRef()
  const changeCategory = (category) => {
    setSelectedCategory(category)
    // agentsRef.current.scrollToOffset({ x: 0, y: 0 });
  }


  const _agentItem = (item) => {

    return (

      <Agent>
        <Card >
          <AgentAvatar source={{ uri: item.fullPortrait }} />
          <Title>{item.displayName}</Title>
          <Type>{item.role.displayName}</Type>
        </Card>
      </Agent>


    )
  }

  useEffect(() => {
    setLoading(false)
    async function getDataApi() {
      setAgents(agentsList)
    }
    getDataApi()
    setTimeout(() => {
      setLoading(true)
    }, 3000);

  }, [])

  return (
    <Container>
      <Header>
        <View></View>
        <Logo source={{ uri: 'https://img.icons8.com/color/452/valorant.png' }} />
        <Feather name="user" size={24} color="#ffffff" />
      </Header>
      <Categories>
        {categoryList.map((category, index) => {
          return (
            <Category key={index} onPress={() => changeCategory(category)}>
              <CategoryName selected={selectedCategory === category ? true : false} >{category}</CategoryName>
              {selectedCategory === category && <CategoryDot />}
            </Category>
          );
        })}
      </Categories>

      <>
        {loading ?
          <Agents
            horizontal
            data={agents}
            keyExtractor={item => item.uuid}
            renderItem={({ item }) => _agentItem(item)}
            ref={agentsRef}
          />
          :
          <>
            <LoadingImage style={{ width: 180, height: 180 }} source={{ uri: 'https://img.icons8.com/color/452/valorant.png' }} />
          </>
        }
      </>

    </Container>
  )
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #1B252D;
`;
const LoadingImage = styled.Image``

const Logo = styled.Image`
  width: 80px;
  height: 80px;
  padding: 16px 0;
`;

const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 16px 16px 32px 16px;

`;


const Categories = styled.View`
    margin-top:32px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Category = styled.TouchableOpacity`
    align-items: center;
    margin: 0 16px;
    height: 32px;
`;

const CategoryName = styled.Text`
    font-size: 15px;
    text-transform: uppercase;
    color: ${props => (props.selected ? "#BE5363" : "#878892")};
    font-weight: ${props => (props.selected ? "700" : "500")};
`;

const CategoryDot = styled.View`
    width: 50px;
    height: 2px;
    margin-top: 10px;
    background-color: #BE5363;
`;


const Agents = styled.FlatList`
    margin-top: 32px;
    flex: 1;
`;

const Agent = styled.TouchableOpacity`
`

const Title = styled.Text`
color: white;
font-size: 15px;
`

const Type = styled.Text`
color: white;
font-size: 15px;
`

const AgentAvatar = styled.Image``

const Card = styled.View``