import React, {useState} from 'react';
import {useFetchAndLoad} from '../../hooks';
import {
  EndSession,
  updateSession,
  updateSessionNoShow,
  updateSessionNumber,
} from '../../services/sessions.service';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '../Modal';
import {View, Text} from 'react-native';
import {PrimaryButton, SecondaryButton} from '../Buttons';
import {useTranslation} from 'react-i18next';
import {updateCoachee, updateNoShowAcc} from '../../services/user.service';
import displayToast from '../../utilities/toast.utility';
import tw from 'twrnc';

function CoacheeAssistModal({coacheeModal, setCoacheeModal, navigation}) {
  const {t} = useTranslation('global');

  const {callEndpoint, loading} = useFetchAndLoad();

  const session = useSelector(state => state.session);

  const handleOk = async () => {
    try {
      if (session) {
        await callEndpoint(
          EndSession({
            _id: session._id || session.id,
            MeetingId: session.callSession,
          }),
        );

        await callEndpoint(
          updateSessionNumber({
            id: session._id || session.id,
            coacheeId: session?.coachee?._id,
          }),
        );
      }
      setCoacheeModal(false);
    } catch (error) {
      displayToast(error, 'error');
    }
  };

  const handleCancel = async () => {
    try {
      await callEndpoint(updateSession({...session, canceled: true}));

      if (session?.coachee?.noShowAcc >= 1) {
        await callEndpoint(
          updateNoShowAcc(session?.coachee?._id, {
            noShowAcc: session?.coachee?.noShowAcc + 1,
            coacheeName: session?.coachee?.name,
            coacheeLastName: session?.coachee?.lastname,
            coacheeEmail: session?.coachee?.email,
          }),
        );
      } else {
        await callEndpoint(
          updateCoachee(session?.coachee?._id, {noShow: true}),
        );
        await callEndpoint(
          updateNoShowAcc(session?.coachee?._id, {
            noShowAcc: session?.coachee?.noShowAcc + 1,
            coacheeName: session?.coachee?.name,
            coacheeLastName: session?.coachee?.lastname,
            coacheeEmail: session?.coachee?.email,
          }),
        );
      }

      if (session.coachee.noShow === true) {
        await callEndpoint(
          updateSession({...session, status: true, evaluatedByCoachee: true}),
        );

        await callEndpoint(
          updateSessionNumber({
            id: session._id || session.id,
            coacheeId: session?.coachee?._id,
          }),
        );

        await callEndpoint(
          updateSessionNoShow({
            id: session._id || session.id,
          }),
        );
      }

      setCoacheeModal(false);

      navigation.navigate('Dashboard');
    } catch (error) {
      displayToast(error, 'error');
    }
  };

  return (
    <>
      <Modal isVisible={coacheeModal} setVisible={setCoacheeModal}>
        <View style={tw.style('mt-2 mb-2')}>
          <View>
            <Text>
              {t('pages.mySessions.components.session.theCoachee')}{' '}
              {session?.coachee?.name} {session?.coachee?.lastname}{' '}
              {t('pages.mySessions.components.session.present')}{' '}
            </Text>
          </View>

          <PrimaryButton
            title={t('pages.mySessions.components.session.yes')}
            onPress={() => {
              handleOk();
            }}
            loading={loading}
            style={{marginVertical: 10}}
          />
          <SecondaryButton
            title={t('pages.mySessions.components.session.no')}
            onPress={() => handleCancel()}
            loading={loading}
          />
        </View>
      </Modal>
    </>
  );
}

export default CoacheeAssistModal;
