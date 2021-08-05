import React from 'react'
import styled from 'styled-components';
import Text from '../components/Text'
import { View,  } from 'react-native'

export default Agent = ({ route, navigation }) => {
  const { agent } = route.params

  return (
    <Container>
      <Header backgroundColor={agent.backgroundColor}  >
            <ImageOpacity  resizeMode='cover' source={{ uri: agent.fullPortrait }} />
      </Header>
    </Container>
  )
}



const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #1B252D;

`;

const Header = styled.View`
  width: 100%;
  height: 350px;
  top: -50px;
  flex: 0.4;

  
`;

const ImageOpacity = styled.Image`
  width: 100%;
  height: 800px;
  top: -35px;
  opacity: 0.5;
  right: 30px;

`;

