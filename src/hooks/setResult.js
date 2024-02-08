import { postServerData } from '../helper/helper';
import * as Action from '../redux/result_reducer';

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(Action.pushResultAction(result));
  } catch (error) {
    console.error('Error pushing answer:', error);
  }
};

export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Action.updateResultAction(index));
  } catch (error) {
    console.error('Error updating result:', error);
  }
};

/** Insert user data */
export const usePublishResult = (resultData) => {
  const { result, username } = resultData;

  (async () => {
    try {
      if (!Array.isArray(result) || result.length === 0 || !username) {
        throw new Error("Invalid result or username. Couldn't publish result.");
      }

      await postServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, resultData, (data) => data);
    } catch (error) {
      console.error('Error publishing result:', error);
    }
  })();
};
