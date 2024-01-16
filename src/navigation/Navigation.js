import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from '@react-navigation/native';

//pages
import Login from '../pages/Auth';
import Splash from '../pages/Splash';
import Dashboard from '../pages/Dashboard';
import Evaluadores from '../pages/Evaluadores';
import AreasFoco from '../pages/AreasFoco';
import BuscandoCoach from '../pages/BuscandoCoach';
import AgendarCoach from '../pages/AgendarCoach';
import Onboarding from '../pages/Onboarding';
import MyCoach from '../pages/MyCoach';
import {CoachEvaluation} from '../pages/CoachEvaluation';
import Evaluations from '../pages/CoachEvaluation/components/Evaluations/Evaluations';
import SessionEvaluation from '../pages/SessionEvaluation';
import CoacheeResume from '../pages/MyCoachees/components/CoacheeResume';
import SessionInfo from '../pages/MyCoachees/components/SessionInfo/';
import ScheduleAppointment from '../pages/ScheduleAppointment';
import ConnectCalendar from '../pages/ConnectCalendar';
import CoachCalendar from '../pages/CoachCalendar';
import SuccessCalendar from '../pages/SuccessCalendar';
import Session from '../pages/MySessions/components/Session';
import Meeting from '../pages/Meeting';
import MeetingTest from '../streaming/App';
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from '@react-navigation/drawer';
import {Button, View} from 'react-native';
import CustomDrawer from '../components/CustomDrawer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
import IconFont from 'react-native-vector-icons/FontAwesome';
import Preferences from '../pages/Preferences';
import {useSelector} from 'react-redux';
import MyEvaluations from '../pages/MyEvaluations';
import {CoacheeCalendar} from '../pages';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScreenStackHeaderBackButtonImage} from 'react-native-screens';
import RescheduleAppointment from '../pages/RescheduleAppointment';
import {verifyRoutes} from '../utilities/verifyRoutes';
import {UpdateLanguages} from '../pages/UpdateLanguages';
import {useTranslation} from 'react-i18next';

const Drawer = createDrawerNavigator();

function HeaderLeft({isPrincipal, goBack}) {
  const openMenu = () => {
    goBack();
  };

  if (!isPrincipal) {
    return (
      <TouchableOpacity onPress={openMenu} style={{marginLeft: 20}}>
        <IconFont name="angle-left" size={30} color="#299EFF" />
      </TouchableOpacity>
    );
  }
}

