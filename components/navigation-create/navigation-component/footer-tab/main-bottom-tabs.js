import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";


import HomeScreen from '../../../../app/home';
import MyProfileIndex from '../../../../app/my-profile';
import MessagesIndex from '../../../../app/messages';
import MatchesIndex from '../../../../app/matches';
import AppHeader from '../../../app-header/app-header';

const Tab = createBottomTabNavigator();


export default function MainBottomTabs() {

    const FooterTab =[
        {
            name: "home",
            component: HomeScreen,
            IconName:'home',
            headerShown: true,
            headerBackVisible: false,
                headerShadowVisible: false,  
                headerStyle: { backgroundColor: 'transparent' },
                header: () => <AppHeader isHome={true} />

        },
         {
            name: "matches",
            component: MatchesIndex,
            IconName:'heart',
               headerShown: true,
               headerBackVisible: false,
                headerShadowVisible: false,  
                headerStyle: { backgroundColor: 'transparent' },
                header: () => <AppHeader isHome={true} />
        },
        
        {
            name: "messages",
            component: MessagesIndex,
            IconName:'chatbubbles',
               headerShown: true,
               headerBackVisible: true,
                headerShadowVisible: false,  
                headerStyle: { backgroundColor: 'transparent' },
                header: () => <AppHeader isHome={false} />
        },

        
        {
            name: "my-profile",
            component: MyProfileIndex,
            IconName:'person',
               headerShown: true,
               headerBackVisible: false,
                headerShadowVisible: false,  
                headerStyle: { backgroundColor: 'transparent' },
                header: () => <AppHeader isHome={false} />
        },

    ]

    return (
        <>
            <Tab.Navigator
             
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,
                     tabBarActiveTintColor: "#f10020",
                    tabBarInactiveTintColor: "#000",
                    tabBarStyle: {
                        position: "absolute",
                        bottom:0,          // 👈 space from bottom (floating)
                       
                        paddingTop:10,
                        // paddingBottom:10,
                        marginEnd:15,
                        marginStart:15,

                        height: 88,
                        borderRadius: 55,
                        borderBottomEndRadius:0,
                        borderBottomStartRadius:0,
                        backgroundColor: "#fff",

                       alignSelf: "center",  // ✅ center instead of margin auto
                        // width: "90%",

                        elevation: 5,
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 10,
                    },

                    tabBarItemStyle: {
                    justifyContent: "center",
                    alignItems: "center",
                    },

                   tabBarIcon: ({ color, size }) => {
                        // 1. Find the tab object that matches the current route name
                        const currentTab = FooterTab.find((tab) => tab.name === route.name);

                        // 2. Get the icon name from that object, or provide a fallback
                        const iconName = currentTab ? currentTab.IconName : "help-circle";

                        // 3. Return the icon
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
               
               {FooterTab.map((item) => (
                    <Tab.Screen 
                        key={item.name} // Key goes directly on the Screen
                        name={item.name} 
                        component={item.component} 
                        options={{ headerShown: item.headerShown, header: item.header, 
                            headerBackVisible: item.headerBackVisible, 
                            headerShadowVisible: item.headerShadowVisible, 
                            headerStyle: item.headerStyle }}
                    />
                    ))}
                


            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({})