import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text } from "react-native";
import { CoinBankScreen, UserScreen } from "../../screens";

const Tab = createBottomTabNavigator();

export function HomeScreenContents(props) {
  return <Text>Home screen</Text>;
}

export default function HomeScreen(props) {
  let userObject = {};
  if (props.user) {
    userObject = props.user;
  } else {
    userObject = props.route.params;
  }

  console.log(userObject);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreenContents}></Tab.Screen>
      <Tab.Screen name="UserProfile" component={UserScreen}></Tab.Screen>
      <Tab.Screen name="CoinBank">
            {(props) => <CoinBankScreen {...props} user={user} />}
        </Tab.Screen>
    </Tab.Navigator>
  );

  //   const [entityText, setEntityText] = useState("");
  //   const [entities, setEntities] = useState([]);

  //   const [imgList, setImageList] = useState([
  //     {
  //       key:
  //         "https://www.penguin.co.uk/content/dam/prh/articles/adults/2019/november/Inline%20image_Trending%20Books_150.jpg",
  //       id: 1,
  //     },
  //     {
  //       key:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIWkOR5ZdRwCfARI6KG411vQGWTa89PhlCcA&usqp=CAU",
  //       id: 2,
  //     },
  //     {
  //       key:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ2lauaWOPLZeBVdNbwc2Plc3woJdT4CuXLw&usqp=CAU",
  //       id: 3,
  //     },
  //     {
  //       key:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw-D4_Z1aoWpcyWrPcv2n8irQKY9fBoNxZKA&usqp=CAU",
  //       id: 4,
  //     },
  //   ]);

  //   const entityRef = firebase.firestore().collection("entities");
  //   const userID = props.user;
  //   console.log(props);

  //   const onClickProfile = () => {
  //     navigation.navigate("UserProfile")
  //   }

  //   //   useEffect(() => {
  //   //     entityRef
  //   //       .where("authorID", "==", userID)
  //   //       .orderBy("createdAt", "desc")
  //   //       .onSnapshot(
  //   //         (querySnapshot) => {
  //   //           const newEntities = [];
  //   //           querySnapshot.forEach((doc) => {
  //   //             const entity = doc.data();
  //   //             entity.id = doc.id;
  //   //             newEntities.push(entity);
  //   //           });
  //   //           setEntities(newEntities);
  //   //         },
  //   //         (error) => {
  //   //           console.log(error);
  //   //         }
  //   //       );
  //   //   }, []);

  //   //   const onAddButtonPress = () => {
  //   //     if (entityText && entityText.length > 0) {
  //   //       const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  //   //       const data = {
  //   //         text: entityText,
  //   //         authorID: userID,
  //   //         createdAt: timestamp,
  //   //       };
  //   //       entityRef
  //   //         .add(data)
  //   //         .then((_doc) => {
  //   //           setEntityText("");
  //   //           Keyboard.dismiss();
  //   //         })
  //   //         .catch((error) => {
  //   //           alert(error);
  //   //         });
  //   //     }
  //   //   };

  //   //   const renderEntity = ({ item, index }) => {
  //   //     return (
  //   //       <View style={styles.entityContainer}>
  //   //         <Text style={styles.entityText}>
  //   //           {index}. {item.text}
  //   //         </Text>
  //   //       </View>
  //   //     );
  //   //   };

  //   return (
  //     <View style={{ flex: 1 }}>
  //       <View
  //         style={{
  //           flex: 1,
  //           backgroundColor: "#424242",
  //           flexDirection: "row",
  //           alignItems: "center",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <View style={styles.token_number}>
  //           <Text style={styles.token_text}>36</Text>
  //         </View>
  //         <Image
  //           style={styles.profile_image}
  //           source={{
  //             uri:
  //               "https://i.pinimg.com/236x/a3/ac/1e/a3ac1ed5abaedffd9947face7901e14c.jpg",
  //           }}
  //         />
  //       </View>
  //       <View style={{ flex: 4, backgroundColor: "#F1F1F1" }}>
  //         <FlatList
  //           style={{ flex: 1 }}
  //           data={[
  //             {
  //               key:
  //                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw-D4_Z1aoWpcyWrPcv2n8irQKY9fBoNxZKA&usqp=CAU",
  //             },
  //             {
  //               key:
  //                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwQWJaEAGBMocmYs50IcYrT0AEjaWqmOgflQ&usqp=CAU",
  //             },
  //             // {
  //             //   key:
  //             //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw-D4_Z1aoWpcyWrPcv2n8irQKY9fBoNxZKA&usqp=CAU",
  //             // },
  //             // {
  //             //   key:
  //             //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw-D4_Z1aoWpcyWrPcv2n8irQKY9fBoNxZKA&usqp=CAU",
  //             // },
  //           ]}
  //           renderItem={({ key }) => (
  //             <Image style={styles.list_image} source={{ uri: key }} />
  //           )}
  //         />
  //       </View>
  //       <View
  //         style={{
  //           flex: 1,
  //           backgroundColor: "#424242",
  //           flexDirection: "row",
  //           justifyContent: "space-around",
  //           alignItems: "center",
  //         }}
  //       >
  //         <TouchableOpacity style={styles.button} onPress={onClickProfile}><Text>Profile</Text></TouchableOpacity>
  //         <TouchableOpacity style={styles.button}><Text>Book Shop</Text></TouchableOpacity>
  //         <TouchableOpacity style={styles.button}><Text>Coin Bank</Text></TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // }

  // {
  //   /* <View style={styles.formContainer}>
  //   <TextInput
  //     style={styles.input}
  //     placeholder="Add New Entity"
  //     placeholderTextColor="#aaaaaa"
  //     onChangeText={(text) => setEntityText(text)}
  //     value={entityText}
  //     underlineColorAndroid="transparent"
  //     autoCapitalize="none"
  //   />
  //   <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
  //     <Text style={styles.buttonText}>Add</Text>
  //   </TouchableOpacity>
  // </View>
  // {entities && (
  //   <View style={styles.listContainer}>
  //     <FlatList
  //       data={entities}
  //       renderItem={renderEntity}
  //       keyExtractor={(item) => item.id}
  //       removeClippedSubviews={true}
  //     />
  //   </View>
  // )} */
}