function Navigation() {
  const {t} = useTranslation('global');

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#E4EFF8e8',
    },
  };

  const insets = useSafeAreaInsets();
  const ref = useRef(null);

  const [isPrincipal, setIsPrincipal] = useState(true);
  const {role, onboardingCompleted} = useSelector(state => state.user);

  const isCoachee = role === 'coachee';

  return (
    <NavigationContainer theme={theme} ref={ref}>
      <Drawer.Navigator
        initialRouteName="Splash"
        screenOptions={{
          swipeEnabled: false,
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: 'transparent',
            marginTop: insets.top + 5,
            marginBottom: insets.bottom + 5,
            width: '90%',
          },
          headerStyle: {
            backgroundColor: '#E4EFF8e8',
          },
          headerLeft: () =>
            onboardingCompleted && (
              <HeaderLeft
                isPrincipal={isPrincipal}
                goBack={ref.current.goBack}
              />
            ),
          headerRight: () => <DrawerToggleButton />,
          iconContainerStyle: {paddingLeft: 20, marginLeft: 20},
          headerTitleStyle: {display: 'none'},
          drawerActiveTintColor: 'white',
          drawerLabelStyle: {marginLeft: -15, fontSize: 16, color: 'black'},
        }}
        drawerContent={props => <CustomDrawer {...props} />}
        screenListeners={() => ({
          state: () => verifyRoutes({ref, setIsPrincipal}),
        })}>
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: t('components.menu.home'),
            drawerIcon: () => (
              <View
                style={{
                  backgroundColor: 'rgba(34, 34, 34, .15)',
                  borderRadius: 50,
                  padding: 5,
                }}>
                <Icon name={'home'} color={'white'} size={18} />
              </View>
            ),
          }}
        />

        {isCoachee && onboardingCompleted && (
          <>
            <Drawer.Screen
              name="MyCoach"
              component={MyCoach}
              options={{
                title: 'Mi Coach',
                drawerIcon: color => (
                  <View
                    style={{
                      backgroundColor: 'rgba(34, 34, 34, .15)',
                      borderRadius: 50,
                      padding: 5,
                    }}>
                    <Icon name={'user'} color={'white'} size={16} />
                  </View>
                ),
              }}
            />

            <Drawer.Screen
              name="MyEvaluations"
              component={MyEvaluations}
              options={{
                title: t('components.menu.myEvaluations'),
                drawerIcon: color => (
                  <View
                    style={{
                      backgroundColor: 'rgba(34, 34, 34, .15)',
                      borderRadius: 50,
                      padding: 5,
                    }}>
                    <Icon name={'news'} color={'white'} size={16} />
                  </View>
                ),
              }}
            />
          </>
        )}

        {onboardingCompleted && (
          <Drawer.Screen
            name="Preferences"
            component={Preferences}
            options={{
              title: t('components.menu.preferences'),
              drawerIcon: color => (
                <View
                  style={{
                    backgroundColor: 'rgba(34, 34, 34, .15)',
                    borderRadius: 50,
                    padding: 5,
                  }}>
                  <Icon name={'cog'} color={'white'} size={16} />
                </View>
              ),
            }}
          />
        )}

        <Drawer.Screen
          name="Onboarding"
          component={Onboarding}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen
          name="CoachEvaluation"
          component={CoachEvaluation}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen
          name="Evaluations"
          component={Evaluations}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen
          name="Evaluadores"
          component={Evaluadores}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen
          name="AreasFoco"
          component={AreasFoco}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen
          name="BuscandoCoach"
          component={BuscandoCoach}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen
          name="AgendarCoach"
          component={AgendarCoach}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen
          name="AgendarCoachee"
          component={ScheduleAppointment}
          options={{drawerItemStyle: {display: 'none'}}}
        />

        <Drawer.Screen
          name="ReagendarCoachee"
          component={RescheduleAppointment}
          options={{drawerItemStyle: {display: 'none'}}}
        />

        <Drawer.Screen
          name="SessionEvaluation"
          component={SessionEvaluation}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen
          name="CoacheeResume"
          component={CoacheeResume}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen
          name="SessionInfo"
          component={SessionInfo}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen
          name="connectcalendar"
          component={ConnectCalendar}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen
          name="CoachCalendar"
          options={{
            animationEnabled: true,
            title: 'Calendario Coach',
            drawerItemStyle: {display: 'none'},
          }}
          component={CoachCalendar}
        />
        <Drawer.Screen
          name="SuccessCalendar"
          component={SuccessCalendar}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen
          name="Session"
          component={Session}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen
          name="Meeting"
          component={Meeting}
          options={{drawerItemStyle: {display: 'none'}}}
        />

        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            drawerItemStyle: {display: 'none'},
            headerShown: false,
          }}
        />

        <Drawer.Screen
          name="Splash"
          component={Splash}
          options={{
            drawerItemStyle: {display: 'none'},
            headerShown: false,
          }}
        />

        <Drawer.Screen
          name="UpdateLanguages"
          component={UpdateLanguages}
          options={{
            drawerItemStyle: {display: 'none'},
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
      {/* <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          options={{ animationEnabled: false, header: () => null }}
          component={Splash}
        />

        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
        />
        <Stack.Screen
          name="Dashboard"
          options={{
            animationEnabled: true,
            header: () => null
          }}
          component={Dashboard}
        />

        <Stack.Screen
          name="CoachEvaluation"
          component={CoachEvaluation}
        />
        <Stack.Screen
          name="Evaluations"
          component={Evaluations}
        />

        <Stack.Screen
          name="Evaluadores"
          component={Evaluadores}
        />
        <Stack.Screen
          name="AreasFoco"
          component={AreasFoco}
        />
        <Stack.Screen
          name="BuscandoCoach"
          component={BuscandoCoach}
        />
        <Stack.Screen
          name="AgendarCoach"
          component={AgendarCoach}
        />
        <Stack.Screen
          name="AgendarCoachee"
          component={ScheduleAppointment}
        />

        <Stack.Screen
          name="MyCoach"
          component={MyCoach}
        />
        <Stack.Screen
          name="SessionEvaluation"
          component={SessionEvaluation}
        />
        <Stack.Screen
          name="CoacheeResume"
          component={CoacheeResume}
        />
        <Stack.Screen
          name="SessionInfo"
          component={SessionInfo}
        />

        <Stack.Screen
          name="connectcalendar"
          component={ConnectCalendar}
        />

        <Stack.Screen
          name="CoachCalendar"
          options={{ animationEnabled: true, title: 'Calendario Coach' }}
          component={CoachCalendar}
        />

        <Stack.Screen
          name="SuccessCalendar"
          component={SuccessCalendar}
        />

        <Stack.Screen
          name="Session"
          component={Session}
        />

        <Stack.Screen
          name="Meeting"
          component={Meeting}
        />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}

export default Navigation;