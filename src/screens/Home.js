import React from 'react'
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons'
import { View } from 'react-native'

export default function Home() {
  return (
    <Container>
      <Header>
        <View></View>
        <Logo source={{ uri: 'https://img.icons8.com/color/452/valorant.png' }} />
        <Feather name="user" size={24} color="#ffffff" />
      </Header>

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
  align-self: center;
  
`;

const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 16px 16px 32px 16px;

`;