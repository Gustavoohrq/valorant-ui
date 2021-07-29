import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons'
import { View } from 'react-native'
import api from '../services/api'
import categoryList from '../utils/categories';
import agentsList from '../utils/agents';
import { BlurView } from 'expo-blur';




export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Agentes")
  const [agents, setAgents] = useState([''])
  const [maps, setMaps] = useState([''])
  const [weapons, setWeapons] = useState([''])
  const [loading, setLoading] = useState(false)
  const agentsRef = useRef()
  const mapsRef = useRef()
  const weaponsRef = useRef()
  const changeCategory = (category) => {
    setSelectedCategory(category)
    console.log(category)
    // agentsRef.current.scrollToOffset({ x: 0, y: 0 });
  }
  const _weaponsItem = (item) => {
    return (

      <Weapon >
          <WeaponImage style={{resizeMode: 'contain'}} source={{ uri: item.skins[0].displayIcon ? item.skins[0].displayIcon  :  item.skins[0].chromas[0].displayIcon}} />
          <FooterWeapon>
            <BlurView intensity={80} style={{ width: '100%', height: '100%', borderRadius: 10, alignItems: 'center', paddingTop: 10, overflow: 'hidden' }}>
              <TitleWeapon>{item.displayName}</TitleWeapon>
            </BlurView>
          </FooterWeapon> 
      </Weapon>


    )
  }

  const _mapsItem = (item) => {
    return (
      <Map>
          <MapImage source={{ uri: item.splash }} />
          <FooterMaps>
            <BlurView intensity={90} style={{ width: '100%', height: '100%', borderRadius: 10, alignItems: 'center', paddingTop: 10, overflow: 'hidden' }}>
              <Title>{item.displayName}</Title>
              <View
                  style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                    width: 100,
                    marginBottom: 5
                  }}
              />
            </BlurView>
          </FooterMaps> 
      </Map>


    )
  } 

  const _agentItem = (item) => {
 
    return (

      <Agent>
        <CardAgent backgroundColor={item.backgroundColor} >
          <AgentAvatar source={{ uri: item.fullPortrait }} />
          <Footer backgroundColor={item.backgroundColor} >
            <BlurView intensity={90} style={{ width: '100%', height: '100%', borderBottomLeftRadius: 10, alignItems: 'center', paddingTop: 10, overflow: 'hidden' }}>
              <Title>{item.displayName}</Title>
              <View
                  style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                    width: 100,
                    marginBottom: 5
                  }}
              />
              <Type>{item.role.displayName}</Type>
            </BlurView>
          </Footer> 
        </CardAgent>
      </Agent>


    )
  }

  useEffect(() => {
    setLoading(false)
    async function getDataApi() {
      setAgents(agentsList.data)
      await api.get('maps').then(response => {
        setMaps(response.data.data)
      })
      await api.get('weapons').then(response => {
        setWeapons(response.data.data)
      })
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
          <>
              
            { selectedCategory === "Agentes" ? 
            
              <Agents
                showsHorizontalScrollIndicator={false}
                horizontal
                data={agents}
                keyExtractor={item => item.uuid}
                renderItem={({ item }) => _agentItem(item)}
                ref={agentsRef}
              />

              : selectedCategory === "Mapas"  ?
                <Maps
                  data={maps}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.uuid}
                  renderItem={({ item }) => _mapsItem(item)}
                  ref={mapsRef}
                /> 
              
              : selectedCategory === "Armas" ? 
                <Weapons
                  showsHorizontalScrollIndicator={false}
                  data={weapons}
                  keyExtractor={item => item.uuid}
                  renderItem={({ item }) => _weaponsItem(item)}
                  ref={weaponsRef}
                />
              : <></>
            }
          </>
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
  width: 100px;
  height: 100px;
  padding: 16px 0;
`;

const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 16px 16px 32px 16px;

`;
const Footer = styled.View`
  position: absolute;
  top: 72%;
  align-items: center;
  width: 250px;
  height: 100;
  z-index: 99;
  background-color: transparent

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
    margin-top: 30px;
`;
const Weapons = styled.FlatList`
  margin-left: 30px;
  margin-right: 30px;
  top: 40px

`;

const Weapon = styled.TouchableOpacity`
  height: 150;
  width: 300;
  margin-top: 30px;
  margin-bottom: 80px;
  border-radius: 10px;
  align-items: center;
  align-self: center;
  background: #263440;

`
const TitleWeapon = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: 700;
  text-transform: uppercase;
  font-family: 'bold';
  letter-spacing: 2px;

`

const WeaponImage = styled.Image`
  height: 80;
  width: 300;
  transform: rotate(20deg);
  border-radius: 10px;
`;

const FooterWeapon = styled.View`
  position: absolute;
  align-items: center;
  align-self: center;
  width: 200px;
  height: 50;
  z-index: 99;
  top: 80%;
`;

const Maps = styled.FlatList`
  margin-left: 30px;
  margin-right: 30px;
  top: 30px

`;

const Map = styled.TouchableOpacity`
  height: 150;
  width: 100%;
  margin-bottom: 80px;
`
const MapImage = styled.Image`
  width: 350;
  height: 150;
  border-radius: 10px;

`;

const FooterMaps = styled.View`
  position: absolute;
  align-items: center;
  align-self: center;
  width: 290px;
  height: 80;
  z-index: 99;
  top: 75%;
`;

const Agent = styled.TouchableOpacity`
    margin: 10px;
    height: 350;
`

const Title = styled.Text`
  color: white;
  font-size: 40px;
  font-weight: 700;
  text-transform: uppercase;
  font-family: 'bold';
  letter-spacing: 2px;
`

const Type = styled.Text`
  color: white;
  font-size: 10px;
  text-transform: uppercase;
  font-family: 'bold';
`

const AgentAvatar = styled.Image`
  width: 350px;
  height: 400;
  position: absolute;
  top: -75.7;
`

const CardAgent = styled.View`
  width: 250px;
  height: 350;
  margin-top: 40px;
  border-radius: 15px;
  align-items: center;

`