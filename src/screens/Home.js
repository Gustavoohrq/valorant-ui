import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons'
import { View } from 'react-native'
import categoryList from '../utils/categories';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Agentes")
  const gamesRef = useRef()
  const changeCategory = (category) => {
    setSelectedCategory(category)
    // gamesRef.current.scrollToOffset({ x: 0, y: 0 });
  }

  return (
    <Container>
      <Header>
        <View></View>
        <Logo source={{ uri: 'https://img.icons8.com/color/452/valorant.png' }} />
        <Feather name="user" size={24} color="#ffffff" />
      </Header>
      <Categories >
        {categoryList.map((category, index) => {
          return (
            <Category key={index} onPress={() => changeCategory(category)}>
              <CategoryName selected={selectedCategory === category ? true : false} >{category}</CategoryName>
              {selectedCategory === category && <CategoryDot />}
            </Category>
          );
        })}
      </Categories>

    </Container>
  )
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #1B252D;
`;
const Logo = styled.Image`
  width: 80;
  height: 80;
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