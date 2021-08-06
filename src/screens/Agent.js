import React from 'react'
import styled from 'styled-components';
import Text from '../components/Text'
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons'

export default Agent = ({ route, navigation }) => {
  const { agent } = route.params
  const _abilitiesItem = (item) => {
    return (
      <DescriptionAbilities>
        <ImageAbilities resizeMode='stretch' source={{ uri: item.displayIcon }} />

        <DetailsDescription>
          <Text medium bold>{item.displayName}</Text>
          <Text small light>{item.description}</Text>
        </DetailsDescription>

      </DescriptionAbilities>

    )
  }
  return (
    <Container>
      <Header style={{borderBottomLeftRadius: '50px', borderBottomRightRadius: '50px'}} backgroundColor={agent.backgroundColor}  >
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="ios-close" size={38} color="#ffffff" />
        </BackButton>
        <DetailsName>
          <Text title bold>{agent.displayName}</Text>
          <BlurView intensity={90} style={{ width: '80%', height: '10%', borderRadius: 10, alignItems: 'center', paddingTop: 10, overflow: 'hidden' }}>
            <Text medium bold>{agent.role.displayName}</Text>
          </BlurView>
        </DetailsName>    
        <ImageOpacity  resizeMode='stretch' source={{ uri: agent.fullPortrait }} />
      </Header>
      <Biography>
          <Text large bold  >// BIOGRAFIA </Text>
          <Text textAlign bold>{agent.description}</Text>
      </Biography>
      <AbilitiesContainer>
        <Text large bold >// HABILIDADES </Text>
        <AbilitiesDetails
          data={agent.abilities}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.uuid}
          renderItem={({ item }) => _abilitiesItem(item)}
      /> 
      </AbilitiesContainer>
    </Container>
  )
}



const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #1B252D;

`;

const AbilitiesDetails = styled.FlatList`
  padding-top: 30px;
  padding: 5px;
  height: 100%;

`
const BackButton = styled.TouchableOpacity`
    position: absolute;
    top: 48px;
    left: 16px;
`;
const DetailsDescription = styled.View`
  position: absolute;
  height: 90px;
  left: 70px;
  top: 10px;
  width: 290px;
`
const ImageAbilities = styled.Image`
  width: 50px;
  height: 50px;
  top: 40px;
  left: 10px;

`

const DescriptionAbilities = styled.View`
  background-color: #324757;
  border-radius: 20px;
  height: 130px;
  margin-bottom: 30px;

`

const AbilitiesContainer = styled.View`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  height: 100%;
  flex: 1;

`

const Biography = styled.View`
  margin-left: 20px;
  margin-right: 20px;
`

const DetailsName = styled.View`
  top: 80px;
  align-items: center;
  align-self: center;
  

`

const Header = styled.View`
  width: 100%;
  height: 350px;
  top: -50px;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;

  
`;

const ImageOpacity = styled.Image`
  width: 100%;
  height: 350px;
  right: 30px;

`;

